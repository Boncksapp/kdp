const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function testLogin(email, password) {
  console.log(`Testing login for ${email} with password: ${password}`);
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      console.log("LOGIN_FAILED: User not found");
      return;
    }
    
    console.log(`User found. Hash in DB: ${user.password_hash}`);
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    console.log("PASSWORD_VALID:", isPasswordValid);
  } catch (err) {
    console.error("TEST_ERROR:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];
const password = process.argv[3];
testLogin(email, password);
