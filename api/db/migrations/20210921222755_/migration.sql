-- CreateTable
CREATE TABLE "OAuth" (
    "codeChallenge" TEXT NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    PRIMARY KEY ("codeChallenge")
);
