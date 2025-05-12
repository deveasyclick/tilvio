import { useState, useEffect } from 'react';
import Image from './Image';
import type { ImgHTMLAttributes } from 'react';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  lowResSrc?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  lazyLoad?: boolean;
  placeholderColor?: string;
  onLoad?: () => void;
}

/**
 * Advanced image component with progressive loading and fallback
 *
 * @param src - The source URL of the image
 * @param alt - Alternative text for the image
 * @param fallbackSrc - URL to use if the image fails to load
 * @param lowResSrc - Low resolution version to show while loading
 * @param aspectRatio - CSS aspect ratio (e.g., '16/9', '1/1')
 * @param objectFit - How the image should be resized to fit its container
 * @param lazyLoad - Whether to use lazy loading
 * @param placeholderColor - Background color to show while loading
 * @param onLoad - Callback function when image loads successfully
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  lowResSrc,
  aspectRatio,
  objectFit = 'cover',
  lazyLoad = true,
  placeholderColor = '#f1f5f9',
  onLoad,
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(lowResSrc || src);
  const [isLoading, setIsLoading] = useState<boolean>(!!lowResSrc);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // If we're using a low-res placeholder, load the high-res version
    if (lowResSrc && lowResSrc !== src) {
      // Use HTMLImageElement constructor to avoid naming conflict with our Image component
      const highResImage = new window.Image();
      highResImage.src = src;

      highResImage.onload = () => {
        setImgSrc(src);
        setIsLoading(false);
        onLoad?.();
      };

      highResImage.onerror = () => {
        setImgSrc(fallbackSrc);
        setIsLoading(false);
        setHasError(true);
      };
    }
  }, [src, lowResSrc, fallbackSrc, onLoad]);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const style = {
    aspectRatio,
    objectFit,
    backgroundColor: isLoading ? placeholderColor : undefined,
    transition: 'filter 0.3s ease-in-out',
    filter: isLoading ? 'blur(8px)' : 'none',
    ...props.style,
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      style={style}
      lazyLoad={lazyLoad}
      className={`${isLoading ? 'animate-pulse' : ''} ${className}`}
      {...props}
    />
  );
};

export default ImageWithFallback;
