export const bodyMapper = <T extends Record<string, any>>(
  object: T,
  keys: string[],
): Pick<T, keyof T> =>
  Object.entries(object).reduce(
    (acc, [key, value]) =>
      keys.includes(key) ? { ...acc, [key]: value } : acc,
    {} as Pick<T, keyof T>,
  );

export const storeUserFiltering = (object: Record<string, any>) => {
  return bodyMapper(object, [
    'username',
    'fullname',
    'role',
    'bio',
    'age',
    'gender',
    'instagram_account',
    'twitter_account',
  ]);
};
