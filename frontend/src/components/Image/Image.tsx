import { useState, ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  lazyLoad?: boolean;
}

/**
 * Reusable Image component with built-in error handling, lazy loading, and responsive features
 *
 * @param src - The source URL of the image
 * @param alt - Alternative text for the image (required for accessibility)
 * @param fallbackSrc - URL to use if the image fails to load
 * @param aspectRatio - CSS aspect ratio (e.g., '16/9', '1/1')
 * @param objectFit - How the image should be resized to fit its container
 * @param lazyLoad - Whether to use lazy loading (default: true)
 * @param className - Additional CSS classes
 */
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  aspectRatio,
  objectFit = 'cover',
  lazyLoad = true,
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const style = {
    aspectRatio,
    objectFit,
    ...props.style,
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading={lazyLoad ? 'lazy' : undefined}
      style={style}
      className={`max-w-full ${className}`}
      {...props}
    />
  );
};

export default Image;
