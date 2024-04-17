CREATE TABLE
    "cards" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "front" TEXT NOT NULL,
        "back" TEXT NOT NULL,
        "setId" UUID REFERENCES public."sets" NOT NULL,
        "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
    );