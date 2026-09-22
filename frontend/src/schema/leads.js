import * as yup from 'yup';
import { LEAD_STATUS_OPTIONS } from '../utils/constants';
import { commonSchema } from './common';

export const leadSchema = yup.object().shape({
    name: yup.string().trim()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),
    email: commonSchema.email,
    phone: commonSchema.phone.optional(),
    status: yup.string().trim().oneOf(LEAD_STATUS_OPTIONS.map(opt => opt.value), 'Invalid status').optional(),
});