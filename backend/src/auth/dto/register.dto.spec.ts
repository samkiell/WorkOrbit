import { validate } from 'class-validator';
import { UserRole } from '../../generated/prisma/client';
import { RegisterDto } from './register.dto';

describe('RegisterDto', () => {
  const validInput = {
    email: 'alice@example.com',
    password: 'correct-horse-battery',
    name: 'Alice Smith',
  };

  it('allows public client and freelancer roles', async () => {
    for (const role of [UserRole.CLIENT, UserRole.FREELANCER]) {
      const dto = Object.assign(new RegisterDto(), validInput, { role });
      const errors = await validate(dto);
      expect(errors.some((error) => error.property === 'role')).toBe(false);
    }
  });

  it('rejects ADMIN as a public registration role', async () => {
    const dto = Object.assign(new RegisterDto(), validInput, {
      role: UserRole.ADMIN,
    });
    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'role')).toBe(true);
  });

  it('rejects passwords longer than 128 characters', async () => {
    const dto = Object.assign(new RegisterDto(), {
      ...validInput,
      password: 'a'.repeat(129),
    });
    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'password')).toBe(true);
  });
});
