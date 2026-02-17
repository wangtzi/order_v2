import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance: any;

if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('YOUR_SUPABASE_URL')) {
    try {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false
            }
        });
    } catch (e) {
        console.warn('Supabase init failed', e);
    }
}

// Mock fallback if initialization failed or credentials missing
if (!supabaseInstance) {
    console.warn('Using Mock Supabase Client');
    supabaseInstance = {
        from: () => ({
            select: async () => ({ data: null, error: { message: 'No Supabase credentials' } }),
            insert: async () => ({ error: { message: 'No Supabase credentials' } })
        })
    };
}

export const supabase = supabaseInstance;
