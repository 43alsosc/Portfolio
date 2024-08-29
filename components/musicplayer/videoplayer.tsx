import {
  MediaControlBar,
  MediaController,
  MediaDurationDisplay,
  MediaFullscreenButton,
  MediaLoadingIndicator,
  MediaMuteButton,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaPosterImage,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import "spotify-audio-element";

type VideoPlayerProps = {
  url: string;
};

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div>
      <MediaController>
        <video slot="media" src={url} poster="" />
        <MediaLoadingIndicator slot="centered-chrome"></MediaLoadingIndicator>
        <MediaControlBar>
          <MediaPlayButton></MediaPlayButton>
          <MediaMuteButton></MediaMuteButton>
          <MediaVolumeRange></MediaVolumeRange>
          <MediaTimeDisplay></MediaTimeDisplay>
          <MediaTimeRange></MediaTimeRange>
          <MediaDurationDisplay></MediaDurationDisplay>
          <MediaPlaybackRateButton></MediaPlaybackRateButton>
          <MediaFullscreenButton></MediaFullscreenButton>
        </MediaControlBar>
      </MediaController>
    </div>
  );
}
