const FEED_URL =
  "https://media-api-podcast-worker.api.delfi.ee/media-api-podcast-worker/v1/rss-feed/1e198180-8d0e-11ed-8a3e-55b0fb4cf93d.rss";

export async function onRequestGet() {
  const response = await fetch(FEED_URL);

  if (!response.ok) {
    return new Response("Podcasti ei õnnestunud laadida", {
      status: 502
    });
  }

  const xml = await response.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8"
    }
  });
}
