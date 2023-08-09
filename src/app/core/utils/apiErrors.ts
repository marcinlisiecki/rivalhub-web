export const extractMessage = (err: any) =>
  err?.error?.message || 'Wystąpił nieoczekiwany błąd';
