import prisma from "~/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const NAME_DIVIDER = "|||";

  function fullNamePairing(): string {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return firstName + NAME_DIVIDER + lastName;
  }

  const newUserData = faker.helpers
    .uniqueArray(fullNamePairing, 100)
    .map((namePairing: string) => {
      const [firstName, lastName] = namePairing.split(NAME_DIVIDER);
      return {
        email: faker.internet.email({ firstName, lastName }),
        name: faker.person.fullName({ firstName, lastName }),
      };
    });

  await prisma.user.createMany({ data: newUserData });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
