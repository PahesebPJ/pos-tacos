import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from '@nestjs/class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
