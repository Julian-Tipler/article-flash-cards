CREATE TABLE
    "sets" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "title" TEXT NOT NULL,
        "userId" UUID REFERENCES public.users NOT NULL,
        "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
    );