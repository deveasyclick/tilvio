import { useTheme } from '../../contexts/ThemeContext';
import IconWrapper from '../IconWrapper/IconWrapper';

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log('Theme toggle clicked, current isDarkMode:', isDarkMode);
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
      {/* Show sun icon in dark mode, moon icon in light mode */}
      {isDarkMode ? (
        <IconWrapper name="sun" className="w-5 h-5" aria-hidden="true" />
      ) : (
        <IconWrapper name="moon" className="w-5 h-5" aria-hidden="true" />
      )}
      <span className="sr-only">
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
