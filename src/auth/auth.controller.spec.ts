import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test_token'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
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