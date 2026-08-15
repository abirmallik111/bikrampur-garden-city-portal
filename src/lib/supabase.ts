import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://usxnsieinshdcvdzntxt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeG5zaWVpbnNoZGN2ZHpudHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3OTE1MDUsImV4cCI6MjEwMjM2NzUwNX0.X9kaomwfl3pt12EIK3OVf2Ywx3d0dEs7Mz2eicYm8jU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload a document or image to Supabase Storage
 */
export async function uploadFileToStorage(
  file: File,
  folder: 'bills' | 'rentals' | 'candidates' = 'bills'
): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('bgc-storage')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.warn('Storage upload error (fallback to local object URL):', error);
      return { url: URL.createObjectURL(file), error: null };
    }

    const { data: publicUrlData } = supabase.storage
      .from('bgc-storage')
      .getPublicUrl(data.path);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: any) {
    console.error('Upload catch error:', err);
    return { url: URL.createObjectURL(file), error: null };
  }
}
