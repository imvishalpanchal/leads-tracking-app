import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { Input, Select } from '../../components/FormElements';
import { showToast } from '../../utils/helper/toast';
import { leadService } from '../../services';
import { Loader } from '../../components/UI';
import { leadSchema } from '../../schema/leads';
import { LEAD_STATUS_OPTIONS } from '../../utils/constants';
import useTitle from '../../hooks/useTitle';
import messages from '../../utils/messages';

const LeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  useTitle(isEditMode ? 'Edit Lead' : 'Create New Lead');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      status: LEAD_STATUS_OPTIONS[0].value
    }
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchLead = async () => {
        try {
          const res = await leadService.getLead(id);
          if (res.data) {
            const lead = res.data.response;
            reset({
              name: lead.name,
              email: lead.email,
              phone: lead.phone || '',
              status: lead.status
            });
          }
        } catch (error) {
          showToast(messages.LEAD_LOAD_EDIT_FAIL, 'error');
        } finally {
          setLoading(false);
        }
      };
      fetchLead();
    }
  }, [id, isEditMode, reset]);

  const onSubmit = useCallback(async (data) => {
    try {
      if (isEditMode) {
        const res = await leadService.updateLead(id, data);
        if (res.data) {
          showToast(messages.LEAD_UPDATE_SUCCESS, 'success');
          navigate(`/leads/${id}`);
        }
      } else {
        const res = await leadService.createLead(data);
        if (res.data) {
          showToast(messages.LEAD_CREATE_SUCCESS, 'success');
          navigate('/');
        }
      }
    } catch (err) {
      const apiErr = err.response?.data?.error;
      const msg = apiErr?.details?.[0]?.message || apiErr?.message || messages.GENERIC_ERROR;
      showToast(msg, 'error');
    }
  }, [id, isEditMode, navigate]);

  if (loading) return <Loader text="Loading form..." />;

  return (
    <div className="max-w-600 page-transition">
      <div className="mb-4">
        <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary btn-md-pad">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="card">
        <h2 className="mb-4">{isEditMode ? 'Edit Lead' : 'Create New Lead'}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            name="name"
            placeholder="John Doe"
            isRequired={true}
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="john@example.com"
            isRequired={true}
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="+1 (555) 000-0000"
            error={errors.phone?.message}
            {...register('phone')}
          />

          <Select
            label="Status"
            name="status"
            options={LEAD_STATUS_OPTIONS}
            error={errors.status?.message}
            placeholder="Select Status"
            value={watch('status')}
            {...register('status')}
          />

          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn btn-primary" disabled={loading || isSubmitting}>
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin" /> {isEditMode ? 'Saving...' : 'Submitting...'}</>
              ) : (
                <><Save size={18} /> {isEditMode ? 'Save Changes' : 'Create Lead'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
