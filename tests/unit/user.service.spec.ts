import { ExceptionError } from '../../src/exception/exceptionError';
import { User, UserProfile } from '../../src/schema/user.schema';
import UserService from '../../src/components/user/user.service';
import UserRepo from '../../src/components/user/user.repo';

jest.mock('@prisma/client');
jest.mock('../../../src/components/user/user.repo');
const mockUserRepo = jest.mocked(new UserRepo());
const userService = new UserService(mockUserRepo);

const fakeUser: User = {
  email: 'mrvafadar4@gmail.com',
  active: true,
  id: 101,
  profile: {
    id: 101,
    username: 'rezave_reza',
    fullname: 'rezavr01',
    role: 'user',
    avatar: 'default.jpeg',
    gender: 'man',
    user_id: 101,
  },
};

const fakeUserId = 120;

describe('-- User Service', () => {
  mockUserRepo.getUserById.mockResolvedValue(Promise.resolve(fakeUser));

  describe('-- StoreUser Method', () => {
    describe(' - Validation failed', () => {
      it('Given empty data object, That should throw errr', () => {
        return expect(userService.storeUser({}, 123)).rejects.toThrow();
      });

      it('Not given user id, That should throw error', () => {
        return expect(
          userService.storeUser({ fullname: 'reza' }, null),
        ).rejects.toThrow();
      });

      it('Given unregistered user, That should throw error', () => {
        const rejectResponse = new ExceptionError(
          'Authentication',
          401,
          'User is not defined',
        );

        mockUserRepo.getUserById.mockReturnValueOnce(null);
        return expect(
          userService.storeUser(
            { fullname: fakeUser.profile.fullname },
            fakeUserId,
          ),
        ).rejects.toThrow(rejectResponse);
      });

      it('Given sensitive values, That should throw a error', () => {
        const rejectResponse = new ExceptionError(
          'Sensitive Values!',
          400,
          'You have sensitive data in your data body',
        );

        return expect(
          userService.storeUser({ role: 'admin' }, fakeUser.id),
        ).rejects.toThrow(rejectResponse);
      });

      it('Given exists username, That should throw a error', () => {
        const rejectResponse = new ExceptionError(
          'BadRequest',
          401,
          'Username is exists!',
        );
        mockUserRepo.getUserByUsername.mockReturnValueOnce(
          Promise.resolve(fakeUser.profile),
        );

        return expect(
          userService.storeUser({ username: fakeUser.profile.username }, 101),
        ).rejects.toThrow(rejectResponse);
      });
    });

    describe(' - Validation passed', () => {
      it("Given correct new user's fullname, That should new information of given user", async () => {
        const expectedResponse: UserProfile = {
          ...fakeUser.profile,
          fullname: 'mmdrezavr',
        };

        mockUserRepo.updateUserById.mockReturnValueOnce(
          Promise.resolve(expectedResponse),
        );

        const response = await userService.storeUser(
          { fullname: expectedResponse.fullname },
          fakeUser.id,
        );

        expect(mockUserRepo.updateUserById.mock.calls[0][0]).toEqual({
          fullname: expectedResponse.fullname,
        });

        expect(response).toEqual(expectedResponse);
      });
    });
  });
});
