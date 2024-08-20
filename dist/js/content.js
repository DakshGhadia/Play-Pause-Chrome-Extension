let mainVideo = null;

function findMainVideo() {
  const videos = document.querySelectorAll("video");

  if (mainVideo) {
    return mainVideo;
  }

  if (videos.length === 1) {
    mainVideo = videos[0];
  } else {
    for (let video of videos) {
      if (!video.paused) {
        mainVideo = video;
        break;
      }
    }
    if (!mainVideo && videos.length > 0) {
      mainVideo = videos[0];
    }
  }
  return mainVideo;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const video = findMainVideo();
  if (video != undefined && video != null) {
    if (message.action === "pauseVideo" && !video.paused) {
      video.pause();
    }

    if (message.action === "resumeVideo" && video.paused) {
      video.play();
    }
  }
});
