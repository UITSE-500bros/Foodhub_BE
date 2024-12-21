import dotenv from 'dotenv'
import { createClient, SupabaseClient } from '@supabase/supabase-js';

dotenv.config();
const projectUrl = process.env.PROJECT_URL;
const projectApiKey = process.env.PROJECT_API_KEYS;
class SupabaseSingleton {
    private static instance: SupabaseClient | null = null;

    private constructor() {
        // Prevent direct instantiation
    }
    public static getInstance(): SupabaseClient {
        if (SupabaseSingleton.instance === null) {
            console.log('Creating a new Supabase instance...');
            SupabaseSingleton.instance = createClient(projectUrl, projectApiKey);
        } else {
            console.log('Supabase instance already exists.');
        }
        
        return SupabaseSingleton.instance;
    }
}

const supabaseClient = SupabaseSingleton;
export default supabaseClient;