import React, { useState, useEffect, useRef, useCallback} from 'react';
import '../App.css';

function HomePage() {
/*
  const [videos] = useState([
    { id: 1, src: "videos/strawberry.mp4", title: "Smile" },
    { id: 2, src: "videos/pool.mp4", title: "Yipee" },
    { id: 3, src: "videos/mommy.mp4", title: "CUM" },
  ]);
  */

  const [videos, setVideos] = useState([]);

  // State to manage the mute/unmute state for all videos
  const [muted, setMuted] = useState(true);

  // Create a ref to store video elements
  const videoRefs = useRef([]);

  // Handles the errors
  const [error, setError] = useState(null); // Track error state
  

  useEffect(() => {
    // Fetch video data from Cloudflare Worker or your backend API
    fetch('r2-worker.jenericjakoby.workers.dev') // Replace with your actual URL
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching videos.');
        setLoading(false);
      });
  }, []);

    fetchVideos();
  }, []);
  
  // Add videos to the refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos]);

  // Set up the Intersection Observer to detect when videos are in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;

        if (entry.isIntersecting && videoElement.paused) {
          // If video is in view, play it
          videoElement.play();
        } 
        else if (!entry.isIntersecting && !videoElement.paused) {
          // If video is out of view, pause it
          videoElement.pause();
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the video is in view

    // Observe all video elements
    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      // Clean up the observer when the component unmounts
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [videos]); // Run the effect again if videos change

  // Scroll to the next or previous video based on arrow key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      // Find the current video in view
      const currentIndex = videoRefs.current.findIndex((ref) => {
        return ref && ref.getBoundingClientRect().top >= 0;
      });

      let nextIndex = currentIndex;
      if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        nextIndex = currentIndex + 1; // Move down to the next video
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        nextIndex = currentIndex - 1; // Move up to the previous video
      }

      // Scroll to the next/previous video
      if (videoRefs.current[nextIndex]) {
        videoRefs.current[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [videos, videoRefs]);

  // Add the event listener for keydown on component mount and unmount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Function to toggle mute/unmute for all videos
  const handleMuteToggle = () => {
    setMuted((prevMuted) => {
      // Toggle the muted state
      const newMutedState = !prevMuted;
      // Apply the new mute/unmute state to all video elements
      videoRefs.current.forEach((video) => {
        if (video) video.muted = newMutedState;
      });
      return newMutedState;
    });
  };

  useEffect(() => {
    // Set the initial mute state for all videos when the component mounts
    videoRefs.current.forEach((video) => {
      if (video) video.muted = muted;
    });
  }, [muted]);

  return (
    <div className="App">
      {/* Header section */}
      <header className="App-header">
        <h1>Tik Cumodoro Tok</h1>
      </header>

      {/* Video section */}
      <div className="video-container">
        {videos.slice(0, 10).map((video, index) => (
          <div key={index} className="video-item">
            {/* Video element */}
            <video
              src={video.videoUrl} type="video/mp4" 
              controls
              loop
              mute
              autoPlay
            />
            <h2>{video.title}</h2>
            <p>{video.description}</p>
          </div>
        ))}
      </div>

      {/* Mute/Unmute button */}
      <button onClick={handleMuteToggle} className="mute-button">
        {muted ? 'Unmute All' : 'Mute All'}
      </button>
      
      {/* Footer */}
      <footer>
        <p>© 2025 Tik Cumodoro Tok. All Rights Reserved.</p>
      </footer>
      
    </div>
  );
};

export default HomePage;

