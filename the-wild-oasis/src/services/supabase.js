import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://uxcyrloxewxyamfoyrva.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4Y3lybG94ZXd4eWFtZm95cnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzODQ3MTAsImV4cCI6MjA3Mzk2MDcxMH0.gQaahHreo6rJsNGCc0STMVcaEnc7mntOf6RXj5Ex2mE";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;