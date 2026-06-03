import { prisma } from "../lib/prisma";

async function test() {
  console.log("Current DATABASE_URL in process.env:", process.env.DATABASE_URL);
  try {
    const user = await prisma.user.findUnique({
      where: { email: "nonexistent@example.com" }
    });
    console.log("Success! Found user:", user);
  } catch (e) {
    console.error("FAILED with error:");
    console.error(e);
  }
}

test();
