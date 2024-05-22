-- Adds trigger function to create user in public.users table upon creation in auth.users table
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, "createdAt")
    VALUES (NEW.id, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

INSERT INTO public.users (id, "createdAt")
SELECT id, NOW()
FROM auth.users
ON CONFLICT (id) DO NOTHING;
