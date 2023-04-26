import { Column, Entity, OneToMany } from 'typeorm';

import { USER_ENTITY } from 'src/@core/constants';
import { BaseEntity } from 'src/@core/entities/base.entity';
import { DeviceSession } from 'src/device-sessions/domain/entities/device-session.entity';

@Entity(USER_ENTITY)
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => DeviceSession, (session) => session.user)
  deviceSessions: DeviceSession[];
}
