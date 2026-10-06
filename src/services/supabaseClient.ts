import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const isValidSupabaseUrl = (value: string | undefined): value is string => {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

export const supabaseConfigurationError = !supabaseUrl || !supabaseAnonKey
  ? 'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file to enable sign-in.'
  : !isValidSupabaseUrl(supabaseUrl)
    ? 'VITE_SUPABASE_URL must be a valid HTTP or HTTPS URL.'
    : null;

export const supabaseClient = supabaseConfigurationError
  ? null
  : createClient(supabaseUrl, supabaseAnonKey);
