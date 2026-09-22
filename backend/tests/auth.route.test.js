const request = require('supertest');
const app = require('../src/server');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
describe('Auth Routes', () => {
  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('test@12345678', 10);
    await prisma.user.upsert({
      where: { email: 'test@leadtech.com' },
      update: { password: hashedPassword },
      create: {
        email: 'test@leadtech.com',
        password: hashedPassword,
        name: 'Test User'
      }
    });
  });
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: 'test@leadtech.com' }
    });
    await prisma.$disconnect();
  });
  describe('POST /api/auth/login', () => {
    it('should successfully login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@leadtech.com',
          password: 'test@12345678'
        });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user).toHaveProperty('email', 'test@leadtech.com');
    });
    it('should fail with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@leadtech.com',
          password: 'wrongpassword'
        });
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
    it('should return validation error for missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({});
      expect(response.status).toBe(422);
      expect(response.body.error).toBeDefined();
    });
  });
});
