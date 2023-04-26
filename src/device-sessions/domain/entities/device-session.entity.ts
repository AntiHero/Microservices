import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { DEVICE_SESSION_ENTITY } from 'src/@core/constants';
import { BaseEntity } from 'src/@core/entities/base.entity';
import { User } from 'src/users/domain/entities/user.entity';
import { DeviceSessionPayload } from 'src/device-sessions/types';

@Entity(DEVICE_SESSION_ENTITY)
export class DeviceSession extends BaseEntity {
  @Column()
  userAgent: string;

  @Column({ type: 'jsonb' })
  payload: DeviceSessionPayload;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  lastActiveDate: Date;

  @ManyToOne(() => User, (user) => user.deviceSessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;
}
