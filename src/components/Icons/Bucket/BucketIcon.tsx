import { IconProps } from '../../../types';

/**
 * Products icon for app dropdown
 */
const BucketIcon: React.FC<IconProps> = (props) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
    <path
      fillRule="evenodd"
      d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
      clipRule="evenodd"></path>
  </svg>
);

export default BucketIcon;
