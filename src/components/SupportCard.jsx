import { useState } from "react";

export default function SupportCard() {
  const [imageReady, setImageReady] = useState(true);

  return (
    <section className="support-card" aria-labelledby="support-title">
      <div className="support-copy">
        <span className="support-kicker">Hey!</span>
        <h2 id="support-title">Want to support this course?</h2>
        <p>
          If React Learn helped you, you can scan the UPI QR and pay any amount.
        </p>
      </div>

      <div className="support-qr-wrap">
        {imageReady ? (
          <img
            className="support-qr"
            src="/payment-qr.png"
            alt="UPI payment QR code for Indresh Mishra"
            onError={() => setImageReady(false)}
          />
        ) : (
          <div className="support-qr-placeholder">
            <span>QR image pending</span>
          </div>
        )}
        <div className="support-name">Indresh Mishra</div>
        <div className="support-caption">Scan to pay with any UPI app</div>
      </div>
    </section>
  );
}
