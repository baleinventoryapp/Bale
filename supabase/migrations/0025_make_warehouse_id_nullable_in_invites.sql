-- =====================================================
-- Make warehouse_id nullable in invites table
-- This allows admin invites without warehouse assignment
-- =====================================================

-- Drop the NOT NULL constraint on warehouse_id
ALTER TABLE invites
ALTER COLUMN warehouse_id DROP NOT NULL;
