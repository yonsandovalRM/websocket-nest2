"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const notifications_gateway_1 = require("./notifications.gateway");
describe('NotificationsGateway', () => {
    let gateway;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [notifications_gateway_1.NotificationsGateway],
        }).compile();
        gateway = module.get(notifications_gateway_1.NotificationsGateway);
        gateway.server = {
            emit: jest.fn(),
        };
    });
    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
    describe('handleConnection', () => {
        it('should log when a client connects', () => {
            const mockClient = { id: 'test-client-id' };
            console.log = jest.fn();
            gateway.handleConnection(mockClient);
            expect(console.log).toHaveBeenCalledWith('Client connected: test-client-id');
        });
    });
    describe('handleDisconnect', () => {
        it('should log when a client disconnects', () => {
            const mockClient = { id: 'test-client-id' };
            console.log = jest.fn();
            gateway.handleDisconnect(mockClient);
            expect(console.log).toHaveBeenCalledWith('Client disconnected: test-client-id');
        });
    });
    describe('handleNotification', () => {
        it('should emit the notification to all clients', () => {
            const mockClient = {};
            const mockPayload = 'Test notification';
            gateway.handleNotification(mockClient, mockPayload);
            expect(gateway.server.emit).toHaveBeenCalledWith('notification', mockPayload);
        });
    });
});
//# sourceMappingURL=notifications.gateway.spec.js.map