type EnvVar<T> = {
  value: T;
  required?: boolean;
};

enum Environments {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}
type ENV_VARS = {
  clerkPublishableKey: EnvVar<string>;
  environment: EnvVar<Environments>;
  apiBaseUrl: EnvVar<string>;
};

const configs: ENV_VARS = {
  clerkPublishableKey: {
    value: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    required: true,
  },
  environment: {
    value: import.meta.env.MODE as Environments,
  },
  apiBaseUrl: {
    value: import.meta.env.VITE_API_BASE_URL,
    required: true,
  },
};

Object.values(configs).forEach((envObj) => {
  if (envObj.required && !envObj.value) {
    throw new Error(`Missing required environment variable: ${envObj.value}`);
  }
});

export default configs;
