export default {
  async fetch(request: Request, env: any, ctx: any) {
    try {
      // Serve static assets from __STATIC_CONTENT
      const url = new URL(request.url)
      let path = url.pathname
      
      // Default to index.html for root path or if file not found
      if (path === '/' || !env.__STATIC_CONTENT.get(path.slice(1))) {
        path = '/index.html'
      }

      // Get the content and content type
      const content = await env.__STATIC_CONTENT.get(path.slice(1))
      const contentType = getContentType(path)

      return new Response(content, {
        headers: {
          'content-type': contentType,
          'cache-control': 'public, max-age=31536000',
        },
      })
    } catch (e) {
      return new Response('Not Found', { status: 404 })
    }
  },
}

function getContentType(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() || ''
  const types: { [key: string]: string } = {
    'html': 'text/html;charset=UTF-8',
    'js': 'application/javascript',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'json': 'application/json',
  }
  return types[ext] || 'text/plain'
} 