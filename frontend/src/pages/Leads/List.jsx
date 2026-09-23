import { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Phone, Mail, Clock, Eye, Loader2, X } from 'lucide-react';
import { showToast } from '../../utils/helper/toast';
import messages from '../../utils/messages';
import { leadService } from '../../services';
import useTitle from '../../hooks/useTitle';
import { Loader } from '../../components/UI';
import { Input, Select } from '../../components/FormElements';
import { LEAD_STATUS_OPTIONS } from '../../utils/constants';
import { formatDateTime } from '../../utils/helper/date';

const LeadsList = () => {
  useTitle('All Leads');
  const [searchParams, setSearchParams] = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  const [searchQuery, setSearchQuery] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        if (searchQuery) newParams.set('search', searchQuery);
        else newParams.delete('search');
        return newParams;
      }, { replace: true });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, setSearchParams]);

  const handleStatusChange = useCallback((e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('status', e.target.value);
    } else {
      newParams.delete('status');
    }
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const fetchLeads = useCallback(async (currentPage) => {
    if (currentPage === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const res = await leadService.getLeads(search, status, currentPage, 6);
      const data = res.data?.response?.list || [];
      const metaData = res.data?.response?.meta || null;

      if (currentPage === 1) {
        setLeads(data);
      } else {
        setLeads(prev => {
          const newIds = new Set(data.map(l => l.id));
          return [...prev.filter(l => !newIds.has(l.id)), ...data];
        });

        if (data.length > 0) {
          const firstNewId = data[0].id;
          setTimeout(() => {
            const el = document.getElementById(`lead-card-${firstNewId}`);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }, 100);
        }
      }
      setMeta(metaData);
    } catch (error) {
      showToast(messages.LEADS_LOAD_FAIL, 'error');
    }
    setLoading(false);
    setLoadingMore(false);
  }, [search, status]);

  useEffect(() => {
    fetchLeads(page);
  }, [fetchLeads, page]);

  return (
    <div className="page-transition">
      <div className="page-header">
        <div className="flex gap-2 flex-wrap">
          <div className="flex-1 search-wrapper">
            <Input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              prefix={<Search size={18} />}
              suffix={
                searchQuery && (
                  <X size={18} className="cursor-pointer hover:text-primary" onClick={() => setSearchQuery('')} />
                )
              }
            />
          </div>

          <div className="w-200">
            <Select
              className="list-status-select"
              value={status}
              onChange={(e) => handleStatusChange(e)}
              placeholder="All Statuses"
              options={[
                { label: 'All Statuses', value: '' },
                ...LEAD_STATUS_OPTIONS
              ]}
            />
          </div>

          {(searchQuery || status) && (
            <div className="flex items-center">
              <button
                onClick={handleClearFilters}
                className="btn-clear-all flex items-center justify-center gap-2"
              >
                <X size={18} /> Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <Loader text="Loading leads..." />
      ) : leads.length === 0 ? (
        <div className="text-center mt-4 card">No leads found.</div>
      ) : (
        <div className="leads-grid">
          {leads.map(lead => (
            <div key={lead.id} id={`lead-card-${lead.id}`} className="card">
              <div className="flex justify-between items-start mb-4 gap-2">
                <h3 className="text-lg-bold flex-1 break-words leading-tight lead-card-title">{lead.name}</h3>
                <span className={`badge badge-${lead.status.toLowerCase()} whitespace-nowrap mt-1 flex-shrink-0`}>{lead.status}</span>
              </div>
              <div className="flex flex-col mb-4">
                <div className="info-row">
                  <div className="icon-box"><Mail size={16} /></div>
                  <span className="text-sm font-medium">{lead.email}</span>
                </div>
                {lead.phone && (
                  <div className="info-row">
                    <div className="icon-box"><Phone size={16} /></div>
                    <span className="text-sm font-medium">{lead.phone}</span>
                  </div>
                )}
                <div className="info-row">
                  <div className="icon-box"><Clock size={16} /></div>
                  <span className="text-sm font-medium">Added {formatDateTime(lead.createdAt)}</span>
                </div>
              </div>
              <Link to={`/leads/${lead.id}`} className="btn btn-secondary w-full">
                <Eye size={16} /> View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {!loading && meta?.hasNextPage && (
        <div className="load-more-wrapper">
          <button
            className="btn btn-primary"
            onClick={() => setPage(p => p + 1)}
            disabled={loadingMore}
            style={{ padding: '0.875rem 2rem', minWidth: '200px' }}
          >
            {loadingMore ? (
              <><Loader2 size={18} className="animate-spin" /> Loading more...</>
            ) : (
              'Load More Leads'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadsList;
