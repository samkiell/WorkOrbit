import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../generated/prisma/client';

const PUBLIC_REGISTRATION_ROLES: UserRole[] = [UserRole.CLIENT, UserRole.FREELANCER];

export class RegisterDto {
  @ApiProperty({
    example: 'alice@example.com',
    description: 'Email address for the new account. Must be unique.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'correct-horse-battery',
    description: 'Password — minimum 6 characters.',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(128)
  password: string;

  @ApiProperty({
    example: 'Alice Smith',
    description: 'Display name shown on the platform.',
  })
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiPropertyOptional({
    enum: PUBLIC_REGISTRATION_ROLES,
    example: UserRole.CLIENT,
    description: 'Public account role. ADMIN accounts must be provisioned separately.',
  })
  @IsOptional()
  @IsIn(PUBLIC_REGISTRATION_ROLES)
  role?: UserRole.CLIENT | UserRole.FREELANCER;
}
