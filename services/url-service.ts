import axios from 'axios';

export function createShortenURL(fullUrl: string, email: string, shortUrl?: string) {
  return axios.post(`/api/l/create`, { fullUrl, shortUrl, email });
}
