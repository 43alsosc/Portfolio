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

type MusicPlayerProps = {
  url: string;
};

export default function MusicPlayer({ url }: MusicPlayerProps) {
  return (
    <div>
      <audio src={url} controls></audio>
      {/* <MediaController> 
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
      </MediaController> */}
    </div>
  );
}
