# Local Installation Guide


## Google OAuth Setup 
- Follow the instructions in **[Setting Up OAuth 2.0](https://support.google.com/cloud/answer/6158849)**
  1. For the "Application Type", choose "Web application"
  2. Add a URI to "Authorized JavaScript origins":
       - `http://localhost`
  3. Add a URI to "Authorized redirect URIs":
       - `http://localhost:3000/api/auth/callback/google`
  4. **Save the Client ID and the Client secret somewhere safe, we will use these during the blog application setup** 

## Blog Application Setup
### 1. Clone the repo
- Clone the repository using:
```
git clone git@github.com:CPSC319-2022/Continuus.git
```

### 2. Install Node/npm
1. Go to: https://nodejs.org/en/ 

2. Download the LTS version

3. Follow the setup instructions

4. Run `npm --version`
   - If you don’t get the version number (the error message is something like “what’s npm?”), then try restarting your terminals, try checking the PATH environment variable and try restarting your system

### 3. Install dependencies
- You can install dependencies using (run in the project root folder):

```
npm install
```

### 4. Setting up the environment
1. Copy-paste the .env.example and rename to .env
2. Set the variables in the .env to appropriate values
    - DATABASE_URL: Use the default value, if needed you can update this depending on your Postgres setup (next section)
    - NEXTAUTH_URL: If you are developing locally, leave this as default
    - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET: Set these to the client id and client secret you have saved from the Google OAuth Setup section

### 5. Setting up Prisma

1. Install Postgres Database locally
   1. IMPORTANT: Set your username to postgres and password to password for .env-example to work. Follow [How to Run and Setup a Local PostgreSQL Database | Prisma](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)
   2. Open the psql terminal
   3. Run the command `CREATE DATABASE continuus;`

2. Run 
```
npx prisma migrate dev
```
   - This will update the database using the schema
   - And also generate the Prisma Client

### 6. Run

Use `npm run dev` to start a dev server running in your local


# Deployment Guide

## GitHub Setup

- You have 2 options, choose **only one** of these options; forking the repo, or creating a new repo
  - Forking a repo is easier
  - You may want to create a new repo; if you have changes in your local, it's easier to create a new repo

### Forking the repo

1. Go to `https://github.com/CPSC319-2022/Continuus`
2. Click on the "Fork" button
3. Enter the repository name as you wish
4. **Deselect** the "Copy the `dev` branch only" option
5. Press "Create fork" button
6. The repo you created will have the 'dev', 'qa' and 'prod' branches by default.

### Creating a new repo

1. If you have not cloned the repository previously
   - Clone the repository using:
        ```
        git clone git@github.com:CPSC319-2022/Continuus.git
        ```
1. [Create a new repository in GitHub](https://github.com/new)
   1. **Deselect** 'Add a README file' option
   2. Do **NOT** add .gitignore
   3. Do **NOT** add a licence
2. Set the remote origin url using:
```
git remote set-url origin [github ssh address]
```
1. Then set the main branch as dev and push
```
git branch -M dev
git push -u origin dev
```
1. The repo will **NOT** have the 'qa' and 'prod' branches by default, so feel free to create them now or later.


## Cloud Database Setup

### Creating a Postgres DB Instance on Google Cloud

1. Follow instructions [**here**](https://cloud.google.com/sql/docs/postgres/create-instance#create-2nd-gen) to create a Postgres instance on Google Cloud
   - Store the password for the postgres user somewhere safe
   - Don't need to "configure a password policy for the instance"
   - Database version should be `PostgeSQL 14`
   - Make sure to note down the region you selected, you will need it during the CI-CD Setup
   - You do **not** need to customize your instance (choose the free/default option)
2. Follow instructions [**here**](https://cloud.google.com/sql/docs/postgres/create-manage-databases#create) to create a database
   - Create 3 databases:
     - `dev`
     - `prod`
     - `qa`



## CI-CD Setup

TODOS:

[CI-CD Setup] setup steps for github actions

[CI-CD Setup] setup steps for secret manager

[CI-CD Setup] setup steps for slack integration

[CI-CD Setup] setup steps for cloud build
