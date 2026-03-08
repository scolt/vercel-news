export function toggleCurrentQueryParam(key: string, value: string, currentParams?: URLSearchParams): string {
  const params = new URLSearchParams(currentParams ? currentParams.toString() : '');
  const prevValue = params.get(key);

  if (prevValue && prevValue === value) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
  return params.toString()
}

export function updateCurrentQueryParam(key: string, value: string, currentParams?: URLSearchParams): string {
  const params = new URLSearchParams(currentParams ? currentParams.toString() : '');
  if (value === '') {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  return params.toString();
}
