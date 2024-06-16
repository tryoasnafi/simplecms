// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient, enumRoles } = require('@prisma/client');

const db = new PrismaClient();

const loadUsers = async () => {
  try {
    await db.users.createMany({
      data: [
        {
          id: 1,
          role: enumRoles.admin,
          email: 'admin@simplecms.com',
          name: 'Administrator',
          password:
            '$2b$10$I63gKXReXC.IYEJyvmTx2Olzwn3FA1KZTuOUcsJxzU2MlQE/hFm0S',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          role: enumRoles.writer,
          email: 'writer@simplecms.com',
          name: 'Writer Test',
          password:
            '$2b$10$g7StWfPuPTrCj3oB24JlHe.HGWjX.0.pUjikQGa.PaQG8mzDWoWZ6',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });
    console.log('users created');
  } catch (error) {
    console.error(error);
  }
};

loadUsers();
