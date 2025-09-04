import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function AdditionalQuestions({ open, onClose, onSubmit }) {
  const [q1, setQ1] = useState(null); 
  const [q2, setQ2] = useState(null);
  const [err, setErr] = useState("");
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const tid = setTimeout(() => firstInputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(tid);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const proceed = (e) => {
    e.preventDefault();
    if (q1 == null || q2 == null) {
      setErr("Please answer both questions.");
      return;
    }
    setErr("");
    onSubmit?.({ q1, q2 });
  };

  return createPortal(
    <div
      className="aqp-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aqp-title"
      aria-describedby="aqp-desc"
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose?.();
      }}
    >
      <div className="aqp-card" ref={cardRef}>
        <div className="aqp-header">
          <h3 id="aqp-title">Additional Questions</h3>
          <button
            className="aqp-x"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <p id="aqp-desc" className="aqp-sub">
          Please answer the two quick questions:
        </p>

        <form onSubmit={proceed} className="aqp-form">
          <div className="aqp-field">
            <div className="aqp-legend">Does the message ask you to click any link?</div>
            <div className="aqp-row">
              <label className={`aqp-pill ${q1 === "yes" ? "is-selected" : ""}`}>
                <input
                  ref={firstInputRef}
                  type="radio"
                  name="q1"
                  onChange={() => setQ1("yes")}
                />
                Yes
              </label>
              <label className={`aqp-pill ${q1 === "no" ? "is-selected" : ""}`}>
                <input type="radio" name="q1" onChange={() => setQ1("no")} />
                No
              </label>
            </div>
          </div>

          <div className="aqp-field">
            <div className="aqp-legend">Does it ask for bank/card details?</div>
            <div className="aqp-row">
              <label className={`aqp-pill ${q2 === "yes" ? "is-selected" : ""}`}>
                <input type="radio" name="q2" onChange={() => setQ2("yes")} />
                Yes
              </label>
              <label className={`aqp-pill ${q2 === "no" ? "is-selected" : ""}`}>
                <input type="radio" name="q2" onChange={() => setQ2("no")} />
                No
              </label>
            </div>
          </div>

          {err && <p className="aqp-err">{err}</p>}

          <div className="aqp-actions">
            <button type="button" className="aqp-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="aqp-btn aqp-primary">
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
