
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


{/** HTML code that deisgns the certificate that the user downloads post the quiz completion */}

export async function generateCertificate(name: string) {
  if (!name.trim()) {
    alert("Please enter your name before downloading the certificate.");
    return;
  }

 
  const cert = document.createElement("div");
  Object.assign(cert.style, {
    width: "1200px",
    height: "900px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at center, #faf6ed 0%, #f1e7c8 100%)",
    border: "14px solid #4cd0e5ff",
    fontFamily: "'Times New Roman', serif",
    color: "#2c2c2c",
    position: "relative",
    padding: "80px 60px",
    boxSizing: "border-box",
    textAlign: "center",
    zIndex: "9999",
  });

  cert.innerHTML = `
    <h1 style="font-size:58px;font-weight:bold;margin-bottom:10px;">Certificate of Completion</h1>
    <p style="font-size:22px;margin:12px 0;">This certifies that</p>
    <h2 style="font-size:48px;margin:10px 0;font-style:italic;color:#7b5d00;font-family:'Georgia',serif;">
      ${name}
    </h2>
    <p style="font-size:22px;margin:10px 0;">has successfully completed the</p>
    <h3 style="font-size:30px;font-weight:600;margin:8px 0 30px;color:#2d2d2d;">
      Interactive Digital Citizenship Quiz
    </h3>
    <div style="width:60%;height:2px;background:#d4af37;margin:40px 0;"></div>
    <p style="font-size:18px;margin:8px 0;">Date: ${new Date().toLocaleDateString()}</p>
    <p style="font-size:16px;margin-top:5px;">© 2025 DiCureCitizen</p>
    <div style="position:absolute;bottom:60px;right:120px;text-align:center;">
      <img src="/logo.png" alt="Signature" style="width:140px;opacity:0.9;transform:rotate(-3deg);margin-bottom:5px;" />
    </div>
  `;

  document.body.appendChild(cert);

  try {
    const canvas = await html2canvas(cert, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1200, 900],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 1200, 900);
    pdf.save(`Certificate_${name}.pdf`);
  } catch (err) {
    console.error(" Error generating certificate:", err);
    alert("Something went wrong while generating the certificate. Please try again.");
  } finally {
    document.body.removeChild(cert);
  }
}
