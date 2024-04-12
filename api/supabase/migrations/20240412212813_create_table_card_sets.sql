CREATE TABLE
    "cardSets" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "title" TEXT NOT NULL,
        "userId" UUID REFERENCES public.users NOT NULL
    );