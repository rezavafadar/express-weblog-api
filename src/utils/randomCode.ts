export function randomCodeGenerator(num: number) {
  const litters = '1326458790';
  let code: string = '';

  for (let i = 0; i <= num; i++) {
    const random = Math.floor(Math.random() * 10);
    code += litters[random];
  }

  return code;
}
