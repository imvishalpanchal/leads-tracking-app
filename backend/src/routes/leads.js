const express = require('express');
const authMiddleware = require('../middlewares/auth');
const leadController = require('../controllers/leadController');
const { validateRequest } = require('../utils/yup');
const { createLeadSchema, updateLeadSchema, createNoteSchema } = require('../validations/leads');

const router = express.Router();

router.use(authMiddleware);

router.get('/', leadController.getLeads);

router.post('/',
    validateRequest(createLeadSchema),
    leadController.createLead);

router.get('/:id', leadController.getLeadById);

router.patch('/:id',
    validateRequest(updateLeadSchema),
    leadController.updateLead);

router.delete('/:id', leadController.deleteLead);

router.get('/:id/notes', leadController.getNotes);

router.post('/:id/notes',
    validateRequest(createNoteSchema),
    leadController.addNote);

module.exports = router;
