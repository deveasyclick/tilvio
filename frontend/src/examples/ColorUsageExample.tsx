import {
  GREEN,
  BLUE,
  PURPLE,
  AMBER,
  SEMANTIC,
  THEME,
  getPrimaryColor,
  getSecondaryColor,
  getTertiaryColor,
  getAccentColor,
} from '../constants/colors';

/**
 * Example component demonstrating how to use the color system
 *
 * This component shows different ways to use the color constants and utility functions.
 */
export default function ColorUsageExample() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Color System Usage Examples</h2>

      {/* Using Tailwind classes with our custom colors */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Using Tailwind Classes</h3>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-primary text-white rounded-md">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-secondary text-white rounded-md">
            Secondary Button
          </button>
          <button className="px-4 py-2 bg-tertiary text-white rounded-md">
            Tertiary Button
          </button>
          <button className="px-4 py-2 bg-accent text-white rounded-md">
            Accent Button
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
            Darker Primary
          </button>
          <button className="px-4 py-2 bg-primary-300 text-primary-900 rounded-md">
            Lighter Primary
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
            Gray Button
          </button>
        </div>
      </section>

      {/* Using inline styles with our color constants */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Using Color Constants</h3>
        <div className="flex flex-wrap gap-2">
          <button
            style={{ backgroundColor: GREEN[500], color: 'white' }}
            className="px-4 py-2 rounded-md">
            Primary (GREEN.500)
          </button>
          <button
            style={{ backgroundColor: BLUE[500], color: 'white' }}
            className="px-4 py-2 rounded-md">
            Secondary (BLUE.500)
          </button>
          <button
            style={{ backgroundColor: PURPLE[500], color: 'white' }}
            className="px-4 py-2 rounded-md">
            Tertiary (PURPLE.500)
          </button>
          <button
            style={{ backgroundColor: AMBER[500], color: 'white' }}
            className="px-4 py-2 rounded-md">
            Accent (AMBER.500)
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            style={{ backgroundColor: SEMANTIC.success, color: 'white' }}
            className="px-4 py-2 rounded-md">
            Success
          </button>
          <button
            style={{ backgroundColor: SEMANTIC.info, color: 'white' }}
            className="px-4 py-2 rounded-md">
            Info
          </button>
          <button
            style={{ backgroundColor: SEMANTIC.warning, color: 'white' }}
            className="px-4 py-2 rounded-md">
            Warning
          </button>
          <button
            style={{ backgroundColor: SEMANTIC.error, color: 'white' }}
            className="px-4 py-2 rounded-md">
            Error
          </button>
        </div>
      </section>

      {/* Using utility functions */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Using Utility Functions</h3>
        <div className="flex flex-wrap gap-2">
          <button
            style={{ backgroundColor: getPrimaryColor(), color: 'white' }}
            className="px-4 py-2 rounded-md">
            getPrimaryColor()
          </button>
          <button
            style={{ backgroundColor: getSecondaryColor(), color: 'white' }}
            className="px-4 py-2 rounded-md">
            getSecondaryColor()
          </button>
          <button
            style={{ backgroundColor: getTertiaryColor(), color: 'white' }}
            className="px-4 py-2 rounded-md">
            getTertiaryColor()
          </button>
          <button
            style={{ backgroundColor: getAccentColor(), color: 'white' }}
            className="px-4 py-2 rounded-md">
            getAccentColor()
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            style={{ backgroundColor: getPrimaryColor(700), color: 'white' }}
            className="px-4 py-2 rounded-md">
            getPrimaryColor(700)
          </button>
          <button
            style={{ backgroundColor: getPrimaryColor(300), color: GREEN[900] }}
            className="px-4 py-2 rounded-md">
            getPrimaryColor(300)
          </button>
        </div>
      </section>

      {/* Color palette showcase */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Primary Color Palette (Green)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(GREEN).map(([shade, color]) => (
            <div key={shade} className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-md mb-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{shade}</span>
              <span className="text-xs text-gray-500">{color}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary Color Palette */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">
          Secondary Color Palette (Blue)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(BLUE).map(([shade, color]) => (
            <div key={shade} className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-md mb-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{shade}</span>
              <span className="text-xs text-gray-500">{color}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tertiary Color Palette */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">
          Tertiary Color Palette (Purple)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(PURPLE).map(([shade, color]) => (
            <div key={shade} className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-md mb-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{shade}</span>
              <span className="text-xs text-gray-500">{color}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Accent Color Palette */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Accent Color Palette (Amber)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(AMBER).map(([shade, color]) => (
            <div key={shade} className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-md mb-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{shade}</span>
              <span className="text-xs text-gray-500">{color}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Theme Colors */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Theme Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-md">
            <h4 className="font-medium mb-2">Light Theme</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(THEME.light).map(([name, color]) => (
                <div key={name} className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-md mr-2"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <span className="text-sm block">{name}</span>
                    <span className="text-xs text-gray-500">{color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border rounded-md dark:bg-gray-800">
            <h4 className="font-medium mb-2 dark:text-white">Dark Theme</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(THEME.dark).map(([name, color]) => (
                <div key={name} className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-md mr-2"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <span className="text-sm block dark:text-white">
                      {name}
                    </span>
                    <span className="text-xs text-gray-500">{color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
