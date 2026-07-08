export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).map(x => String(x).trim()).join(" ");
}
