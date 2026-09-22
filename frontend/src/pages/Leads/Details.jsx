import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Trash2, Edit } from 'lucide-react';
import { showToast } from '../../utils/toast';
import { leadService } from '../../services';
import { Loader } from '../../components/UI';
import messages from '../../utils/messages';
import LeadsNotes from '../../components/LeadsNotes';
import useTitle from '../../hooks/useTitle';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  useTitle(lead ? `Lead: ${lead.name}` : 'Lead Details');

  const fetchLead = useCallback(async () => {
    try {
      const res = await leadService.getLead(id);
      if (res.data) {
        setLead(res.data.response);
      }
    } catch (error) {
      showToast(messages.LEAD_LOAD_FAIL, 'error');
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleDelete = useCallback(async () => {
    if (window.confirm(messages.DELETE_CONFIRM)) {
      try {
        await leadService.deleteLead(id);
        showToast(messages.DELETE_SUCCESS, 'success');
        navigate('/');
      } catch (error) {
        showToast(messages.DELETE_FAIL, 'error');
      }
    }
  }, [id, navigate]);

  const handleStatusChange = useCallback(async (e) => {

  }, []);

  if (loading) return <Loader text="Loading details..." />;
  if (!lead) return <div className="text-center mt-4 card">Lead not found</div>;

  return (
    <div className="page-transition">
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="btn btn-secondary btn-md-pad">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="leads-grid grid-2-cols">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center gap-2"><User /> Lead Information</h2>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/leads/${id}/edit`)} className="btn btn-secondary btn-sm-pad" title="Edit Lead">
                <Edit size={16} />
              </button>
              <button onClick={handleDelete} className="btn btn-danger btn-sm-pad">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="text-secondary text-sm">Name</div>
              <div className="text-lg-bold">{lead.name}</div>
            </div>
            <div>
              <div className="text-secondary text-sm">Email</div>
              <div className="flex items-center gap-2"><Mail size={16} className="text-secondary" /> {lead.email}</div>
            </div>
            {lead.phone && (
              <div>
                <div className="text-secondary text-sm">Phone</div>
                <div className="flex items-center gap-2"><Phone size={16} className="text-secondary" /> {lead.phone}</div>
              </div>
            )}
            <div>
              <div className="text-secondary text-sm mb-1">Status</div>
              <span className={`badge badge-${lead.status.toLowerCase()}`}>{lead.status}</span>
            </div>
          </div>
        </div>

        <LeadsNotes leadId={id} notes={lead.notes} onNoteAdded={fetchLead} />
      </div>
    </div>
  );
};

export default LeadDetail;
