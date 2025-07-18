import { memo } from 'react';
import Image from '../../components/Image';
import { DEFAULT_IMAGES } from '../../constants/images';

export type LogoProps = {
  imageSrc?: string;
  imageAlt?: string;
  text?: string;
};

/**
 * Logo component for the main header
 */
const Logo = memo(
  ({
    imageSrc = DEFAULT_IMAGES.LOGO,
    imageAlt = 'Tilvio',
    text = 'Tilvio',
  }: LogoProps) => (
    <a href="#" className="flex items-center justify-between mr-4">
      <Image
        src={imageSrc}
        className="mr-3 h-8"
        alt={imageAlt}
        fallbackSrc="/placeholder.svg"
        objectFit="contain"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden sm:inline-block">
        {text}
      </span>
    </a>
  ),
);

export default Logo;
