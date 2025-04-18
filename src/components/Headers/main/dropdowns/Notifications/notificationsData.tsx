import React from 'react';
import type { BadgeColor } from './NotificationItem';
import type { IconNames } from '../../../../../types';

/**
 * Type definition for notification data
 */
export type NotificationData = {
  id: string;
  avatarSrc: string;
  avatarAlt: string;
  content: React.ReactNode;
  timestamp: string;
  badgeIcon: IconNames;
  badgeColor: BadgeColor;
  href: string;
};

/**
 * Sample notification data for the notifications dropdown
 */
export const notificationItems: NotificationData[] = [
  {
    id: 'notification-1',
    avatarSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png',
    avatarAlt: 'Bonnie Green avatar',
    content: (
      <>
        New message from
        <span className="font-semibold text-gray-900 dark:text-white"> Bonnie Green</span>
        : "Hey, what's up? All set for the presentation?"
      </>
    ),
    timestamp: 'a few moments ago',
    badgeIcon: 'messageDownload',
    badgeColor: 'primary',
    href: '#',
  },
  {
    id: 'notification-2',
    avatarSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
    avatarAlt: 'Jese Leos avatar',
    content: (
      <>
        <span className="font-semibold text-gray-900 dark:text-white">Jese leos</span> and
        <span className="font-medium text-gray-900 dark:text-white"> 5 others</span> started
        following you.
      </>
    ),
    timestamp: '10 minutes ago',
    badgeIcon: 'userAdd',
    badgeColor: 'gray',
    href: '#',
  },
  {
    id: 'notification-3',
    avatarSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png',
    avatarAlt: 'Joseph McFall avatar',
    content: (
      <>
        <span className="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and
        <span className="font-medium text-gray-900 dark:text-white"> 141 others</span> love
        your story. See it and view more stories.
      </>
    ),
    timestamp: '44 minutes ago',
    badgeIcon: 'heart',
    badgeColor: 'red',
    href: '#',
  },
  {
    id: 'notification-4',
    avatarSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png',
    avatarAlt: 'Roberta Casas image',
    content: (
      <>
        <span className="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span> mentioned
        you in a comment:
        <span className="font-medium text-primary-600 dark:text-primary-500"> @bonnie.green</span> what
        do you say?
      </>
    ),
    timestamp: '1 hour ago',
    badgeIcon: 'chatBubble',
    badgeColor: 'green',
    href: '#',
  },
  {
    id: 'notification-5',
    avatarSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png',
    avatarAlt: 'Robert image',
    content: (
      <>
        <span className="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted
        a new video: Glassmorphism - learn how to implement the new design trend.
      </>
    ),
    timestamp: '3 hours ago',
    badgeIcon: 'video',
    badgeColor: 'purple',
    href: '#',
  },
];
