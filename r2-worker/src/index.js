/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env) {
    // Get the path from the URL (this should be the video filename or '/api/videos' for listing)
    const url = new URL(request.url);
    const key = url.pathname.slice(1); // Remove leading slash

    if (url.pathname === '/api/videos') {
      // If the request is for the video list
      const videos = [
        { title: 'Video 1', description: 'Description for video 1', videoUrl: await generateSignedUrl('video1.mp4') },
        { title: 'Video 2', description: 'Description for video 2', videoUrl: await generateSignedUrl('video2.mp4') },
        // Add more video entries as necessary
      ];

      return new Response(JSON.stringify(videos), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    switch (request.method) {
      case 'PUT':
        // Handle file uploads (if you want to allow users to upload videos)
        await env.MY_BUCKET.put(key, request.body);
        return new Response(`Put ${key} successfully!`);
      case 'GET':
        // Handle serving video files
        const object = await env.MY_BUCKET.get(key);

        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);

        return new Response(object.body, { headers });
      case 'DELETE':
        // Handle deleting files from the bucket
        await env.MY_BUCKET.delete(key);
        return new Response("Deleted!");
      default:
        // Handle unsupported HTTP methods
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "PUT, GET, DELETE",
          },
        });
    }
  },
};

// Helper function to generate signed URLs for video access
async function generateSignedUrl(filename) {
  const expiration = 60 * 60 * 24; // 1 day expiration for the URL
  const signedUrl = await MY_BUCKET.getSignedUrl(filename, { expiration });
  return signedUrl;
}

