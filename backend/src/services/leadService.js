const prisma = require('../config/database/prismaClient');

const leadService = {
  getAllLeads: async (params) => {
    const { search, status, page, limit } = params;
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take
      }),
      prisma.lead.count({ where })
    ]);

    return { leads, total };
  },

  getLeadById: async (id) => {
    return prisma.lead.findUnique({
      where: { id: parseInt(id) },
      include: { notes: { orderBy: { createdAt: 'desc' } } },
    });
  },

  createLead: async (data) => {
    return prisma.lead.create({ data });
  },

  updateLead: async (id, data) => {
    return prisma.lead.update({
      where: { id: parseInt(id) },
      data,
    });
  },

  deleteLead: async (id) => {
    return prisma.lead.delete({
      where: { id: parseInt(id) },
    });
  },

  getNotesByLeadId: async (leadId) => {
    return prisma.note.findMany({
      where: { leadId: parseInt(leadId) },
      orderBy: { createdAt: 'desc' },
    });
  },

  addNote: async (leadId, content) => {
    return prisma.note.create({
      data: {
        content,
        leadId: parseInt(leadId),
      },
    });
  },
};

module.exports = leadService;
