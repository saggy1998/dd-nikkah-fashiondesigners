import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Layers, Clock, Award, ZoomIn } from "lucide-react";
import { HOTSPOTS_DATA } from "@/data/designerData";

export default function InteractiveHotspots({ onOpenZoom }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

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
          {/* Continuous pulsing halo animation: 1.0x to 1.2x glow as specified in brief */}
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

      {/* Elegant Pop-up Modal / Floating Drawer */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            className="hotspot-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHotspot(null)}
          >
            <motion.div
              className="hotspot-drawer-card"
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hotspot-drawer-header">
                <div>
                  <span className="hotspot-drawer-eyebrow">
                    <Sparkles size={13} className="gold-text inline-icon" />
                    {selectedHotspot.category}
                  </span>
                  <h3 className="hotspot-drawer-title">{selectedHotspot.title}</h3>
                </div>
                <button
                  type="button"
                  className="hotspot-close-btn"
                  onClick={() => setSelectedHotspot(null)}
                  aria-label="Close detail modal"
                >
                  <X size={18} />
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
                  onClick={() => {
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
                    <Layers size={15} className="gold-text" />
                    <div>
                      <span className="spec-label">Technique</span>
                      <span className="spec-value">{selectedHotspot.technique}</span>
                    </div>
                  </div>
                  <div className="hotspot-spec-item">
                    <Clock size={15} className="gold-text" />
                    <div>
                      <span className="spec-label">Artisan Time</span>
                      <span className="spec-value">{selectedHotspot.hours}</span>
                    </div>
                  </div>
                  <div className="hotspot-spec-item">
                    <Award size={15} className="gold-text" />
                    <div>
                      <span className="spec-label">Authenticity</span>
                      <span className="spec-value">100% Certified Zari</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
