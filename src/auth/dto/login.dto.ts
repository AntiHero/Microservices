import { PickType } from '@nestjs/mapped-types';
import { RegistrationDto } from './registration.dto';

export class LoginDto extends PickType(RegistrationDto, [
  'email',
  'password',
]) {}
