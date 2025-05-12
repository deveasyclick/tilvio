type EnvVar<T> = {
  value: T;
  required?: boolean;
};

type ENV_VARS = {
  clerkPublishableKey: EnvVar<string>;
};

const configs: ENV_VARS = {
  clerkPublishableKey: {
    value: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    required: true,
  },
};

Object.values(configs).forEach((envObj) => {
  if (envObj.required && !envObj.value) {
    throw new Error(`Missing required environment variable: ${envObj.value}`);
  }
});

export default configs;
