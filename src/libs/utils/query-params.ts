export function updateCurrentQueryParam(key: string, value: string, currentParams?: URLSearchParams): string {
  const params = new URLSearchParams(currentParams ? currentParams.toString() : '');
  if (value === '') {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  return params.toString();
}
