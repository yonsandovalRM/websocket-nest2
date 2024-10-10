import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsGateway } from './notifications.gateway';
import { Socket, Server } from 'socket.io';

describe('NotificationsGateway', () => {
  let gateway: NotificationsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsGateway],
    }).compile();

    gateway = module.get<NotificationsGateway>(NotificationsGateway);
    gateway.server = {
      emit: jest.fn(),
    } as any;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleConnection', () => {
    it('should log when a client connects', () => {
      const mockClient = { id: 'test-client-id' } as Socket;
      console.log = jest.fn();

      gateway.handleConnection(mockClient);

      expect(console.log).toHaveBeenCalledWith('Client connected: test-client-id');
    });
  });

  describe('handleDisconnect', () => {
    it('should log when a client disconnects', () => {
      const mockClient = { id: 'test-client-id' } as Socket;
      console.log = jest.fn();

      gateway.handleDisconnect(mockClient);

      expect(console.log).toHaveBeenCalledWith('Client disconnected: test-client-id');
    });
  });

  describe('handleNotification', () => {
    it('should emit the notification to all clients', () => {
      const mockClient = {} as Socket;
      const mockPayload = 'Test notification';

      gateway.handleNotification(mockClient, mockPayload);

      expect(gateway.server.emit).toHaveBeenCalledWith('notification', mockPayload);
    });
  });
});