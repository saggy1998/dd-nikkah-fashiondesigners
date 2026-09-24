import React from "react";
import { Volume2, VolumeX, Video, Image as ImageIcon, Sparkles } from "lucide-react";

export default function NavigationControls({
  activeFrame,
  totalFrames,
  onDotClick,
  isMuted,
  onToggleMute,
  isVideoHero,
  onToggleVideoHero,
}) {
  const frameTitles = [
    "01 • Designer Hero",
    "02 • Atelier Profile",
    "03 • Garment Hotspots",
    "04 • Collection Specs",
    "05 • Bridal Spread",
    "06 • E-Commerce Atelier",
  ];

  return (
    <>
      {/* Top Floating Controls */}
      <header className="floating-topbar-controls">
        <div className="topbar-spacer" />

        <div className="topbar-actions-group">
          {/* Toggle Video/Image Backdrop */}
          <button
            type="button"
            className={`topbar-action-btn ${isVideoHero ? "active-mode" : ""}`}
            onClick={onToggleVideoHero}
            title={isVideoHero ? "Switch to Editorial Photography" : "Switch to Runway Video"}
          >
            {isVideoHero ? <Video size={16} /> : <ImageIcon size={16} />}
            <span className="btn-label">{isVideoHero ? "Runway Video" : "Editorial Stills"}</span>
          </button>

          {/* Audio toggle */}
          <button
            type="button"
            className="topbar-action-btn"
            onClick={onToggleMute}
            title={isMuted ? "Unmute Ambient Soundscape" : "Mute Sound"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="btn-label">{isMuted ? "Sound Off" : "Sound On"}</span>
          </button>
        </div>
      </header>

      {/* Right Side Golden Progress Nav Thread */}
      <nav className="snap-progress-nav" aria-label="Lookbook section navigation">
        <div className="snap-progress-track">
          <div
            className="snap-progress-fill"
            style={{ height: `${((activeFrame + 1) / totalFrames) * 100}%` }}
          />
        </div>
        {Array.from({ length: totalFrames }).map((_, i) => (
          <div key={i} className="nav-dot-wrapper">
            <button
              type="button"
              className={`snap-progress-dot ${activeFrame === i ? "active" : ""}`}
              onClick={() => onDotClick(i)}
              aria-label={`Navigate to ${frameTitles[i]}`}
            />
            <span className="nav-dot-tooltip">{frameTitles[i]}</span>
          </div>
        ))}
      </nav>
    </>
  );
}
