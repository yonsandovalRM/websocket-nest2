"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
describe('AuthService', () => {
    let service;
    let jwtService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
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
        service = module.get(auth_service_1.AuthService);
        jwtService = module.get(jwt_1.JwtService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('validateUser', () => {
        it('should return user object when credentials are valid', async () => {
            const result = await service.validateUser('user', 'password');
            expect(result).toEqual({ userId: 1, username: 'user' });
        });
        it('should return null when credentials are invalid', async () => {
            const result = await service.validateUser('wrong', 'credentials');
            expect(result).toBeNull();
        });
    });
    describe('login', () => {
        it('should return JWT token', async () => {
            const result = await service.login({ username: 'test', userId: 1 });
            expect(result.access_token).toBe('test_token');
            expect(jwtService.sign).toHaveBeenCalledWith({ username: 'test', sub: 1 });
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map