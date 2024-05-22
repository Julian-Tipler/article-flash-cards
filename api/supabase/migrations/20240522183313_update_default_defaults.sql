ALTER TABLE public.users
ALTER COLUMN "defaultDifficulty"
SET DEFAULT 5,
ALTER COLUMN "defaultQuantity"
SET DEFAULT 5;

UPDATE public.users
SET
    "defaultDifficulty" = 5
WHERE
    "defaultDifficulty" IS NULL;

UPDATE public.users
SET
    "defaultQuantity" = 5
WHERE
    "defaultQuantity" IS NULL;