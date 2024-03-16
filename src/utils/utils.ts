const numPad = (n: number) => n.toString().padStart(2, '0');

export const stringify = { name: (val: string) => `tns:${val}` } as const;

export const toDateFormat = (d: Date): string => {
  const date = [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map(numPad)
    .join('.');

  const time = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map(numPad)
    .join(':');

  return `${date}T${time}`;
};
