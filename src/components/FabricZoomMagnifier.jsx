import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Eye, Sparkles } from "lucide-react";

const SAMPLE_ZONES = [
  {
    id: "desert-crimson",
    title: "Desert Crimson Velvet",
    image: "/assets/curated/bg_hero_desert_crimson.jpg",
    subtitle: "Convex shisha mirror facets & antique gold bullion relief"
  },
  {
    id: "zardozi-white",
    title: "Ivory Zardozi Couture",
    image: "/assets/curated/bg_zardozi_couture_white.jpg",
    subtitle: "Sculpted gold kasab threadwork & freshwater moti pearls"
  }
];

export default function FabricZoomMagnifier({ activeImage, onClose }) {
  const [activeZone, setActiveZone] = useState(() => {
    const match = SAMPLE_ZONES.find((z) => z.image === activeImage);
    if (match) return match;
    if (activeImage) {
      return {
        id: "custom-active",
        title: "Haute Couture Inspection",
        image: activeImage,
        subtitle: "High-resolution artisanal embroidery & fabric weave"
      };
    }
    return SAMPLE_ZONES[0];
  });
  const [prevActiveImage, setPrevActiveImage] = useState(activeImage);

  // Sync activeZone if activeImage prop changes from parent
  if (activeImage !== prevActiveImage) {
    setPrevActiveImage(activeImage);
    const match = SAMPLE_ZONES.find((z) => z.image === activeImage);
    if (match) {
      setActiveZone(match);
    } else if (activeImage) {
      setActiveZone({
        id: "custom-active",
        title: "Haute Couture Inspection",
        image: activeImage,
        subtitle: "High-resolution artisanal embroidery & fabric weave"
      });
    }
  }

  const [lensPos, setLensPos] = useState({ x: 50, y: 50, isHovering: false });
  const imgRef = useRef(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const updateCoordinates = (clientX, clientY) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y, isHovering: true });
  };

  const handleMouseMove = (e) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchStart = (e) => {
    if (!e.touches[0]) return;
    updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
  };

  return (
    <motion.div
      className="fabric-zoom-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="fabric-zoom-modal-window"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Topbar */}
        <div className="fabric-zoom-header">
          <div>
            <span className="fabric-zoom-eyebrow">
              <Sparkles size={13} className="gold-text inline-icon" />
              HIGH-RESOLUTION FABRIC & EMBROIDERY VIEWER
            </span>
            <h3 className="fabric-zoom-title">{activeZone.title}</h3>
            <p className="fabric-zoom-subtitle">{activeZone.subtitle}</p>
          </div>
          <button
            type="button"
            className="hotspot-close-btn"
            onClick={onClose}
            aria-label="Close fabric magnifier"
          >
            <X size={20} />
          </button>
        </div>

        {/* Swappable Texture Zone Selector */}
        <div className="fabric-zoom-preset-pills">
          {SAMPLE_ZONES.map((zone) => (
            <button
              key={zone.id}
              type="button"
              className={`fabric-preset-btn ${activeZone.id === zone.id ? "active" : ""}`}
              onClick={() => {
                setActiveZone(zone);
                setLensPos((prev) => ({ ...prev, x: 50, y: 50 }));
              }}
            >
              <Eye size={13} />
              <span>{zone.title}</span>
            </button>
          ))}
        </div>

        {/* Outer Stage Container to frame the full uncropped image */}
        <div className="fabric-zoom-stage-container">
          <div
            className="fabric-zoom-interactive-stage"
            ref={imgRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setLensPos((prev) => ({ ...prev, isHovering: true }))}
            onMouseLeave={() => setLensPos((prev) => ({ ...prev, isHovering: false }))}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* Base High-Resolution Image — 100% visible, zero cropping */}
            <img
              src={activeZone.image}
              alt={activeZone.title}
              className="fabric-zoom-base-img"
            />

            {/* Large Square Optical Glass Magnifier Lens with gold bezel & precision optics brackets */}
            <div
              className={`fabric-zoom-lens ${lensPos.isHovering ? "active" : ""}`}
              style={{
                left: `${lensPos.x}%`,
                top: `${lensPos.y}%`,
                backgroundImage: `url(${activeZone.image})`,
                backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
              }}
            >
              <div className="lens-specular-glare" />
              <div className="lens-corner-bracket top-left" />
              <div className="lens-corner-bracket top-right" />
              <div className="lens-corner-bracket bottom-left" />
              <div className="lens-corner-bracket bottom-right" />
              <div className="lens-crosshair" />
              <span className="lens-magnification-badge">2.5X MACRO</span>
            </div>
          </div>
        </div>

        {/* Text Component Below The Image in Both Mobile and Desktop */}
        <div className="fabric-zoom-footer-bar">
          <div className="fabric-zoom-instructions-text">
            <Sparkles size={14} className="gold-text inline-icon" />
            <span>Hover or drag across garment to inspect microscopic hand-stitching &amp; thread relief</span>
          </div>
          <div className="fabric-zoom-footer-actions">
            <span className="fabric-lens-badge">2.5× Square Precision Loupe</span>
            <button
              type="button"
              className="fabric-zoom-exit-btn"
              onClick={onClose}
              aria-label="Exit Magnifier"
            >
              <X size={14} />
              <span>Exit Magnifier</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
