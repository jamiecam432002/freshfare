import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ytazkkibqegildsgphhf.supabase.co";
const supabaseKey = "sb_publishable_B8UMtbntG2Xqvfd_uji7nQ_N5e7sz6U";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
