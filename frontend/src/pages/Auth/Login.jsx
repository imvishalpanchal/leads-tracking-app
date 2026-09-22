import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2, Eye, EyeOff, LayoutDashboard } from 'lucide-react';
import { showToast } from '../../utils/toast';
import { authService } from '../../services';
import { Input } from '../../components/FormElements';
import { authSchema } from '../../schema/auth';
import useTitle from '../../hooks/useTitle';

const Login = () => {
  useTitle('Login');
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(authSchema),
    defaultValues: {
      email: import.meta.env.VITE_DEFAULT_EMAIL || '',
      password: import.meta.env.VITE_DEFAULT_PASSWORD || ''
    }
  });

  const onSubmit = useCallback(async (data) => {
    try {
      const res = await authService.login(data.email, data.password);
      if (res.data) {
        const token = res.data.response.token;
        localStorage.setItem('token', token);

        const searchParams = new URLSearchParams(location.search);
        const redirectTo = searchParams.get('redirect') || '/';
        navigate(redirectTo, { replace: true });
        showToast('Login successful', 'success');
      }
    } catch (error) {
      const msg = error.response?.data?.error?.message || 'Login failed';
      showToast(msg, 'error');
    }
  }, [location.search, navigate]);

  return (
    <div className="flex items-center justify-center w-full page-transition">
      <div className="card login-card">
        <div className="flex flex-col items-center text-center">
          <div className="logo-icon-box flex items-center justify-center login-logo-box">
            <LayoutDashboard size={32} />
          </div>
          <h1 className="login-brand-title mb-4">LeadTracker Pro</h1>

          <h2 className="login-subtitle">Welcome Back!</h2>
          <p className="text-secondary text-sm">Please sign in to your account to continue</p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@leadtech.com"
                isRequired={true}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div className="mb-6">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                isRequired={true}
                error={errors.password?.message}
                suffix={
                  <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer flex items-center justify-center w-full h-full text-secondary hover:text-primary transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                }
                {...register('password')}
              />
            </div>

            <div className="mt-8">
              <button type="submit" className="btn btn-primary w-full login-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 size={18} className="animate-spin" /> Signing In...</>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
