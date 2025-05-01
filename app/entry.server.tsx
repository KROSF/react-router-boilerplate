import { handleRequest } from '@vercel/react-router/entry.server';
import type { AppLoadContext, EntryContext } from 'react-router';

export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext?: AppLoadContext,
): Promise<Response> {
  const url = new URL(request.url);

  // Intercept /google and redirect
  if (url.pathname === '/google') {
    return Response.redirect('https://www.google.com', 302);
  }

  const nonce = crypto.randomUUID();
  const response = await handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    routerContext,
    loadContext,
    { nonce },
  );
  response.headers.set('x-custom-header', `nonce-${nonce}`);
  return response;
}
