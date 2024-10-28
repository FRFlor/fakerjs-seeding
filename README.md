# Nuxt FakerJS Seeder Project

This repository contains a Nuxt.js project designed to teach users how to utilize FakerJS for data seeding in a SQLite database.

## Features

- **FakerJS Integration**: Learn how to generate fake data using FakerJS.
- **Nitro Tasks**: Leverage Nitro Tasks UI within the Nuxt DevTools, to run the seeder in the server.
- **Nuxt Prisma Module**: Setup prisma for database interactions, and use Nuxt DevTools to visualise your Prisma models.

## Getting Started

To get started with this project, follow the steps below:

1. **Install dependencies**

```bash
# pnpm
pnpm install

# npm
npm install
```

2. **Setup the environment file**

```bash
cp .env.example .env
```

3. **Initialize your database** 

```bash
pnpx prisma migrate dev
```

4. **Run the development server**

```bash
# pnpm
pnpm dev

# npm
npm run dev
```

5. **Access the Application**:

Open your browser and go to http://localhost:3000 to access the application.

6. **Opening the Server Tasks and Prisma Dashboards**:

First open the Nuxt DevTools by clicking on the Nuxt icon at the bottom of the page:

   <img width="587" alt="image" src="https://github.com/user-attachments/assets/3d55875a-f1b9-43b2-9d98-9287d9749ba5">

Then from within the DevTools, click on the 3 vertical dots:

   <img width="849" alt="image" src="https://github.com/user-attachments/assets/7b4ac920-3ef6-4320-963d-28b5bea05095">

The Server Tasks and Prisma Dashboards are available upon pressing these buttons:

   <img width="351" alt="image" src="https://github.com/user-attachments/assets/ce3691d8-a297-4adb-8461-c75a66e4a103">

7. **Running just the Seeder**:

* Within the Server Tasks dashboard click on "db:seed"
* Press "Run Task"
* By default the runner used is "pnpx", if you want to use a different runner (e.g. `npx`), you can do so by passing a `runner` payload to the task.

<img width="1231" alt="image" src="https://github.com/user-attachments/assets/5c71e001-3622-4d48-ba90-b80b3dacf7f2">




