import { createDirectus, staticToken, rest, graphql } from "@directus/sdk";

export function cms({
  CMS_BASE_URL,
  CMS_STATIC_TOKEN,
}: {
  CMS_BASE_URL: string;
  CMS_STATIC_TOKEN: string;
}) {
  return createDirectus(CMS_BASE_URL)
    .with(staticToken(CMS_STATIC_TOKEN))
    .with(
      rest({
        // TODO -- check if this is the best way to cache the request
        onRequest: (options) => ({ ...options, cache: "force-cache" }),
      }),
    );
}

export const cmsGraphql = ({
  CMS_BASE_URL,
  CMS_STATIC_TOKEN,
}: {
  CMS_BASE_URL: string;
  CMS_STATIC_TOKEN: string;
}) => {
  const GQL_ENDPOINT = `${CMS_BASE_URL}/graphql`;
  return createDirectus(GQL_ENDPOINT)
    .with(staticToken(CMS_STATIC_TOKEN))
    .with(graphql());
};

export const resolveImage = (
  imageId: string | null | number,
  directusUrl: string,
): string => {
  if (!imageId) {
    return "https://no-image-id.com/no-image.png";
  }

  return `${directusUrl}/assets/${imageId}.png`;
};
