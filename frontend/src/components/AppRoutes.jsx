import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import { LeadsList } from '../pages/Leads';
import LeadRoutes from './Leads/Routes';
import PrivateRoute from './Auth/PrivateRoute';
import PublicRoute from './Auth/PublicRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/" element={<LeadsList />} />
                <Route path="/leads/*" element={<LeadRoutes />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
