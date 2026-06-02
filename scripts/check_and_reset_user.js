const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkUser() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "georgebonck@gmail.com" }
    });
    console.log("USER_FOUND:", !!user);
    if (user) {
      console.log("USER_ID:", user.id);
      // Delete the user so they can sign up again fresh
      await prisma.user.delete({
        where: { email: "georgebonck@gmail.com" }
      });
      console.log("USER_DELETED_SUCCESSFULLY");
    }
  } catch (err) {
    console.error("DB_ERROR:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();
