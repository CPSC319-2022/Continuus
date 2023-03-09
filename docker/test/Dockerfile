##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install Prisma Client - remove if not using Prisma
COPY prisma ./

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN npm i 

RUN ls

##### BUILDER

FROM --platform=linux/amd64 node:16-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN ls

RUN npm run build:skip 

