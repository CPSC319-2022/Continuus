-- CreateTable
CREATE TABLE "ContributorRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ContributorRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContributorRequest" ADD CONSTRAINT "ContributorRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
