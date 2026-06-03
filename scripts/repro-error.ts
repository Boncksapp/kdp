import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:/home/team/shared/kdp-studio/prisma/dev.db"
    }
  }
});

async function main() {
  console.log("Testing Prisma connection with explicit URL...");
  try {
    const user = await prisma.user.findUnique({
      where: { email: "test@example.com" }
    });
    console.log("SUCCESS: findUnique worked. User:", user);
  } catch (error) {
    console.error("FAILURE: Prisma error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
