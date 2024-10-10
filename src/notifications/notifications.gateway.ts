import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('notifications')
@ApiBearerAuth()
@WebSocketGateway()
@UseGuards(AuthGuard('jwt'))
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  @ApiOperation({ summary: 'Handle client connection' })
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @ApiOperation({ summary: 'Handle client disconnection' })
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @ApiOperation({ summary: 'Handle incoming notification' })
  @SubscribeMessage('notification')
  handleNotification(client: Socket, payload: string): void {
    this.server.emit('notification', payload);
  }
}