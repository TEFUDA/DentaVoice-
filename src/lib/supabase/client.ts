import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Retourner un client mock pour le build
    return {
      auth: {
        signInWithPassword: async () => ({ error: { message: 'Not configured' } }),
        signUp: async () => ({ error: { message: 'Not configured' }, data: {} }),
        signInWithOAuth: async () => ({ error: { message: 'Not configured' } }),
        signOut: async () => {},
        getUser: async () => ({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }), order: () => ({ limit: async () => ({ data: [], error: null }) }) }) }),
        insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
        delete: () => ({ eq: async () => ({ error: null }) }),
      }),
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
