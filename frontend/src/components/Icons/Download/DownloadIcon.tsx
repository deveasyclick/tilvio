import { IconProps } from '../../../types';

/**
 * Download icon
 */
const DownloadIcon: React.FC<IconProps> = (props) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fillRule="evenodd"
      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      clipRule="evenodd"></path>
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v8a1 1 0 11-2 0V4a1 1 0 011-1z"
      clipRule="evenodd"></path>
  </svg>
);

export default DownloadIcon;
