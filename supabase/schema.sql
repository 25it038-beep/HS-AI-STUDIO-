-- ====================================================================
-- HS AI SOLUTIONS: NOTIFICATION & WEB PUSH SYSTEM SCHEMA
-- Compatible with PostgreSQL / Supabase
-- ====================================================================

-- 1. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(64) NOT NULL DEFAULT 'Product Release', -- 'Product Release', 'AI Model', 'Feature Update', 'Announcement'
    image_url TEXT,
    destination_url TEXT NOT NULL DEFAULT '/#projects',
    channels VARCHAR(32) NOT NULL DEFAULT 'both', -- 'in_app', 'push', 'both'
    status VARCHAR(32) NOT NULL DEFAULT 'published', -- 'draft', 'published', 'archived'
    scheduled_for TIMESTAMPTZ,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for querying published announcements sorted by date
CREATE INDEX IF NOT EXISTS idx_announcements_published_at ON public.announcements (status, published_at DESC);

-- 2. NOTIFICATION SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.notification_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint TEXT NOT NULL UNIQUE,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    user_agent TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_active ON public.notification_subscriptions (is_active);

-- 3. USER NOTIFICATION STATUS (Read/Dismissed status per client device)
CREATE TABLE IF NOT EXISTS public.user_notification_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id VARCHAR(128) NOT NULL,
    announcement_id UUID NOT NULL REFERENCES public.announcements(id) ON DELETE CASCADE,
    is_read BOOLEAN NOT NULL DEFAULT TRUE,
    is_dismissed BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (client_id, announcement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_status_client ON public.user_notification_status (client_id);

-- 4. NOTIFICATION DELIVERY LOGS
CREATE TABLE IF NOT EXISTS public.notification_delivery_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    announcement_id UUID NOT NULL REFERENCES public.announcements(id) ON DELETE CASCADE,
    total_subscribers INT NOT NULL DEFAULT 0,
    successful_deliveries INT NOT NULL DEFAULT 0,
    failed_deliveries INT NOT NULL DEFAULT 0,
    expired_removed INT NOT NULL DEFAULT 0,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notification_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_delivery_logs ENABLE ROW LEVEL SECURITY;

-- Anonymous public users can only read published announcements
CREATE POLICY "Public users can view published announcements"
    ON public.announcements FOR SELECT
    USING (status = 'published' AND published_at <= NOW());

-- Only server service role can insert or update announcements
CREATE POLICY "Service role manages announcements"
    ON public.announcements FOR ALL
    USING (auth.role() = 'service_role');

-- Public users can subscribe (insert their own subscription endpoint)
CREATE POLICY "Allow anonymous users to subscribe"
    ON public.notification_subscriptions FOR INSERT
    WITH CHECK (true);

-- Only service role can read or delete push subscriptions
CREATE POLICY "Service role manages subscriptions"
    ON public.notification_subscriptions FOR ALL
    USING (auth.role() = 'service_role');
