type Environment = Record<string, unknown>;

function readString(config: Environment, key: string): string {
  const value = config[key];
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Validate deployment-critical configuration before the API starts.
 * Development and test environments retain their existing defaults; production
 * must never silently start with testnet endpoints or placeholder secrets.
 */
export function validateEnv(config: Environment): Environment {
  if (config.NODE_ENV !== 'production') {
    return config;
  }

  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'REFRESH_TOKEN_PEPPER',
    'FRONTEND_URL',
    'STELLAR_NETWORK',
    'STELLAR_ADMIN_SECRET',
    'ESCROW_CONTRACT_ID',
    'STELLAR_TOKEN_CONTRACT_ID',
  ];
  const missing = required.filter((key) => !readString(config, key));
  if (missing.length > 0) {
    throw new Error(
      `Missing required production environment variables: ${missing.join(', ')}`,
    );
  }

  if (!/^postgres(?:ql)?:\/\//i.test(readString(config, 'DATABASE_URL'))) {
    throw new Error('DATABASE_URL must be a PostgreSQL connection string.');
  }

  if (readString(config, 'JWT_SECRET').length < 32) {
    throw new Error('JWT_SECRET must contain at least 32 characters in production.');
  }

  if (readString(config, 'REFRESH_TOKEN_PEPPER').length < 32) {
    throw new Error(
      'REFRESH_TOKEN_PEPPER must contain at least 32 characters in production.',
    );
  }

  const network = readString(config, 'STELLAR_NETWORK');
  if (network !== 'mainnet' && network !== 'testnet') {
    throw new Error('STELLAR_NETWORK must be explicitly set to mainnet or testnet.');
  }

  const contractPattern = /^C[A-Z2-7]{55}$/;
  for (const key of ['ESCROW_CONTRACT_ID', 'STELLAR_TOKEN_CONTRACT_ID']) {
    if (!contractPattern.test(readString(config, key))) {
      throw new Error(`${key} must be a valid Stellar contract address.`);
    }
  }

  const frontendUrl = readString(config, 'FRONTEND_URL');
  try {
    const parsed = new URL(frontendUrl);
    if (
      (network === 'mainnet' && parsed.protocol !== 'https:') ||
      (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost')
    ) {
      throw new Error('FRONTEND_URL must use HTTPS for production deployments.');
    }
  } catch {
    throw new Error('FRONTEND_URL must be a valid absolute URL.');
  }

  return config;
}
