/**
 * Common props for dropdown components
 */
export type DropdownProps = {
  isOpen: boolean;
  onClose?: () => void;
};

/**
 * Props for header button component
 */
export type HeaderButtonProps = {
  ariaControls: string;
  ariaExpanded?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/**
 * Props for the logo component
 */
export type LogoProps = {
  imageSrc?: string;
  imageAlt?: string;
  text?: string;
};

/**
 * Props for the main header component
 */
export type MainHeaderProps = {
  logoSrc?: string;
  logoAlt?: string;
  logoText?: string;
  userPhotoSrc?: string;
  userPhotoAlt?: string;
  userName?: string;
  userEmail?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLikesClick?: () => void;
  onCollectionsClick?: () => void;
  onProVersionClick?: () => void;
  onSignOut?: () => void;
};
