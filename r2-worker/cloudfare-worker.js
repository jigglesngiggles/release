// cloudflare-worker.js

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Mock video data (replace this with your actual video data or API call)
  const videos = [
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
    { 
      title: 'cum', 
      description: 'cum on girls nice',
      videoUrl: 'https://your-cloudflare-video-url/video1.mp4'
    },
  ];

  // Respond with the video data in JSON format
  return new Response(JSON.stringify(videos), {
    headers: { 'Content-Type': 'application/json' },
  });
}

