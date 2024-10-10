import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
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