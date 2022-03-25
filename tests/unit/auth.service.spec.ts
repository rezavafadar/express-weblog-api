import AuthService from '../../src/components/auth/auth.service';
import AuthRepo from '../../src/components/auth/auth.repo';
import { Jobs } from '../../src/jobs';
import { ExceptionError } from '../../src/exception/exceptionError';
import { User } from '../../src/schema/user.schema';
import queuesNames from '../../src/jobs/queues/constant';

jest.mock('@prisma/client');
jest.mock('../../../src/components/auth/auth.repo');
jest.mock('../../../src/jobs');
const mockJobs = jest.mocked(new Jobs(), true);
const mockAuthRepo = jest.mocked(new AuthRepo(), true);

const authService = new AuthService(mockAuthRepo, mockJobs);

describe('-Auth Service', () => {
  const fakeUser: User = {
    email: 'mrvafadar4@gmail.com',
    active: false,
    id: 102,
  };
  const fakeVerifyUserBody = { email: fakeUser.email, code: '11201' };

  mockAuthRepo.getUserByEmail.mockReturnValue(Promise.resolve(fakeUser));
  mockAuthRepo.createUser.mockReturnValue(Promise.resolve(fakeUser));
  mockAuthRepo.getCodeByEmail.mockReturnValue(Promise.resolve('14568'));

  describe('-- Check Users Exists Method', () => {
    it("Given invalid values,That should throw a 'validation error'", () => {
      const rejectResponse = new ExceptionError(
        'Validation Error',
        400,
        'Type is required!',
      );

      return expect(
        authService.userExistence(undefined, undefined),
      ).rejects.toThrow(rejectResponse);
    });

    describe('-- First mode: login type', () => {
      const rejectResponse = new ExceptionError(
        'User exists',
        422,
        'User is Not Exists!',
      );

      it("Given unregistered user, That should throw an error 'like: User is Not Exists!'", () => {
        mockAuthRepo.getUserByEmail.mockReturnValueOnce(null);

        return expect(
          authService.userExistence('login', fakeUser.email),
        ).rejects.toThrow(rejectResponse);
      });

      it("Given unactive user, That should throw an error 'like: User is Not Exists!'", () => {
        return expect(
          authService.userExistence('login', fakeUser.email),
        ).rejects.toThrow(rejectResponse);
      });

      it("Given correct values, That should return 'true'", async () => {
        mockAuthRepo.getUserByEmail.mockReturnValueOnce(
          Promise.resolve({ ...fakeUser, active: true }),
        );
        const response = await authService.userExistence(
          'login',
          fakeUser.email,
        );

        expect(response).toBe(true);
      });
    });

    describe('-- Secound mode: register type', () => {
      const rejectResponse = new ExceptionError(
        'User exists',
        422,
        'User is Exists!',
      );

      it("Given registered user, That should throw a error 'like: User is Exists!'", () => {
        mockAuthRepo.getUserByEmail.mockReturnValueOnce(
          Promise.resolve({ ...fakeUser, active: true }),
        );

        return expect(
          authService.userExistence('register', fakeUser.email),
        ).rejects.toThrow(rejectResponse);
      });

      it("Given unactive user, That should return 'true'", () => {
        return expect(
          authService.userExistence('register', fakeUser.email),
        ).resolves.toBe(true);
      });

      it("Given unregistered user, That should return 'true'", () => {
        mockAuthRepo.getUserByEmail.mockReturnValueOnce(null);
        return expect(
          authService.userExistence('register', fakeUser.email),
        ).resolves.toBe(true);
      });
    });
  });

  describe('-- Verify Method', () => {
    it("Given invalid value,That should throw a 'validation error' ", () => {
      const rejectresponse = new ExceptionError(
        'Validation Error',
        400,
        'Email is required !',
      );

      return expect(authService.verify(undefined)).rejects.toThrow(
        rejectresponse,
      );
    });

    it('Given unregistered user email,That should return new user', async () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(null);
      const fakeCreateUser = {
        email: 'mrvafadar4@gmail.com',
        profile: { create: { username: 'mrvaf_U' } },
      };
      mockAuthRepo.getUserByEmail.mockReturnValueOnce(null);

      const response = await authService.verify(fakeUser.email);

      expect(mockAuthRepo.createUser.mock.calls[0][0]).toEqual(fakeCreateUser);
      expect(response).toEqual(fakeUser);
    });

    it('Given registered user email, That should return user And not call create new user method', async () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(null);

      const response = await authService.verify(fakeUser.email);

      expect(mockAuthRepo.createUser.mock.calls.length).toBe(0);
      expect(response).toEqual(fakeUser);
    });

    it("Given registered user who has an unexpired verification code, That should throw a 'Code Exists!' error ", () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(Promise.resolve('12345'));

      const rejectResponse = new ExceptionError(
        'Code Exists!',
        401,
        'Your code is not expire! Please try again later.',
      );

      return expect(authService.verify(fakeUser.email)).rejects.toThrow(
        rejectResponse,
      );
    });

    it("Given a registered user who hasn't verification code, That should create a new verification code", async () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(null);

      await authService.verify(fakeUser.email);

      expect(mockAuthRepo.setCodeByEmail.mock.calls.length).toBe(1);
    });

    it('Given a correct values, That should add email job to queue', async () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(null);

      await authService.verify(fakeUser.email);

      const createdCode = mockAuthRepo.setCodeByEmail.mock.calls[0][1];

      expect(mockJobs.addJob.mock.calls.length).toBe(1);
      expect(mockJobs.addJob.mock.calls[0]).toEqual([
        queuesNames.userVerifyEmail,
        { email: fakeUser.email, code: createdCode },
      ]);
    });
  });

  describe('-- VerifyCode Method', () => {
    it("Given invalid value, That should throw a 'validation error' ", () => {
      const rejectResponse = new ExceptionError(
        'Validation Error',
        400,
        'Verify Code is required!',
      );

      return expect(
        authService.verifyCode(undefined, undefined),
      ).rejects.toThrow(rejectResponse);
    });

    it("Given a unregistered user, That should throw a error 'like: User is not Exists!'", () => {
      mockAuthRepo.getUserByEmail.mockReturnValueOnce(null);

      const rejectResponse = new ExceptionError(
        'Authentication!',
        401,
        'User is not Exists!',
      );
      expect(
        authService.verifyCode(
          fakeVerifyUserBody.email,
          fakeVerifyUserBody.code,
        ),
      ).rejects.toThrow(rejectResponse);
    });

    it("Given a registered user who hasn't verification code, That should throw a error 'like: Code is not define or expired!'", () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(null);

      const rejectResponse = new ExceptionError(
        'Unauthorized!',
        401,
        'Code is not define or expired!',
      );

      return expect(
        authService.verifyCode(
          fakeVerifyUserBody.email,
          fakeVerifyUserBody.code,
        ),
      ).rejects.toThrow(rejectResponse);
    });

    it("Given a incorrect verification code,That Should throw a error 'like: Verify code is incorrect!'", () => {
      const rejectResponse = new ExceptionError(
        'Unauthorized!',
        401,
        'Verify code is incorrect!',
      );

      return expect(
        authService.verifyCode(
          fakeVerifyUserBody.email,
          fakeVerifyUserBody.code,
        ),
      ).rejects.toThrow(rejectResponse);
    });

    it('Given correct values,That Should delete verification code', async () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(
        Promise.resolve(fakeVerifyUserBody.code),
      );

      await authService.verifyCode(
        fakeVerifyUserBody.email,
        fakeVerifyUserBody.code,
      );

      expect(mockAuthRepo.deleteCodeByEmail.mock.calls.length).toBe(1);
      expect(mockAuthRepo.deleteCodeByEmail.mock.calls[0][0]).toBe(
        fakeVerifyUserBody.email,
      );
    });

    it('Given correct values,That Should active user account', async () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(
        Promise.resolve(fakeVerifyUserBody.code),
      );

      await authService.verifyCode(
        fakeVerifyUserBody.email,
        fakeVerifyUserBody.code,
      );

      expect(mockAuthRepo.activateUser.mock.calls.length).toBe(1);
      expect(mockAuthRepo.activateUser.mock.calls[0][0]).toBe(fakeUser.id);
    });

    it('Given correct values,That Should add welcome email job to queue', async () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(
        Promise.resolve(fakeVerifyUserBody.code),
      );

      await authService.verifyCode(
        fakeVerifyUserBody.email,
        fakeVerifyUserBody.code,
      );

      expect(mockJobs.addJob.mock.calls.length).toBe(1);
      expect(mockJobs.addJob.mock.calls[0]).toEqual([
        queuesNames.userWlcEmail,
        { email: fakeVerifyUserBody.email },
      ]);
    });

    it('Given correct values, That should return user', async () => {
      mockAuthRepo.getCodeByEmail.mockReturnValueOnce(
        Promise.resolve(fakeVerifyUserBody.code),
      );

      const response = await authService.verifyCode(
        fakeVerifyUserBody.email,
        fakeVerifyUserBody.code,
      );

      expect(response).toEqual(fakeUser);
    });
  });
});
