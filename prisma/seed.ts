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

  const existingUsers = await prisma.user.findMany({ select: { id: true } });

  const authorIds: number[] = [];
  for (const user of existingUsers) {
    const numberOfPosts = faker.number.int({ min: 0, max: 30 });
    for (let i = 0; i < numberOfPosts; i++) {
      authorIds.push(user.id);
    }
  }

  const newPostsData = authorIds.map((id) => ({
    authorId: id,
    title: faker.hacker.noun(),
    content: faker.hacker.phrase(),
    published: faker.datatype.boolean({ probability: 0.75 }),
  }));

  await prisma.post.createMany({ data: newPostsData });
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
