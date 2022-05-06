-- CreateEnum
CREATE TYPE "OAuthConnectionType" AS ENUM ('TWITCH', 'COINBASE');

-- CreateTable
CREATE TABLE "OAuthConnection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,
    "type" "OAuthConnectionType" NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT,
    "accessToken" TEXT NOT NULL,
    "expiration" TIMESTAMP(3),

    CONSTRAINT "OAuthConnection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OAuthConnection" ADD CONSTRAINT "OAuthConnection_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
