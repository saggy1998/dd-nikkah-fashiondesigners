import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShoppingBag,
  ZoomIn,
  Quote,
  ArrowRight,
} from "lucide-react";
import { DESIGNER_INFO, COLLECTION_SPECS, MEDIA_PAIRS } from "@/data/designerData";
import InteractiveHotspots from "@/components/InteractiveHotspots";
import FabricZoomMagnifier from "@/components/FabricZoomMagnifier";
import EcommerceCtaModal from "@/components/EcommerceCtaModal";
import NavigationControls from "@/components/NavigationControls";

const TOTAL_FRAMES = 6;

const cardMotionVariants = {
  hidden: (side) => ({
    opacity: 0,
    x: side === "left" ? -80 : 80,
    y: 15,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FashionDesignerShowcase() {
  const snapContainerRef = useRef(null);
  const heroVideoRef = useRef(null);

  const [activeFrame, setActiveFrame] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoHero, setIsVideoHero] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);

  // Monitor scroll position inside snap-scroll-container
  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      if (idx !== activeFrame && idx >= 0 && idx < TOTAL_FRAMES) {
        setActiveFrame(idx);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeFrame]);

  // Smooth scroll helper
  const scrollToFrame = useCallback((idx) => {
    const container = snapContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: idx * container.clientHeight, behavior: "smooth" });
  }, []);

  return (
    <div className="fashion-app-root">
      {/* Navigation Controls: Topbar + Right-side Golden Progress Thread */}
      <NavigationControls
        activeFrame={activeFrame}
        totalFrames={TOTAL_FRAMES}
        onDotClick={scrollToFrame}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        isVideoHero={isVideoHero}
        onToggleVideoHero={() => setIsVideoHero(!isVideoHero)}
      />

      {/* ════════════════════════════════════════════════════════════════
          SNAP SCROLL CONTAINER
          Contains 3 PAIRS of frames. Each pair spans 200vh.
          - PAIR 1: Frames 0 & 1 -> Background Image 1 (or Runway Video)
          - PAIR 2: Frames 2 & 3 -> Background Image 2 (Pushes Background 1 at Frame 2!)
          - PAIR 3: Frames 4 & 5 -> Background Image 3 (Pushes Background 2 at Frame 4!)
      ════════════════════════════════════════════════════════════════ */}
      <main className="snap-scroll-container" ref={snapContainerRef}>

        {/* ────────────────────────────────────────────────────────────
            PAIR 1: BACKGROUND IMAGE 1 / HERO VIDEO
            Spans Frame 0 & Frame 1.
            Background stays pinned while scrolling through Frame 0 and 1.
        ──────────────────────────────────────────────────────────── */}
        <section className="scrolly-background-pair" id="pair-1">
          {/* Sticky Background 1 Layer */}
          <div className="sticky-bg-image-box">
            {isVideoHero ? (
              <video
                ref={heroVideoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="still-bg-media still-bg-video"
              >
                <source src={MEDIA_PAIRS.pair1.heroVideo} type="video/mp4" />
              </video>
            ) : (
              <img
                src={MEDIA_PAIRS.pair1.bgImage}
                alt={MEDIA_PAIRS.pair1.bgAlt}
                className="still-bg-media still-bg-img"
              />
            )}
            <div className="hero-video-vignette-overlay" />
          </div>

          {/* FRAME 0: HERO COVER PAGE — Full-screen Video + Designer Logo Entry */}
          <section className="snap-frame snap-frame--hero">
            <motion.div
              className="snap-hero-centerpiece"
              initial={{ opacity: 0, y: -120, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-curator-eyebrow">
                <Sparkles size={12} className="gold-text inline-icon" />
                <span>DULHAN DIARIES HAUTE ATELIER</span>
                <Sparkles size={12} className="gold-text inline-icon" />
              </div>

              {/* Designer Logo Badge Centerpiece */}
              <div className="designer-hero-logo-card">
                <span className="logo-streak-shimmer" />
                <div className="hero-logo-crest-wrap">
                  <span className="hero-logo-monogram">AM</span>
                </div>
                <div className="hero-logo-divider-v" />
                <div className="hero-logo-titles">
                  <h1 className="hero-logo-brand-name">{DESIGNER_INFO.brandName}</h1>
                  <span className="hero-logo-brand-sub">{DESIGNER_INFO.subBrand}</span>
                </div>
              </div>

              <div className="hero-edition-line">
                <span className="hero-edition-pill">{DESIGNER_INFO.edition}</span>
              </div>

              <p className="hero-tagline-prose">
                {DESIGNER_INFO.heroSubtitle}
              </p>
            </motion.div>

            {/* Standalone scroll cue */}
            <motion.button
              type="button"
              className="snap-scroll-cue-btn snap-scroll-cue-btn--standalone"
              onClick={() => scrollToFrame(1)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{
                opacity: { duration: 1.2, delay: 1.2 },
                y: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
              }}
            >
              <span className="scroll-cue-text">Scroll to Explore Story</span>
              <div className="scroll-cue-line" />
            </motion.button>
          </section>

          {/* FRAME 1: HERO INTRO + DESIGNER BIO — first content after bg 1 appears */}
          <section className="snap-frame snap-frame--content">
            <div className="snap-content-row snap-content-row--right">
              <motion.article
                className="snap-card snap-card--editorial snap-card--right"
                custom="right"
                variants={cardMotionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
              >
                {/* Designer Logo Badge — slides in from top */}
                <motion.div
                  className="designer-logo-badge designer-logo-badge--inline"
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="designer-logo-inner">
                    <span className="logo-streak-shimmer" />
                    <span className="logo-brand-mark">AM</span>
                    <h2 className="logo-brand-name">{DESIGNER_INFO.brandName}</h2>
                    <span className="logo-brand-sub">{DESIGNER_INFO.subBrand}</span>
                  </div>
                </motion.div>

                <span className="card-eyebrow">
                  <Sparkles size={13} className="gold-text inline-icon" />
                  DESIGNER PROFILE & HERITAGE
                </span>

                <h2 className="card-headline-serif">
                  Crafting Timeless Bridal Elegance
                </h2>

                <p className="card-body-text">{DESIGNER_INFO.bioBaseline}</p>

                <div className="card-quote-callout">
                  <Quote size={18} className="gold-icon quote-mark-icon" />
                  <p className="quote-text">{DESIGNER_INFO.philosophy}</p>
                </div>

                <div className="designer-stats-grid">
                  {DESIGNER_INFO.stats.map((st, i) => (
                    <div key={i} className="stat-pill-item">
                      <span className="stat-value">{st.value}</span>
                      <span className="stat-label">{st.label}</span>
                    </div>
                  ))}
                </div>

                <div className="card-footer-action">
                  <button
                    type="button"
                    className="card-cta-gold-link"
                    onClick={() => scrollToFrame(2)}
                  >
                    <span>Examine Garment Hotspots</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.article>
            </div>
          </section>
        </section>

        {/* ────────────────────────────────────────────────────────────
            PAIR 2: BACKGROUND IMAGE 2
            PHYSICALLY PUSHES BACKGROUND 1 WHEN SCROLLING TO FRAME 2!
            Spans Frame 2 & Frame 3.
        ──────────────────────────────────────────────────────────── */}
        <section className="scrolly-background-pair" id="pair-2">
          {/* Sticky Background 2 Layer — pins at top: 0 for Frame 2 & 3 */}
          <div className="sticky-bg-image-box">
            <img
              src={MEDIA_PAIRS.pair2.bgImage}
              alt={MEDIA_PAIRS.pair2.bgAlt}
              className="still-bg-media still-bg-img"
            />
          </div>

          {/* FRAME 2: INTERACTIVE GARMENT HOTSPOTS (Unobstructed lehenga with glowing inspection pins) */}
          <section className="snap-frame snap-frame--interactive">
            {/* Elegant Haute Couture Guide Badge */}
            <motion.div
              className="garment-hotspots-guide-banner"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="guide-sparkle-dot" />
              <span className="guide-banner-text">Interactive Garment Explorer · Tap any glowing pin</span>
            </motion.div>

            {/* Clickable / Pulsing Hotspots overlaid directly on the Garment */}
            <InteractiveHotspots onOpenZoom={(img) => setZoomImage(img)} />

            {/* Standalone scroll cue guiding to Collection Specifications */}
            <motion.button
              type="button"
              className="snap-scroll-cue-btn snap-scroll-cue-btn--standalone"
              onClick={() => scrollToFrame(3)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: [0, 8, 0] }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                opacity: { duration: 1, delay: 0.4 },
                y: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
              }}
            >
              <span className="scroll-cue-text">Explore Craftsmanship Specs</span>
              <div className="scroll-cue-line" />
            </motion.button>
          </section>

          {/* FRAME 3: EDITORIAL CRAFTSMANSHIP & COLLECTION SPECS (Clean, zero overlap) */}
          <section className="snap-frame snap-frame--content">
            <div className="snap-content-row snap-content-row--left">
              <motion.article
                className="snap-card snap-card--left snap-card--editorial"
                custom="left"
                variants={cardMotionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
              >
                <span className="card-eyebrow">
                  <Sparkles size={13} className="gold-text inline-icon" />
                  HAUTE COUTURE SPECIFICATIONS
                </span>

                <h2 className="card-headline-serif">
                  Touch the Craftsmanship
                </h2>

                <p className="card-body-text">
                  Crafted over 480 hours of meticulous hand-embroidery, blending authentic
                  dabka bullion coils, scalloped tilla borders, and hand-cut convex shisha mirrors
                  anchored in pure mulberry silk.
                </p>

                <div className="zoom-tool-prompt-box">
                  <div className="zoom-prompt-info">
                    <span className="zoom-prompt-tag">OPTICAL FABRIC VIEWER</span>
                    <h4>2.5x Glass Magnifier Lens</h4>
                    <p>Experience microscopic stitch inspection with tactile glass reflections.</p>
                  </div>
                  <button
                    type="button"
                    className="open-magnifier-btn"
                    onClick={() => setZoomImage("/assets/curated/detail_embroidery_zoom.jpg")}
                  >
                    <ZoomIn size={16} />
                    <span>Launch Lens</span>
                  </button>
                </div>

                <div className="card-footer-action-split">
                  <button
                    type="button"
                    className="card-cta-secondary-link"
                    onClick={() => scrollToFrame(2)}
                  >
                    <span>← Re-inspect Garment Pins</span>
                  </button>
                  <button
                    type="button"
                    className="card-cta-gold-link"
                    onClick={() => scrollToFrame(4)}
                  >
                    <span>View Haute Lookbook</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.article>
            </div>
          </section>
        </section>

        {/* ────────────────────────────────────────────────────────────
            PAIR 3: BACKGROUND IMAGE 3
            PHYSICALLY PUSHES BACKGROUND 2 WHEN SCROLLING TO FRAME 4!
            Spans Frame 4 & Frame 5.
        ──────────────────────────────────────────────────────────── */}
        <section className="scrolly-background-pair" id="pair-3">
          {/* Sticky Background 3 Layer — pins at top: 0 for Frame 4 & 5 */}
          <div className="sticky-bg-image-box">
            <img
              src={MEDIA_PAIRS.pair3.bgImage}
              alt={MEDIA_PAIRS.pair3.bgAlt}
              className="still-bg-media still-bg-img"
            />
          </div>

          {/* FRAME 4: BLANK — Background 3 enters clean, no content overlay */}
          <section className="snap-frame snap-frame--blank">
            {/* Intentionally empty: cinematic bg push reveal */}
            <motion.button
              type="button"
              className="snap-scroll-cue-btn snap-scroll-cue-btn--standalone"
              onClick={() => scrollToFrame(5)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: [0, 8, 0] }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                opacity: { duration: 1, delay: 0.4 },
                y: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
              }}
            >
              <span className="scroll-cue-text">Reserve Your Atelier Fitting</span>
              <div className="scroll-cue-line" />
            </motion.button>
          </section>

          {/* FRAME 5: HAUTE COUTURE + E-COMMERCE CTA — first content after bg 3 */}
          <section className="snap-frame snap-frame--cta">
            <motion.div
              className="page3-cta-container"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Required Pure White (#FFFFFF) Product Presentation Card from Brief */}
              <div className="pure-white-ecommerce-card">
                <div className="white-card-media-col">
                  <div className="product-shot-white-frame">
                    <img
                      src="/assets/curated/product_ecommerce_shot.jpg"
                      alt="Noor Mahal Bridal Lehenga on Pure White Background"
                      className="product-cutout-img"
                    />
                    <div className="white-frame-badge">ATELIER EXCLUSIVE</div>
                  </div>
                </div>

                <div className="white-card-details-col">
                  <span className="white-card-eyebrow">
                    <Sparkles size={12} className="gold-text inline-icon" />
                    AUTUMN / WINTER BRIDAL RUNWAY
                  </span>

                  <h3 className="white-card-product-title">
                    {COLLECTION_SPECS.name}
                  </h3>

                  <p className="white-card-desc">
                    Bridging historic Mughal courts with modern high-fashion ceremonies — this
                    bespoke ensemble carries heirloom nostalgia. Meticulously tailored upon order.
                    Includes hand-stitched raw silk choli, multi-kalidar flared skirt with 5.5m sweep,
                    and dual bespoke dupattas.
                  </p>

                  <div className="white-card-price-row">
                    <span className="price-tag">{COLLECTION_SPECS.pricing.displayPrice}</span>
                    <span className="price-lead-time">{COLLECTION_SPECS.pricing.leadTime}</span>
                  </div>

                  {/* Buy Now Button with Gold Foil Border Accent & Micro-Glow Hover */}
                  <div className="white-card-actions">
                    <button
                      type="button"
                      className="buy-now-cta-button"
                      onClick={() => setIsShopModalOpen(true)}
                    >
                      <ShoppingBag size={18} />
                      <span>Buy Now — Reserve Atelier Fitting</span>
                    </button>

                    <button
                      type="button"
                      className="open-magnifier-secondary-btn"
                      onClick={() => setZoomImage("/assets/curated/detail_embroidery_zoom.jpg")}
                    >
                      <ZoomIn size={16} />
                      <span>Inspect Zardozi Details</span>
                    </button>
                  </div>

                  <p className="white-card-disclaimer">
                    100% Bespoke Craftsmanship • Verified Dulhan Diaries Designer Sample Pack
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        </section>

      </main>

      {/* Fabric Zoom Magnifier Modal */}
      <AnimatePresence>
        {zoomImage && (
          <FabricZoomMagnifier
            activeImage={zoomImage}
            onClose={() => setZoomImage(null)}
          />
        )}
      </AnimatePresence>

      {/* E-Commerce Shop & Bespoke Consultation Modal */}
      <EcommerceCtaModal
        isOpen={isShopModalOpen}
        onClose={() => setIsShopModalOpen(false)}
      />
    </div>
  );
}
