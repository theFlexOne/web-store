import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";

// const VITE_SUPABASE_URL = 'https://xagzrhyrpqmxzatzjvwk.supabase.co';
// const VITE_SUPABASE_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZ3pyaHlycHFteHphdHpqdndrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDg0MDMyNywiZXhwIjoyMDEwNDE2MzI3fQ.3bSIFV5op6PeC9b8ev_9k6ntZlMBUcgDeqiKFbRIP6A';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabaseRest = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabaseRest;
