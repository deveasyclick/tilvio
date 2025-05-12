/**
 * Constants for image paths and default images
 */

export const DEFAULT_IMAGES = {
  PLACEHOLDER: '/placeholder.svg',
  USER_AVATAR: '/user-avatar-placeholder.svg',
  LOGO: '/logo.svg',
};

export const IMAGE_PATHS = {
  AVATARS: '/images/avatars',
  LOGOS: '/images/logos',
  ICONS: '/images/icons',
  BACKGROUNDS: '/images/backgrounds',
};

export const EXTERNAL_IMAGES = {
  DEFAULT_AVATAR:
    'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png',
};

/**
 * Get the full path to an avatar image
 * @param filename The filename of the avatar image
 * @returns The full path to the avatar image
 */
export function getAvatarPath(filename: string): string {
  return `${IMAGE_PATHS.AVATARS}/${filename}`;
}

/**
 * Get the full path to a logo image
 * @param filename The filename of the logo image
 * @returns The full path to the logo image
 */
export function getLogoPath(filename: string): string {
  return `${IMAGE_PATHS.LOGOS}/${filename}`;
}
