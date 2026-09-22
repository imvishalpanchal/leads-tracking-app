import api from './api';

const leadService = {
  getLeads: (search = '', status = '', page = 1, limit = 10) => {
    return api.get(`/leads?search=${search}&status=${status}&page=${page}&limit=${limit}`);
  },
  getLead: (id) => {
    return api.get(`/leads/${id}`);
  },
  createLead: (data) => {
    return api.post('/leads', data);
  },
  updateLead: (id, data) => {
    return api.patch(`/leads/${id}`, data);
  },
  deleteLead: (id) => {
    return api.delete(`/leads/${id}`);
  },
  getNotes: (id) => {
    return api.get(`/leads/${id}/notes`);
  },
  addNote: (id, content) => {
    return api.post(`/leads/${id}/notes`, { content });
  }
};

export default leadService;
