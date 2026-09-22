const prisma = require('./prismaClient');
const bcrypt = require('bcryptjs');

async function initDb() {
  try {
    const adminEmail = 'admin@leadtech.com';
    const admin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!admin) {
      const hash = await bcrypt.hash('admin@12345678', 10);
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hash,
          role: 'admin'
        }
      });
      console.log('Default admin user created.');
    }
  } catch (error) {
    console.error('Failed to initialize DB:', error);
  }
}

module.exports = initDb;
