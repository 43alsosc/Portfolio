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
    <MediaController>
      <audio className="" slot="media" src={url} controls></audio>
      <MediaLoadingIndicator slot="centered-chrome"></MediaLoadingIndicator>
      <MediaControlBar>
        <MediaPlayButton />
        <MediaTimeDisplay />
        <MediaTimeRange />
        <MediaPlaybackRateButton />
        <MediaDurationDisplay />
        <MediaMuteButton />
        <MediaVolumeRange />
      </MediaControlBar>
    </MediaController>
  );
}
