import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Eye, Sparkles, RefreshCw } from "lucide-react";

const SAMPLE_ZONES = [
  {
    id: "zardozi",
    title: "Zardozi Metallic Relief",
    image: "/assets/curated/detail_embroidery_zoom.jpg",
    subtitle: "Dabka bullion coils & antique gold sequins"
  },
  {
    id: "veil",
    title: "Bridal Veil & Moti Beads",
    image: "/assets/curated/detail_veil_jewels.jpg",
    subtitle: "Gossamer organza with freshwater pearl tassels"
  },
  {
    id: "tilla",
    title: "Kashmiri Tilla Brocade",
    image: "/assets/curated/detail_kashmiri_tilla.jpg",
    subtitle: "Hand-twined gilded silk threadwork"
  }
];

export default function FabricZoomMagnifier({ activeImage, onClose }) {
  const [activeZone, setActiveZone] = useState(
    SAMPLE_ZONES.find((z) => z.image === activeImage) || SAMPLE_ZONES[0]
  );
  const [lensPos, setLensPos] = useState({ x: 50, y: 50, isHovering: false });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y, isHovering: true });
  };

  const handleTouchMove = (e) => {
    if (!imgRef.current || !e.touches[0]) return;
    const rect = imgRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y, isHovering: true });
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
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
              onClick={() => setActiveZone(zone)}
            >
              <Eye size={13} />
              <span>{zone.title}</span>
            </button>
          ))}
        </div>

        {/* Main Magnifier Interactive Viewport */}
        <div
          className="fabric-zoom-interactive-stage"
          ref={imgRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setLensPos((prev) => ({ ...prev, isHovering: true }))}
          onMouseLeave={() => setLensPos((prev) => ({ ...prev, isHovering: false }))}
          onTouchMove={handleTouchMove}
          onTouchStart={() => setLensPos((prev) => ({ ...prev, isHovering: true }))}
        >
          {/* Base High-Resolution Image */}
          <img
            src={activeZone.image}
            alt={activeZone.title}
            className="fabric-zoom-base-img"
          />

          {/* Optical Glass Magnifier Lens with gold rim */}
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
            <div className="lens-crosshair" />
            <span className="lens-magnification-badge">2.5X ZOOM</span>
          </div>

          <div className="fabric-zoom-instructions">
            <span>Hover or drag over garment to inspect microscopic hand-stitching & thread relief</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
