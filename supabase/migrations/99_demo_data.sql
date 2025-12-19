-- Create a dummy user in auth.users (simplification for local dev)
-- Note: In real supabase, we can't easily insert into auth.users without proper hashing, but for FK constraints this might be enough if we don't try to actually login with password.
-- actually, we can just insert into public.users if we remove the FK constraint? No, better to try to insert valid-ish data.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000000') THEN
        INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
        VALUES ('00000000-0000-0000-0000-000000000000', 'demo@example.com', 'hashed_password', now());
    END IF;
END $$;

-- Insert into public.users
INSERT INTO public.users (id, email, full_name)
VALUES ('00000000-0000-0000-0000-000000000000', 'demo@example.com', 'Demo User')
ON CONFLICT (id) DO NOTHING;

-- Insert sample water logs for the last 7 days
INSERT INTO public.water_logs (user_id, amount_ml, logged_at)
VALUES 
('00000000-0000-0000-0000-000000000000', 500, now() - interval '1 day'),
('00000000-0000-0000-0000-000000000000', 300, now() - interval '1 day' - interval '2 hours'),
('00000000-0000-0000-0000-000000000000', 500, now() - interval '2 days'),
('00000000-0000-0000-0000-000000000000', 450, now() - interval '2 days' - interval '4 hours'),
('00000000-0000-0000-0000-000000000000', 500, now() - interval '3 days'),
('00000000-0000-0000-0000-000000000000', 200, now() - interval '3 days' - interval '8 hours'),
('00000000-0000-0000-0000-000000000000', 600, now() - interval '4 days'),
('00000000-0000-0000-0000-000000000000', 500, now() - interval '5 days');
