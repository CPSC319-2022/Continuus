import { BlogPost, PrismaClient, User } from "@prisma/client";
import { Role } from "@prisma/client";
import { sentence, article } from "txtgen";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

const config: Config = {
  dictionaries: [names],
};

const users: User[] = [];
const blogposts: BlogPost[] = [];

const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);

  // User
  console.log("Creating Users...");
  for (let i = 0; i < 20; i++) {
    const name: string = uniqueNamesGenerator(config);
    const role: Role = generateRole(Role);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: `${name}@mailinator.com`,
        image: `https://i.pravatar.cc/150?img=${i}`,
        role: role,
      },
    });
    users.push(user);
  }
  console.log("20 users created");

  // get contributors and admins
  const contributorsAndAdmins: User[] = users.filter(({ role }) => {
    return role === Role.ADMIN || role === Role.CONTRIBUTOR;
  });

  const getIdOfRandomContributorOrAdmin = (): string => {
    const values = Object.values(contributorsAndAdmins);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex]!.id;
  };

  // BlogPost
  console.log("Creating Blog Posts...");
  for (let _ = 0; _ < 100; _++) {
    const userId: string = getIdOfRandomContributorOrAdmin();
    const title: string = generateRandomTitle();
    const blogContent: string = generateRandomMarkdown();

    const blogpost = await prisma.blogPost.create({
      data: {
        userId: userId,
        title: title,
        content: blogContent,
      },
    });
    blogposts.push(blogpost);
  }
  console.log("100 blog posts created");

  // Comment
  console.log("Creating Comments...");
  blogposts.map(async ({ id }) => {
    const comments: string[] = generateComments(50);
    for (let i = 0; i < comments.length; i++) {
      await prisma.comment.create({
        data: {
          userId: getIdOfRandomContributorOrAdmin(),
          blogPostId: id,
          content: comments[i]!,
        },
      });
    }
  });
  console.log("0 to 50 comments created for each blog post");
};

const generateRole = (Role: {
  READER: "READER";
  CONTRIBUTOR: "CONTRIBUTOR";
  ADMIN: "ADMIN";
}) => {
  const values = Object.values(Role);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex]!;
};

const generateRandomTitle = (): string => {
  const randomIndex = Math.floor(Math.random() * 3) + 3; // 3 to 5 inclusive
  const title = sentence().split(" ").slice(0, randomIndex).join(" ");
  if (title.endsWith(",")) {
    return title.slice(0, title.length - 1);
  }
  return title;
};

const generateRandomMarkdown = (): string => {
  const num = Math.floor(Math.random() * 2); // generates 0 or 1
  if (num == 1) {
    return `# ${sentence()}\n*${sentence()}*\n${article()}`;
  }
  return article();
};

// generates between 0 to maxNumber inclusive
const generateComments = (maxNumber: number): string[] => {
  // get random number between 0 and 50 inclusive
  const num = Math.floor(Math.random() * (maxNumber + 1));
  const comments: string[] = [];
  for (let i = 0; i < num; i++) {
    comments.push(sentence());
  }
  return comments;
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
