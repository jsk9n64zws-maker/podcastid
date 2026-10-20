const PODCASTS = {
  geenius:
    "https://media-api-podcast-worker.api.delfi.ee/media-api-podcast-worker/v1/rss-feed/1e198180-8d0e-11ed-8a3e-55b0fb4cf93d.rss",

  poliitikaguru:
    "https://media-api-podcast-worker.api.delfi.ee/media-api-podcast-worker/v1/rss-feed/f78d5c7f-9ef1-4e8d-80aa-399600e156f3.rss"
};

export async function onRequestGet(context) {
  const requestUrl = new URL(context.request.url);
  const podcastId =
    requestUrl.searchParams.get("id") || "geenius";

  const feedUrl = PODCASTS[podcastId];

  if (!feedUrl) {
    return new Response("Tundmatu podcast", {
      status: 404
    });
  }

  try {
    const response = await fetch(feedUrl);

    if (!response.ok) {
      return new Response(
        "Podcasti ei õnnestunud laadida",
        {
          status: 502
        }
      );
    }

    const xml = await response.text();

    return new Response(xml, {
      headers: {
        "Content-Type":
          "application/xml; charset=UTF-8",
        "Cache-Control":
          "public, max-age=900"
      }
    });
 } catch (error) {
    return new Response(
      "Podcasti laadimisel tekkis viga",
      {
        status: 500
      }
    );
  }
}
