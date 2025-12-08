/*
This is used to store data in a cache
Example: save datas from API call
so you don't have to recall the API over and over
*/

let cachedEvents = null;
let lastFetched = 0;

export async function getEvents(fetchFn) {
  const CACHE_TTL = 1000 * 60;

  const now = Date.now();

  if (cachedEvents && now - lastFetched < CACHE_TTL) {
    return cachedEvents;
  }

  const data = await fetchFn();
  cachedEvents = data;
  lastFetched = now;

  return data;
}
