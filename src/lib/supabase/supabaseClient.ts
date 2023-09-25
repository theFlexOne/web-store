import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
