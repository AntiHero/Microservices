import { Column, Entity } from 'typeorm';

import { USER_ENTITY } from 'src/@core/constants';
import { BaseEntity } from 'src/@core/entities/base.entity';

@Entity(USER_ENTITY)
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;
}
