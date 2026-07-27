export function optimizeSanityImage(url: string, width: number) {
  if (!url.includes('cdn.sanity.io/images/')) return url

  const separator = url.includes('?') ? '&' : '?'

  return `${url}${separator}auto=format&fit=max&w=${width}`
}
