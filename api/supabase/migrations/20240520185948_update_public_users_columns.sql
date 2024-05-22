-- -- Modifies columns in public.users table
ALTER TABLE public.users
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN "defaultDifficulty" INTEGER,
ADD COLUMN "defaultQuantity" INTEGER;