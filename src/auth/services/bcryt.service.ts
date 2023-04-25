import bcrypt from 'bcrypt';

import { HashingService } from './hashing.service';

export class BcryptService extends HashingService {
  private saltRounds = 10;

  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
