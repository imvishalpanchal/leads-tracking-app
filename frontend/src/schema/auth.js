import * as yup from 'yup';
import { commonSchema } from './common';

export const authSchema = yup.object().shape({
    email: commonSchema.email,
    password: yup.string().trim().required('Password is required'),
});