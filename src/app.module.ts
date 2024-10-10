import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [NotificationsGateway],
})
export class AppModule {}