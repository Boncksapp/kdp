import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany();
  console.log('Database OK. Users:', users.length);
}
main().catch(e => { console.error('FAILED:', e.message); process.exit(1); }).finally(() => prisma.$disconnect());
