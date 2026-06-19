import { createClient } from "@supabase/supabase-js";

type PreselectionInsert = {
  full_name: string;
  phone: string;
  email?: string | null;
  age?: number | null;
  city: string;
  discipline: string;
  experience?: string | null;
  portfolio_link?: string | null;
  message?: string | null;
};

type Database = {
  public: {
    Tables: {
      preselections: {
        Row: PreselectionInsert & {
          id: string;
          created_at: string;
        };
        Insert: PreselectionInsert;
        Update: Partial<PreselectionInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Configuration Supabase manquante : renseignez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  supabaseClient ??= createClient<Database>(supabaseUrl, supabaseAnonKey);

  return supabaseClient;
}
