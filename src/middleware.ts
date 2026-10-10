import { defineMiddleware } from 'astro:middleware';

const SITE_URL = 'https://pelicangames.studio';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Fix GitHub OAuth redirect_uri: replace localhost with production URL
  if (context.url.pathname === '/api/keystatic/github/login') {
    const location = response.headers.get('location');
    if (location && location.includes('localhost')) {
      const newLocation = location.replace(
        /redirect_uri=https%3A%2F%2Flocalhost/g,
        `redirect_uri=${encodeURIComponent(SITE_URL)}`
      );
      const newResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers),
      });
      newResponse.headers.set('location', newLocation);
      return newResponse;
    }
  }

  return response;
});
