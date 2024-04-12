CREATE TABLE
    "cards" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "front" TEXT NOT NULL,
        "back" TEXT NOT NULL,
        "cardSetId" UUID REFERENCES public."cardSets" NOT NULL
    );