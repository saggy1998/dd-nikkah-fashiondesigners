import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Calendar,
  X,
  ShieldCheck,
  Truck,
  Heart,
  ChevronRight
} from "lucide-react";
import { COLLECTION_SPECS } from "@/data/designerData";

export default function EcommerceCtaModal({ isOpen, onClose }) {
  const [selectedSize, setSelectedSize] = useState("Bespoke Custom");
  const [selectedService, setSelectedService] = useState("virtual");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const sizes = ["Bespoke Custom", "UK 8 (US 4)", "UK 10 (US 6)", "UK 12 (US 8)", "UK 14 (US 10)"];

  const handleConfirm = (e) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ecommerce-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="ecommerce-modal-dialog"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ecommerce-modal-header">
              <div>
                <span className="ecommerce-header-eyebrow">
                  <Sparkles size={13} className="gold-text inline-icon" />
                  DULHAN DIARIES HAUTE ATELIER
                </span>
                <h2 className="ecommerce-header-title">Acquire Ensemble</h2>
              </div>
              <button
                type="button"
                className="hotspot-close-btn"
                onClick={onClose}
                aria-label="Close checkout modal"
              >
                <X size={20} />
              </button>
            </div>

            {!orderConfirmed ? (
              <div className="ecommerce-modal-content">
                {/* Product Summary on Pure White Card Header */}
                <div className="ecommerce-product-summary-card">
                  <div className="ecommerce-summary-img-wrap">
                    <img
                      src="/assets/curated/product_ecommerce_shot.jpg"
                      alt={COLLECTION_SPECS.name}
                      className="ecommerce-summary-img"
                    />
                  </div>
                  <div className="ecommerce-summary-details">
                    <span className="ecommerce-tag">BRIDAL RUNWAY MASTERPIECE</span>
                    <h3 className="ecommerce-item-title">{COLLECTION_SPECS.name}</h3>
                    <p className="ecommerce-item-ref">{COLLECTION_SPECS.referenceCode}</p>
                    <div className="ecommerce-item-price">
                      {COLLECTION_SPECS.pricing.displayPrice}
                    </div>
                  </div>
                </div>

                {/* Form Selections */}
                <form onSubmit={handleConfirm} className="ecommerce-form">
                  <div className="ecommerce-form-section">
                    <label className="form-label">Select Bridal Sizing</label>
                    <div className="size-selector-grid">
                      {sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          className={`size-pill-btn ${selectedSize === sz ? "active" : ""}`}
                          onClick={() => setSelectedSize(sz)}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="ecommerce-form-section">
                    <label className="form-label">Consultation Experience</label>
                    <div className="service-radio-grid">
                      <div
                        className={`service-radio-card ${selectedService === "virtual" ? "active" : ""}`}
                        onClick={() => setSelectedService("virtual")}
                      >
                        <Calendar size={18} className="gold-text" />
                        <div>
                          <strong>Virtual Concierge with Master Drapier</strong>
                          <p>1-on-1 bespoke consultation via high-definition private stream</p>
                        </div>
                      </div>
                      <div
                        className={`service-radio-card ${selectedService === "atelier" ? "active" : ""}`}
                        onClick={() => setSelectedService("atelier")}
                      >
                        <Sparkles size={18} className="gold-text" />
                        <div>
                          <strong>Private London / Mumbai Atelier Fitting</strong>
                          <p>Champagne reception & in-person measurements with head couturier</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="ecommerce-trust-row">
                    <div className="trust-item">
                      <ShieldCheck size={16} className="gold-text" />
                      <span>Authenticity Certificate & Guild Seal</span>
                    </div>
                    <div className="trust-item">
                      <Truck size={16} className="gold-text" />
                      <span>Global Insured White-Glove Courier</span>
                    </div>
                  </div>

                  {/* Primary Buy Now / Confirm Button with gold foil hover */}
                  <button type="submit" className="buy-now-submit-btn">
                    <ShoppingBag size={18} />
                    <span>Confirm Atelier Reservation — {COLLECTION_SPECS.pricing.displayPrice}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="ecommerce-confirmation-view">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 size={56} className="gold-text confirm-icon" />
                </motion.div>
                <h3>Your Reservation is Received</h3>
                <p className="confirm-subtitle">
                  An exclusive senior bridal concierge from Dulhan Diaries will contact you
                  within 2 hours to confirm your custom measurements and atelier consultation.
                </p>
                <div className="confirm-receipt-box">
                  <div className="receipt-row">
                    <span>Ensemble:</span>
                    <strong>{COLLECTION_SPECS.name}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Sizing:</span>
                    <strong>{selectedSize}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Lead Time:</span>
                    <strong>{COLLECTION_SPECS.pricing.leadTime}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="buy-now-submit-btn"
                  onClick={() => {
                    setOrderConfirmed(false);
                    onClose();
                  }}
                >
                  Return to Lookbook
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
