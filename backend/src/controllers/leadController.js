const leadService = require('../services/leadService');
const messages = require('../utils/messages');
const ApiResponse = require('../config/api/sendResponse');
const { errors } = require('../config/api/errorHandler');

const leadController = {
  getLeads: async (req, res, next) => {
    try {
      const params = req.query;
      const { leads, total } = await leadService.getAllLeads(params);
      return ApiResponse.list(res, 200, leads, params, total, messages.LEADS_FETCH_SUCCESS);
    } catch (error) {
      next(error);
    }
  },

  getLeadById: async (req, res, next) => {
    try {
      const lead = await leadService.getLeadById(req.params.id);
      if (!lead) {
        return next(errors.notFound(messages.LEAD_NOT_FOUND));
      }
      return ApiResponse.details(res, 200, messages.LEAD_DETAILS_FETCH_SUCCESS, lead);
    } catch (error) {
      next(error);
    }
  },

  createLead: async (req, res, next) => {
    try {
      const { name, email, phone, status } = req.body;
      const newLead = await leadService.createLead({ name, email, phone, status });
      return ApiResponse.details(res, 201, messages.LEAD_CREATE_SUCCESS, newLead);
    } catch (error) {
      if (error.code === 'P2002') {
        return next(errors.conflict(messages.EMAIL_EXISTS));
      }
      next(error);
    }
  },

  updateLead: async (req, res, next) => {
    try {
      const updatedLead = await leadService.updateLead(req.params.id, req.body);
      return ApiResponse.details(res, 200, messages.LEAD_UPDATE_SUCCESS, updatedLead);
    } catch (error) {
      if (error.code === 'P2025') {
        return next(errors.notFound(messages.LEAD_NOT_FOUND));
      }
      if (error.code === 'P2002') {
        return next(errors.conflict(messages.EMAIL_EXISTS));
      }
      next(error);
    }
  },

  deleteLead: async (req, res, next) => {
    try {
      await leadService.deleteLead(req.params.id);
      return ApiResponse.details(res, 200, messages.LEAD_DELETE_SUCCESS);
    } catch (error) {
      if (error.code === 'P2025') {
        return next(errors.notFound(messages.LEAD_NOT_FOUND));
      }
      next(error);
    }
  },

  getNotes: async (req, res, next) => {
    try {
      const notes = await leadService.getNotesByLeadId(req.params.id);
      return ApiResponse.details(res, 200, messages.NOTES_FETCH_SUCCESS, notes);
    } catch (error) {
      next(error);
    }
  },

  addNote: async (req, res, next) => {
    try {
      const { content } = req.body;
      const note = await leadService.addNote(req.params.id, content);
      return ApiResponse.details(res, 201, messages.NOTE_ADD_SUCCESS, note);
    } catch (error) {
      if (error.code === 'P2003') {
        return next(errors.notFound(messages.LEAD_NOT_FOUND));
      }
      next(error);
    }
  },
};

module.exports = leadController;
