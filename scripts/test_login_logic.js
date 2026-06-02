const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function testLogin() {
  const email = "georgebonck@gmail.com";
  const password = "Password123!";
  
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      console.log("LOGIN_FAILED: User not found");
      return;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    console.log("PASSWORD_VALID:", isPasswordValid);
    
    if (isPasswordValid) {
      console.log("LOGIN_SUCCESS");
    } else {
      console.log("LOGIN_FAILED: Invalid password");
    }
  } catch (err) {
    console.error("TEST_ERROR:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();
