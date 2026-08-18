/**
 * Utility functions for handling Profile Pictures (PP) and Male/Female Default Avatars.
 * Utility bill images are STRICTLY SEPARATE and never used as profile pictures.
 */

export const MALE_DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
export const FEMALE_DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';

export const getDefaultAvatar = (gender?: string): string => {
  if (gender === 'female') {
    return FEMALE_DEFAULT_AVATAR;
  }
  return MALE_DEFAULT_AVATAR;
};

export const getMemberPhoto = (profilePhotoUrl?: string, gender?: string): string => {
  if (profilePhotoUrl && profilePhotoUrl.trim().length > 0) {
    return profilePhotoUrl.trim();
  }
  return getDefaultAvatar(gender);
};
