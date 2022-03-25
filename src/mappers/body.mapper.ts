import { UserProfile } from './../schema/user.schema';
export const bodyMapper = <T extends Record<string, any>>(
  object: T,
  keys: string[],
): Pick<T, keyof T> =>
  Object.entries(object).reduce(
    (acc, [key, value]) =>
      keys.includes(key) ? { ...acc, [key]: value } : acc,
    {} as Pick<T, keyof T>,
  );

export const userProfileFiltering = (object: Record<string, any>) => {
  const filtringkeys: Array<keyof UserProfile> = [
    'age',
    'avatar',
    'bio',
    'fullname',
    'gender',
    'instagram_account',
    'role',
    'twitter_account',
    'username',
  ];

  return bodyMapper(object, filtringkeys);
};
