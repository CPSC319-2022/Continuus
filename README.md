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
   3. Run the command `CREATE DATABASE continuus`;

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

## CI-CD Setup

## Cloud Database Setup
