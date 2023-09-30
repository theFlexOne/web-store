import { createClient } from '@supabase/supabase-js';

const VITE_SUPABASE_URL = 'https://xagzrhyrpqmxzatzjvwk.supabase.co';
const VITE_SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZ3pyaHlycHFteHphdHpqdndrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDg0MDMyNywiZXhwIjoyMDEwNDE2MzI3fQ.3bSIFV5op6PeC9b8ev_9k6ntZlMBUcgDeqiKFbRIP6A';

const supabaseUrl = VITE_SUPABASE_URL as string;
const supabaseKey = VITE_SUPABASE_KEY as string;

const supabaseGQL = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'graphql_public' },
});

export default supabaseGQL;
