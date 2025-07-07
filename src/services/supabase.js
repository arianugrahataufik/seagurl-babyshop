import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://gouwrwclaopmvzimokbe.supabase.co"; // ganti dengan project URL-mu jika beda
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXdyd2NsYW9wbXZ6aW1va2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzU2MzksImV4cCI6MjA2NTU1MTYzOX0.q9w_2T92r9qaQDLPWlmNvxtJx3xwSqwUg0imNh7Xjss";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
