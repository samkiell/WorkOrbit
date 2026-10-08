/**
 * Convert an XLM/token amount expressed as a decimal number to stroops.
 *
 * Never multiply a floating-point amount by 10^7 directly: binary floating
 * point can introduce rounding errors into on-chain transfer amounts.
 */
export function toStroops(amount: number): bigint {
  if (!Number.isFinite(amount) || amount <= 0 || amount >= 100_000_000_000) {
    throw new RangeError('Amount must be positive and fit the supported decimal range.');
  }

  const [whole, fraction = ''] = amount.toFixed(7).split('.');
  return BigInt(whole) * 10_000_000n + BigInt(fraction.padEnd(7, '0'));
}
