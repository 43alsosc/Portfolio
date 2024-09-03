import dynamic from "next/dynamic";
import "spotify-audio-element";

const MediaController = dynamic(
  () => import("media-chrome/react").then((mod) => mod.MediaController),
  { ssr: false }
);
const MediaControlBar = dynamic(
  () => import("media-chrome/react").then((mod) => mod.MediaControlBar),
  { ssr: false }
);
const MediaPlayButton = dynamic(
  () => import("media-chrome/react").then((mod) => mod.MediaPlayButton),
  { ssr: false }
);
const MediaTimeDisplay = dynamic(
  () => import("media-chrome/react").then((mod) => mod.MediaTimeDisplay),
  { ssr: false }
);
const MediaTimeRange = dynamic(
  () => import("media-chrome/react").then((mod) => mod.MediaTimeRange),
  { ssr: false }
);
const MediaPlaybackRateButton = dynamic(
  () => import("media-chrome/react").then((mod) => mod.MediaPlaybackRateButton),
  { ssr: false }
);
const MediaDurationDisplay = dynamic(
  () => import("media-chrome/react").then((mod) => mod.MediaDurationDisplay),
  { ssr: false }
);
const MediaMuteButton = dynamic(
  () => import("media-chrome/react").then((mod) => mod.MediaMuteButton),
  { ssr: false }
);
const MediaVolumeRange = dynamic(
  () => import("media-chrome/react").then((mod) => mod.MediaVolumeRange),
  { ssr: false }
);

type MusicPlayerProps = {
  url: string;
};

export default function MusicPlayer({ url }: MusicPlayerProps) {
  return (
    <MediaController>
      <audio slot="media" src={url} controls></audio>
      {/* <MediaLoadingIndicator slot="centered-chrome"></MediaLoadingIndicator> */}
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
