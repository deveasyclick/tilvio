import { useCallback, useState } from 'react';
import AppsDropdown from './dropdowns/Apps/AppsDropdown';
import NotificationsDropdown from './dropdowns/Notifications/NotificationsDropdown';
import UserMenuDropdown from './dropdowns/UserMenu/UserMenuDropdown';
import IconWrapper from '../../IconWrapper/IconWrapper';
import Image from '../../Image';
import { DEFAULT_IMAGES } from '../../../constants/images';
import { MainHeaderProps } from './types';
import Logo from './Logo';
import SearchForm from './SearchForm';
import HeaderButton from './HeaderButton';
import { useSidebar } from '../../../contexts/SidebarContext';
import ThemeToggle from '../../ThemeToggle';

/**
 * Main header component for the application
 */
const MainHeader = ({
  logoSrc,
  logoAlt,
  logoText,
  userPhotoSrc = 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png',
  userPhotoAlt = 'user photo',
  userName = 'Michael Gough',
  userEmail = 'michael@example.com',
  onProfileClick,
  onSettingsClick,
  onLikesClick,
  onCollectionsClick,
  onProVersionClick,
  onSignOut,
}: MainHeaderProps = {}) => {
  // Get sidebar context
  const { toggleSidebar, isSidebarOpen } = useSidebar();

  // State for tracking which dropdown is open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close dropdown when clicking outside
  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  // Toggle dropdown - close if already open, open and close others if closed
  const toggleDropdown = useCallback((dropdownId: string) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdownId ? null : dropdownId,
    );
  }, []);

  // Memoized handlers for each dropdown
  const handleToggleApps = useCallback(
    () => toggleDropdown('apps'),
    [toggleDropdown],
  );

  const handleToggleNotifications = useCallback(
    () => toggleDropdown('notifications'),
    [toggleDropdown],
  );

  const handleToggleUserMenu = useCallback(
    () => toggleDropdown('userMenu'),
    [toggleDropdown],
  );

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <section className="flex justify-start items-center">
          <HeaderButton
            id="sidebar-toggle-button"
            ariaControls="sidebar"
            className="md:hidden"
            onClick={toggleSidebar}
            ariaExpanded={isSidebarOpen}>
            <IconWrapper
              name="menu"
              className={isSidebarOpen ? 'hidden' : ''}
            />
            <IconWrapper
              name="cancel"
              className={isSidebarOpen ? '' : 'hidden'}
            />
            <span className="sr-only">Toggle sidebar</span>
          </HeaderButton>
          <Logo imageSrc={logoSrc} imageAlt={logoAlt} text={logoText} />
          <SearchForm />
        </section>
        <section className="flex items-center lg:order-2">
          <HeaderButton ariaControls="mobile-search" className="md:hidden">
            <span className="sr-only">Toggle search</span>
            <IconWrapper name="search" aria-hidden="true" />
          </HeaderButton>

          <ThemeToggle className="mr-2" />

          <HeaderButton
            ariaControls="notification-dropdown"
            ariaExpanded={activeDropdown === 'notifications'}
            onClick={handleToggleNotifications}>
            <span className="sr-only">View notifications</span>
            <IconWrapper name="bell" />
          </HeaderButton>
          <NotificationsDropdown
            isOpen={activeDropdown === 'notifications'}
            onClose={closeDropdown}
          />

          <HeaderButton
            ariaControls="apps-dropdown"
            ariaExpanded={activeDropdown === 'apps'}
            onClick={handleToggleApps}>
            <span className="sr-only">View Apps</span>
            <IconWrapper name="apps" />
          </HeaderButton>
          <AppsDropdown
            isOpen={activeDropdown === 'apps'}
            onClose={closeDropdown}
          />

          <HeaderButton
            ariaControls="user-menu-dropdown"
            ariaExpanded={activeDropdown === 'userMenu'}
            onClick={handleToggleUserMenu}
            id="user-menu-button">
            <span className="sr-only">Open user menu</span>
            <Image
              className="w-8 h-8 rounded-full"
              src={userPhotoSrc}
              alt={userPhotoAlt}
              fallbackSrc={DEFAULT_IMAGES.USER_AVATAR}
              objectFit="cover"
            />
          </HeaderButton>
          <UserMenuDropdown
            isOpen={activeDropdown === 'userMenu'}
            onClose={closeDropdown}
            userName={userName}
            userEmail={userEmail}
            userAvatarUrl={userPhotoSrc}
            onProfileClick={onProfileClick}
            onSettingsClick={onSettingsClick}
            onLikesClick={onLikesClick}
            onCollectionsClick={onCollectionsClick}
            onProVersionClick={onProVersionClick}
            onSignOut={onSignOut}
          />
        </section>
      </div>
    </nav>
  );
};

export default MainHeader;
