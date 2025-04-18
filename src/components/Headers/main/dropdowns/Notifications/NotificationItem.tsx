import { memo } from 'react';
import IconWrapper from '../../../../IconWrapper/IconWrapper';
import Image from '../../../../Image';
import { DEFAULT_IMAGES } from '../../../../../constants/images';
import type { IconNames } from '../../../../../types';

/**
 * Type definition for notification badge colors
 */
export type BadgeColor = 'primary' | 'gray' | 'red' | 'green' | 'purple';

/**
 * Props for notification item component
 */
export type NotificationItemProps = {
  avatarSrc: string;
  avatarAlt: string;
  content: React.ReactNode;
  timestamp: string;
  badgeIcon: IconNames;
  badgeColor: BadgeColor;
  isLastItem?: boolean;
  href?: string;
  onClick?: () => void;
};

/**
 * Maps badge color names to Tailwind CSS classes
 */
const badgeColorClasses: Record<BadgeColor, string> = {
  primary: 'bg-primary-700', // Using our new green primary color
  gray: 'bg-gray-900',
  red: 'bg-red-600',
  green: 'bg-green-400',
  purple: 'bg-purple-500',
};

/**
 * Reusable notification item component
 *
 * Used to display individual notifications in the notifications dropdown
 */
const NotificationItem = memo(
  ({
    avatarSrc,
    avatarAlt,
    content,
    timestamp,
    badgeIcon,
    badgeColor,
    isLastItem = false,
    href = '#',
    onClick,
  }: NotificationItemProps) => (
    <a
      href={href}
      onClick={onClick}
      className={`flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 ${
        !isLastItem ? 'border-b dark:border-gray-600' : ''
      }`}>
      <div className="flex-shrink-0">
        <Image
          className="w-11 h-11 rounded-full"
          src={avatarSrc}
          alt={avatarAlt}
          fallbackSrc={DEFAULT_IMAGES.USER_AVATAR}
          objectFit="cover"
        />
        <div
          className={`flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white dark:border-gray-700 ${badgeColorClasses[badgeColor]}`}>
          <IconWrapper name={badgeIcon} className="w-3 h-3 text-white" />
        </div>
      </div>
      <div className="pl-3 w-full">
        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
          {content}
        </div>
        <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
          {timestamp}
        </div>
      </div>
    </a>
  ),
);

export default NotificationItem;
