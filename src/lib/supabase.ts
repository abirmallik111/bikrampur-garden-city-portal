import { createClient } from '@supabase/supabase-js';
import {
  VoterApplication,
  Voter,
  Election,
  Vote,
  Complaint,
  RentalListing,
  CommitteeMember,
  Announcement
} from '../types';

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

/**
 * Safe Cloud DB Sync Helpers
 */
export async function fetchAllFromCloud() {
  try {
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500));
    const fetchPromise = (async () => {
      const [
        { data: apps },
        { data: voters },
        { data: elections },
        { data: committee },
        { data: announcements },
        { data: complaints },
        { data: rentals },
        { data: votes }
      ] = await Promise.all([
        supabase.from('voter_applications').select('*'),
        supabase.from('voters').select('*'),
        supabase.from('elections').select('*'),
        supabase.from('committee_members').select('*'),
        supabase.from('announcements').select('*'),
        supabase.from('complaints').select('*'),
        supabase.from('rental_listings').select('*'),
        supabase.from('votes').select('*')
      ]);

      return {
        applications: (apps as VoterApplication[]) || null,
        voters: (voters as Voter[]) || null,
        elections: (elections as Election[]) || null,
        committee: (committee as CommitteeMember[]) || null,
        announcements: (announcements as Announcement[]) || null,
        complaints: (complaints as Complaint[]) || null,
        rentals: (rentals as RentalListing[]) || null,
        votes: (votes as Vote[]) || null
      };
    })();

    const result = await Promise.race([fetchPromise, timeoutPromise]);
    return result;
  } catch (err) {
    console.warn('Could not fetch from Supabase Cloud, using local storage:', err);
    return null;
  }
}

export async function cloudInsert(table: string, record: any) {
  try {
    const { error } = await supabase.from(table).insert([record]);
    if (error) {
      console.warn(`Supabase insert error on ${table}:`, error.message);
      // If error is about a missing column, retry without the optional extra fields
      if (error.message.includes('column') || error.message.includes('schema cache')) {
        const fallbackRecord = { ...record };
        delete fallbackRecord.gender;
        delete fallbackRecord.profile_photo_url;
        const retry = await supabase.from(table).insert([fallbackRecord]);
        if (!retry.error) {
          console.log(`Supabase fallback insert succeeded for ${table}`);
        }
      }
    }
  } catch (e) {
    console.warn(`Supabase insert catch on ${table}:`, e);
  }
}

export async function cloudUpsert(table: string, record: any) {
  try {
    const { error } = await supabase.from(table).upsert([record]);
    if (error) console.warn(`Supabase upsert error on ${table}:`, error.message);
  } catch (e) {
    console.warn(`Supabase upsert catch on ${table}:`, e);
  }
}

export async function cloudUpdate(table: string, id: string, updates: any) {
  try {
    const { error } = await supabase.from(table).update(updates).eq('id', id);
    if (error) console.warn(`Supabase update error on ${table}:`, error.message);
  } catch (e) {
    console.warn(`Supabase update catch on ${table}:`, e);
  }
}

export async function cloudDelete(table: string, id: string) {
  try {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) console.warn(`Supabase delete error on ${table}:`, error.message);
  } catch (e) {
    console.warn(`Supabase delete catch on ${table}:`, e);
  }
}
