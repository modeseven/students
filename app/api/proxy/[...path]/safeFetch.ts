const TRUSTED_DOMAINS = [
  'localhost',
];
/**
 * A safe fetch function that validates the URL's domain is in the trusted list - directly replacing fetch
 * @param url - The URL to fetch
 * @param init - The request init options
 * @returns A promise that resolves to the response
 */
export function safeFetch(url: string | URL, init?: RequestInit): Promise<Response> {
  // Validate that the URL's domain is in the trusted list
  const urlObj = typeof url === 'string' ? new URL(url) : url;
  const hostname = urlObj.hostname;
  
  // Semgrep sanitizer pattern requires validation using includes/indexOf/find/has
  // and the fetch must be inside the if block to be recognized as sanitized
  const isValidDomain = TRUSTED_DOMAINS.some(domain => 
    hostname === domain || hostname.endsWith(`.${domain}`)
  ) || TRUSTED_DOMAINS.includes(hostname);
  
  if (isValidDomain) {
    // Return fetch promise directly (drop-in replacement for fetch)
    // Using original URL since domain is validated
    return fetch(url, {
      redirect: 'manual',
      ...init,
    });
  } else {
    // Return rejected promise for invalid domains
    return Promise.reject(new Error(`Domain ${hostname} is not in the trusted domains list`));
  }
}