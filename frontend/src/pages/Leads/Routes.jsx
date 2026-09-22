import { Routes, Route } from 'react-router-dom';
import LeadDetail from './Details';
import LeadForm from './Form';

const LeadRoutes = () => {
    return (
        <Routes>
            <Route path="create" element={<LeadForm />} />
            <Route path=":id" element={<LeadDetail />} />
            <Route path=":id/edit" element={<LeadForm />} />
        </Routes>
    );
};

export default LeadRoutes;
