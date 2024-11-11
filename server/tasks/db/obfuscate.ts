import prisma from "~/lib/prisma";
import { fakerFR as faker } from "@faker-js/faker";

export default defineTask({
  meta: {
    name: "db:obfuscate",
    description: "Run database obfuscation",
  },
  async run() {
    const numberOfUsers = await obfuscateUsers();
    const numberOfPosts = await obfuscateMessages();

    return {
      result: "Obfuscation completed!",
      usersUpdated: numberOfUsers,
      postsUpdated: numberOfPosts,
    };

    async function obfuscateUsers(): Promise<number> {
      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true },
      });

      for (const user of users) {
        let newName;
        let newEmail;
        let isEmailUnique;

        do {
          const firstName = faker.person.firstName();
          const lastName = faker.person.lastName();
          newName = faker.person.fullName({ firstName, lastName });
          newEmail = faker.internet.email({ firstName, lastName });

          const existingUser = await prisma.user.findUnique({
            where: { email: newEmail },
            select: { id: true },
          });
          isEmailUnique = !existingUser;
        } while (!isEmailUnique);

        console.log(
          `Changing User ${user.id} - ${user.name} (${user.email}) to ${newName} (${newEmail})`,
        );

        await prisma.user.update({
          where: { id: user.id },
          data: {
            name: newName,
            email: newEmail,
          },
        });
      }

      return users.length;
    }

    async function obfuscateMessages(): Promise<number> {
      const posts = await prisma.post.findMany({ select: { id: true } });

      for (const post of posts) {
        const newTitle = faker.lorem.sentence({ min: 2, max: 4 });
        const newContent = faker.lorem.text();

        await prisma.post.update({
          where: { id: post.id },
          data: {
            title: newTitle,
            content: newContent,
            published: faker.datatype.boolean({ probability: 0.75 }),
          },
        });
      }

      return posts.length;
    }
  },
});
