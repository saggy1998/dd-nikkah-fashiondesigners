import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Layers, Clock, Award, ZoomIn, CheckCircle } from "lucide-react";
import { HOTSPOTS_DATA } from "@/data/designerData";

export default function InteractiveHotspots({ onOpenZoom }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedHotspot(null);
      }
    };
    if (selectedHotspot) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedHotspot]);

  // Modal element rendered directly to document.body via Portal to prevent any z-index or stacking clipping
  const modalContent = (
    <AnimatePresence>
      {selectedHotspot && (
        <motion.div
          className="hotspot-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setSelectedHotspot(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hotspot-modal-title"
        >
          <motion.div
            className="hotspot-drawer-card"
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Touch Drag Indicator */}
            <div className="drawer-drag-handle-bar" />

            <div className="hotspot-drawer-header">
              <div>
                <span className="hotspot-drawer-eyebrow">
                  <Sparkles size={13} className="gold-text inline-icon" />
                  {selectedHotspot.category}
                </span>
                <h3 id="hotspot-modal-title" className="hotspot-drawer-title">
                  {selectedHotspot.title}
                </h3>
              </div>
              <button
                type="button"
                className="hotspot-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHotspot(null);
                }}
                aria-label="Close detail modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Macro Image Preview with option to trigger Fabric Zoom Tool */}
            <div className="hotspot-drawer-img-container">
              <img
                src={selectedHotspot.previewImg}
                alt={selectedHotspot.title}
                className="hotspot-drawer-img"
              />
              <button
                type="button"
                className="hotspot-trigger-zoom-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const img = selectedHotspot.previewImg;
                  setSelectedHotspot(null);
                  if (onOpenZoom) onOpenZoom(img);
                }}
              >
                <ZoomIn size={15} /> Inspect in 2.5x Fabric Magnifier Lens
              </button>
            </div>

            <div className="hotspot-drawer-body">
              <p className="hotspot-drawer-desc">{selectedHotspot.description}</p>

              <div className="hotspot-specs-grid">
                <div className="hotspot-spec-item">
                  <Layers size={16} className="gold-text" />
                  <div>
                    <span className="spec-label">Technique</span>
                    <span className="spec-value">{selectedHotspot.technique}</span>
                  </div>
                </div>
                <div className="hotspot-spec-item">
                  <Clock size={16} className="gold-text" />
                  <div>
                    <span className="spec-label">Artisan Time</span>
                    <span className="spec-value">{selectedHotspot.hours}</span>
                  </div>
                </div>
                <div className="hotspot-spec-item">
                  <Award size={16} className="gold-text" />
                  <div>
                    <span className="spec-label">Authenticity</span>
                    <span className="spec-value">100% Certified Zari</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-friendly bottom dismiss button */}
            <div className="hotspot-drawer-footer">
              <button
                type="button"
                className="hotspot-dismiss-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHotspot(null);
                }}
              >
                Close Details & Return to Garment
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="hotspots-overlay-container">
      {/* Pulsing Hotspot Markers on the Garment */}
      {HOTSPOTS_DATA.map((spot, index) => (
        <div
          key={spot.id}
          className="hotspot-pin-wrapper"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
          }}
        >
          {/* Continuous pulsing halo animation */}
          <motion.button
            type="button"
            className="hotspot-pulse-button"
            onClick={() => setSelectedHotspot(spot)}
            aria-label={`Explore ${spot.title}`}
            animate={{
              scale: [1.0, 1.2, 1.0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            }}
          >
            <span className="hotspot-center-dot" />
            <span className="hotspot-pulse-ring" />
          </motion.button>

          {/* Quick Tag Label */}
          <button
            type="button"
            className="hotspot-tag-pill"
            onClick={() => setSelectedHotspot(spot)}
          >
            <span className="hotspot-tag-num">0{index + 1}</span>
            <span className="hotspot-tag-text">{spot.category}</span>
          </button>
        </div>
      ))}

      {/* Render modal directly to document.body for unencumbered z-index and click events */}
      {typeof document !== "undefined" && createPortal(modalContent, document.body)}
    </div>
  );
}
