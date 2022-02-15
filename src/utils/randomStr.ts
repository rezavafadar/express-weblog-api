const litters = '1326458790';

export function randomStringGenerator(num: number) {
  let text: string = '';

  for (let i = 0; i <= num; i++) {
    const random = Math.floor(Math.random() * 10);
    text += litters[random];
  }

  return text;
}
