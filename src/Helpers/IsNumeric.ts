export default function isNumeric(value: string): boolean {
  return /^-?\d+$/.test(value);
}
