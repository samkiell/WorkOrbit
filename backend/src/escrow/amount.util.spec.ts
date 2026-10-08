import { toStroops } from './amount.util';

describe('toStroops', () => {
  it('converts integer token amounts', () => {
    expect(toStroops(400)).toBe(4_000_000_000n);
  });

  it('preserves decimal precision up to seven places', () => {
    expect(toStroops(0.1)).toBe(1_000_000n);
    expect(toStroops(1.2345678)).toBe(12_345_678n);
    expect(toStroops(0.0000001)).toBe(1n);
  });

  it('rejects invalid or out-of-range amounts', () => {
    expect(() => toStroops(0)).toThrow(RangeError);
    expect(() => toStroops(-1)).toThrow(RangeError);
    expect(() => toStroops(Number.NaN)).toThrow(RangeError);
    expect(() => toStroops(100_000_000_000)).toThrow(RangeError);
  });
});
