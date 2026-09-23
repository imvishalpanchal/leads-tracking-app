const request = require('supertest');
const app = require('../src/server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeAll(async () => {
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /api/leads', () => {
  it('should return a 200 status code and an array of leads', async () => {
    const res = await request(app).get('/api/leads');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
