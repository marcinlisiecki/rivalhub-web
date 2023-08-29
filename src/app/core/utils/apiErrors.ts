export const extractMessage = (err: any) =>
  err?.error?.message || 'api.error.DEFAULT_ERROR';
