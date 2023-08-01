export const extractMessage = (err: any) =>
  err?.error?.message ||
  err?.error?.[Object.keys(err?.error)[0]] ||
  'Wystąpił nieoczekiwany błąd';
