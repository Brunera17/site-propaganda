import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logoDomingos from "./assets/logo_domingos_transparente.png";

const Home = () => {
  useEffect(() => {
    // Add fade-in animation on mount
    const ticket = document.querySelector('.ticket-container');
    if (ticket) {
      ticket.classList.add('fade-in');
    }
  }, []);

  const handleIndicateNow = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSePXdnrzBHPh6O7vylTksOgZWoSYb4PKHnXLfL2OV3FaaVuvg/viewform?usp=publish-editor', '_blank');
  };

  return (
    <div className="promo-page" data-testid="promo-page">
      <div className="ticket-container" data-testid="ticket-container">
        {/* Ticket Content */}
        <div className="ticket-content">
          {/* Logo/Header */}
          <div className="ticket-header" data-testid="ticket-header">
            <div className="logo" data-testid="company-logo">
              <img src={logoDomingos} alt="Domingos Contabilidade" />
            </div>
          </div>

          {/* Main Title */}
          <div className="ticket-title" data-testid="ticket-title">
            <div className="sparkle sparkle-left"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg></div>
            <h1>INDIQUE & EFETIVE</h1>
            <div className="sparkle sparkle-right"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg></div>
          </div>

          {/* Subtitle */}
          <div className="ticket-subtitle" data-testid="ticket-subtitle">
            <p></p>
          </div>

          {/* Info Box */}
          <div className="info-box" data-testid="info-box">
            
            <p>
              É muito simples, basta indicar um ou mais amigos.
              Ele efetivando com a Domingos, o primeiro honorário que ele pagar é <strong>SEU!</strong>
            </p>
          </div>

          {/* CTA Button */}
          <button 
            className="cta-button" 
            onClick={handleIndicateNow}
            data-testid="indicate-now-button"
          >
            INDIQUE AGORA
          </button>

          {/* Footer Note */}
          <div className="ticket-footer" data-testid="ticket-footer">
            <p>
              Ah! E não esqueça de pedir para ele avisar que foi você que nos indicou!
            </p>
          </div>
          <br></br>
          <div className="sparkle sparkle-left"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg></div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
