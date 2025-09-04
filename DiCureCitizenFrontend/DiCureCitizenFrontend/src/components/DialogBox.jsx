import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export default function DialogBox() {
  const { state } = useLocation();
  const risk = (state?.risk || 'high').toLowerCase();

  const handleDownload = useCallback(async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_BASE || "";
      const res = await fetch(`${API_BASE}/api/safety-guide`);
      if (!res.ok) throw new Error(`Download failed: ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'safety-guide.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.location.href = '/api/safety-guide';
    }
  }, []);


  const riskTitle = risk === 'high' ? 'RISK ALERT' : 'PROCEED WITH CAUTION';
  const message =
    risk === 'high'
      ? 'The message is a scam!!!!!'
      : 'We did not detect obvious red flags, but stay cautious.';


    return (
  <section className="page dialog">
    <div className="dialog-wrap">
      <div className={`dialog-box ${risk === 'high' ? 'danger' : ''}`} role="alert" aria-live="assertive">
        <h2>{riskTitle}</h2>
        <p className="big">{message}</p>
        <p>Learn how to save yourself from scams</p>

        <div className="actions" style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button className="btn primary" type="button" onClick={handleDownload}>
            Download Safety Guide PDF
          </button>
         
        </div>
      </div>

      <div className="dialog-below">
        <a className="subtle-link" href="/">Go Home</a>
      </div>
    </div>
  </section>
);

   
}
