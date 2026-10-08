import { validateEnv } from './env.validation';

const validProductionEnv = {
  NODE_ENV: 'production',
  DATABASE_URL: 'postgresql://user:password@db.example.com:5432/workorbit',
  JWT_SECRET: 'a'.repeat(48),
  REFRESH_TOKEN_PEPPER: 'b'.repeat(48),
  FRONTEND_URL: 'https://workorbit.example',
  STELLAR_NETWORK: 'testnet',
  STELLAR_ADMIN_SECRET: 'S'.repeat(56),
  ESCROW_CONTRACT_ID: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
  STELLAR_TOKEN_CONTRACT_ID: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
};

describe('validateEnv', () => {
  it('keeps development defaults available', () => {
    const config = { NODE_ENV: 'development' };
    expect(validateEnv(config)).toBe(config);
  });

  it('rejects missing production configuration', () => {
    expect(() => validateEnv({ NODE_ENV: 'production' })).toThrow(
      /Missing required production environment variables/,
    );
  });

  it('accepts complete production configuration', () => {
    expect(validateEnv(validProductionEnv)).toEqual(validProductionEnv);
  });

  it('rejects short production signing secrets', () => {
    expect(() =>
      validateEnv({ ...validProductionEnv, JWT_SECRET: 'too-short' }),
    ).toThrow(/JWT_SECRET must contain at least 32 characters/);
  });

  it('rejects invalid contract addresses', () => {
    expect(() =>
      validateEnv({ ...validProductionEnv, ESCROW_CONTRACT_ID: 'not-a-contract' }),
    ).toThrow(/ESCROW_CONTRACT_ID must be a valid Stellar contract address/);
  });

  it('requires HTTPS for production frontend URLs', () => {
    expect(() =>
      validateEnv({ ...validProductionEnv, FRONTEND_URL: 'http://workorbit.example' }),
    ).toThrow(/FRONTEND_URL must be a valid absolute URL/);
  });
});
