import BtnCustom from '../BtnCustom.jsx'

export default function VideoPreview({ videoUrl, filename, onReset }) {
  function handleDownload() {
    const link = document.createElement('a')
    link.href = videoUrl
    link.download = filename
    link.click()
  }

  return (
    <div className="d-flex flex-column gap-4">
      <video
        className="w-100 border"
        src={videoUrl}
        controls
        autoPlay
        playsInline
      />
      <div className="d-flex flex-wrap gap-2">
        <BtnCustom type="button" label="Download .mp4" onClick={handleDownload} />
        <BtnCustom
          type="button"
          variant="secondary"
          label="New recording"
          onClick={onReset}
        />
      </div>
    </div>
  )
}
