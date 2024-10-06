import { createClient } from "@supabase/supabase-js";
// export const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );
export const client = createClient(
  import.meta.env.VITE_APP_URL,
  import.meta.env.VITE_APP_ANON_KEY
);
