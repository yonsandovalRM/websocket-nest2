"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
describe('AuthController', () => {
    let controller;
    let authService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [auth_controller_1.AuthController],
            providers: [
                auth_service_1.AuthService,
                {
                    provide: jwt_1.JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('test_token'),
                    },
                },
            ],
        }).compile();
        controller = module.get(auth_controller_1.AuthController);
        authService = module.get(auth_service_1.AuthService);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('login', () => {
        it('should return JWT token', async () => {
            const mockUser = { username: 'test', userId: 1 };
            const mockRequest = { user: mockUser };
            const mockResponse = { access_token: 'test_token' };
            jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);
            const result = await controller.login(mockRequest);
            expect(result).toEqual(mockResponse);
            expect(authService.login).toHaveBeenCalledWith(mockUser);
        });
    });
});
//# sourceMappingURL=auth.controller.spec.js.map