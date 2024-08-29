import dynamic from "next/dynamic";

const DynamicMusicPlayerControls = dynamic(
  () => import("@/components/musicplayer/musicPlayerControls"),
  {
    ssr: false,
  }
);

export default function MusicPlayerPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div
        className="w-screen h-screen fixed -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(185,174,238,1) 0%, rgba(233,148,148,1) 100%)",
          filter:
            "progid:DXImageTransform.Microsoft.gradient(startColorstr='#b9aeee',endColorstr='#e99494',GradientType=1)",
        }}
      />
      <DynamicMusicPlayerControls />
    </div>
  );
}
