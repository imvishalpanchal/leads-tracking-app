const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  console.log('Seeding database...');
  await prisma.lead.deleteMany();
  await prisma.user.deleteMany();
  console.log('Cleared existing data.');
  const hashedPassword = await bcrypt.hash('admin@12345678', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@leadtech.com',
      password: hashedPassword,
    },
  });
  console.log('Created admin user:', adminUser.email);
  const lead = await prisma.lead.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      status: 'new',
    },
  });
  console.log('Created initial lead:', lead.name);
  console.log('Database seeding completed successfully.');
}
main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
