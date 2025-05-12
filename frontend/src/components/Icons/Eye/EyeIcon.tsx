import { IconProps } from '../../../types';

/**
 * Eye view icon
 */
const EyeIcon: React.FC<IconProps> = (props) => (
  <svg
    aria-hidden="true"
    className="w-4 h-4 text-gray-500 dark:text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"></path>
  </svg>
);

export default EyeIcon;
