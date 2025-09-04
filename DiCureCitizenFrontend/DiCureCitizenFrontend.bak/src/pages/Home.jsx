import AdditionalQuestions from '../components/AdditionalQuestions'
import Card from '../components/Card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [text, setText] = useState('')
  const navigate = useNavigate();
  const [showAQ, setShowAQ] = useState(false)
  const [serverResult, setServerResult] = useState(null) // { risk, allowPdf, probability, reasons }
  const [submitting, setSubmitting] = useState(false)
  const [uiError, setUiError] = useState('')
  
const handleAQSubmit = async ({ q1, q2 }) => {
  try {
    setSubmitting(true);
    setUiError('');
    const API_BASE = import.meta.env.VITE_API_BASE || "";

    
    const res = await fetch(`${API_BASE}/api/detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, top_k: 5, link: q1==='yes', bank: q2==='yes' })
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `Detect failed: ${res.status}`);
    }

    const data = await res.json(); // { risk, allowPdf, probability, reasons }
    sessionStorage.setItem('lastDetection', JSON.stringify(data));
    setShowAQ(false);
    navigate('/dialogbox', { state: data });
  } catch (err) {
    setUiError(String(err.message || err));
  } finally {
    setSubmitting(false);
  }
};



  const openQuestions = () => {
    if (!text.trim()) {
      setUiError('Please paste a message first.')
      return
    }
    setUiError('')
    setServerResult(null) 
    setShowAQ(true)
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1 className="brand-title">DiCure<br/>Citizen</h1>
          <p className="trust">Trusted by the seniors of Australia, with 85% spam detection accuracy</p>
          <p className="subhead">Check with us Now<br/>Just enter your text below and receive accurate results in 2 minute.</p>
        </div>
      </section>

      <section className="compose">
        <div className="container compose-inner">
          <div className="compose-art">
            <img src="/hero-left.png" alt="" />
          </div>

          <form className="compose-box" onSubmit={(e)=>e.preventDefault()} noValidate>
            <textarea
              placeholder="Paste the message you received..."
              value={text}
              onChange={(e)=>setText(e.target.value)}
              aria-label="Message to analyse"
            />
            {uiError && <p className="subtle" style={{ color: '#b20000', margin: 0 }}>{uiError}</p>}
            <button className="btn primary" type="button" onClick={openQuestions} disabled={submitting}>
              {submitting ? 'Submitting…' : 'Detect Spam'}
            </button>
          </form>
        </div>
      </section>

      <section className="why container">
        <h2 className="h2 green">Why choose us?</h2>
        <p className="lead">
          We at Dicurecitizen, not only provide you with easy and accurate spam detection, but also with a detailed
          and trusted pdf that can help you in future to be safe from any probable spams.
        </p>
      </section>

      

      <hr className="rule" />

      <section className="container row-between">
        <h2 className="h2">Report the spam to officials now</h2>
        <a className="btn pill">Get Help near you</a>
      </section>

      <hr className="rule" />

      <section className="connect">
        <div className="container connect-inner">
          <h3 className="h2">Connect with us</h3>
          <p className="subtle">Learn digital citizenship by a small readable pdf</p>
          <a className="btn primary pill" href="#">Download now</a>
        </div>
      </section>


      <AdditionalQuestions
        open={showAQ}
        onClose={() => { setShowAQ(false); setServerResult(null); }}
        onSubmit={handleAQSubmit}
      />

  
      {serverResult && (
        <div className="container" style={{ marginTop: 16 }}>
          <div className="feature" style={{ borderColor: '#e9ece5' }}>
            <strong>Result:</strong> {serverResult.risk}
            <div>Probability: {(serverResult.probability * 100).toFixed(0)}%</div>
            {serverResult.reasons?.length > 0 && (
              <ul style={{ margin: '8px 0' }}>
                {serverResult.reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            )}
            {serverResult.allowPdf && (
              <a className="btn pill" href="http://localhost:8080/api/guide">Download Safety Guide PDF</a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
