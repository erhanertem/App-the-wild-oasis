import { createClient } from "@supabase/supabase-js";

// the-wild-oasis project reserved supabaseUrl
const supabaseUrl = "https://gbqeulszotpidhqlpfpy.supabase.co";
// Provide supabase access key
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdicWV1bHN6b3RwaWRocWxwZnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NzkwNjMsImV4cCI6MjAyNDI1NTA2M30.S3O7ILZAEJD4mAvcWbMgMSzbAFRug0iTXlNVr6JCdjg";
// Create database from provided URL and key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
