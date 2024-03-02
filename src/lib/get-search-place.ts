export async function getSearchPlace(search_text: string) {
  const MAPBOX_API_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  // `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json?access_token=${MAPBOX_API_TOKEN}&limit=5`,

  if (!MAPBOX_API_TOKEN) throw new Error("Api token is not defined");

  const res = fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json?proximity=ip&types=address&language=en&access_token=${MAPBOX_API_TOKEN}&limit=5`,
  );

  if (!res) throw new Error("Failed to fetch places");

  return (await res).json();
}
