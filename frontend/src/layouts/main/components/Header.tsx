import Logo from '../../components/Logo';
import ThemeToggle from '../../../components/ThemeToggle';

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
/**
 * Main header component for the application
 */
const MainHeader = ({ logoSrc, logoAlt, logoText }: MainHeaderProps = {}) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <section className="flex justify-start items-center">
          <Logo imageSrc={logoSrc} imageAlt={logoAlt} text={logoText} />
        </section>
        <section className="flex items-center lg:order-2">
          <ThemeToggle className="mr-2" />
        </section>
      </div>
    </nav>
  );
};

export default MainHeader;
