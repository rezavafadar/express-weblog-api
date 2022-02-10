import bcrypt from 'bcrypt'

export const hashData = (data:string) => bcrypt.hash(data,10)

export const compareHash = (data:string,encryptedData:string) => bcrypt.compare(data,encryptedData)