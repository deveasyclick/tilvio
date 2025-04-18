import { memo } from 'react';
import { LogoProps } from './types';
import Image from '../../Image';
import { DEFAULT_IMAGES } from '../../../constants/images';

/**
 * Logo component for the main header
 */
const Logo = memo(
  ({
    imageSrc = DEFAULT_IMAGES.LOGO,
    imageAlt = 'React Tailwind Dashboard With Sidebar ',
    text = 'Dashboard',
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
