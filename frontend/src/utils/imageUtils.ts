/**
 * Utility functions for image handling
 */

/**
 * Generates a URL for a responsive image based on the device pixel ratio
 *
 * @param basePath - The base path to the image
 * @param filename - The filename without extension
 * @param extension - The file extension
 * @param sizes - Array of sizes to generate
 * @returns An object with src and srcSet for use in img elements
 */
export function getResponsiveImageUrl(
  basePath: string,
  filename: string,
  extension: string = 'webp',
  sizes: number[] = [320, 640, 960, 1280, 1920],
): { src: string; srcSet: string } {
  // Default image is the middle size or the last if fewer than 3 sizes
  const defaultSize =
    sizes[Math.min(Math.floor(sizes.length / 2), sizes.length - 1)];
  const src = `${basePath}/${filename}-${defaultSize}.${extension}`;

  // Generate srcSet string
  const srcSet = sizes
    .map((size) => `${basePath}/${filename}-${size}.${extension} ${size}w`)
    .join(', ');

  return { src, srcSet };
}

/**
 * Generates a URL for an image with the correct path
 *
 * @param path - The path to the image relative to the assets directory
 * @returns The URL to the image
 */
export function getImageUrl(path: string): string {
  // For imported assets, Vite will handle the URL transformation
  try {
    // Try to import the image dynamically
    const imageUrl = new URL(`../assets/${path}`, import.meta.url).href;
    return imageUrl;
  } catch (error) {
    console.error(`Failed to import image: ${path}`, error);
    // Fallback to a simple path for public directory images
    if (path.startsWith('/')) {
      return path;
    }
    return `/${path}`;
  }
}

/**
 * Checks if an image URL is external (not from our domain)
 *
 * @param url - The URL to check
 * @returns True if the URL is external
 */
export function isExternalImage(url: string): boolean {
  // If it's a relative URL, it's not external
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return false;
  }

  // If it has a protocol, check if it's from our domain
  if (url.startsWith('http')) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname !== window.location.hostname;
    } catch (e) {
      console.error('Error parsing URL:', e);
      return true;
    }
  }

  return false;
}

/**
 * Generates a placeholder image URL with specified dimensions and text
 *
 * @param width - Width of the placeholder
 * @param height - Height of the placeholder
 * @param text - Text to display on the placeholder
 * @param bgColor - Background color
 * @param textColor - Text color
 * @returns URL for a placeholder image
 */
export function getPlaceholderImage(
  width: number = 200,
  height: number = 200,
  text: string = 'Image',
  bgColor: string = 'e2e8f0',
  textColor: string = '94a3b8',
): string {
  // Encode the text for URL safety
  const encodedText = encodeURIComponent(text);

  // Return a dynamic placeholder URL with all parameters
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodedText}`;
}
