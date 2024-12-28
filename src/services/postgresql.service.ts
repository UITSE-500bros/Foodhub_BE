import dotenv from 'dotenv'
import { createClient, SupabaseClient } from '@supabase/supabase-js';

dotenv.config();
const projectUrl = process.env.PROJECT_URL;
const projectApiKey = process.env.PROJECT_API_KEYS;
class SupabaseSingleton {
    private static instance: SupabaseClient;

    private constructor() {
    }
    public static getInstance(): SupabaseClient {
        if (SupabaseSingleton.instance === undefined) {
            console.log('Creating a new Supabase instance...');
            SupabaseSingleton.instance = createClient(projectUrl, projectApiKey);
        }
        return SupabaseSingleton.instance;
    }
}

const supabaseClient = SupabaseSingleton;
export default supabaseClient;