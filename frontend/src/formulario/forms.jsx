import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoDomingos from "./assets/logo_domingos_transparente.png";

const Home = () => {
  const [modoFormulario, setModoFormulario] = useState(false);

  return (
    <div className="promo-page">
      <motion.div
        className="ticket-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="ticket-content">

          {/* LOGO (sempre visível) */}
          <div className="ticket-header">
            <div className="logo">
              <img src={logoDomingos} alt="Domingos Contabilidade" />
            </div>
          </div>

          <AnimatePresence mode="wait">

            {!modoFormulario ? (
              <motion.div
                key="conteudo"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="ticket-title">
                  <h1>INDIQUE & EFETIVE</h1>
                </div>

                <div className="info-box">
                  <p>
                    É muito simples, basta indicar um ou mais amigos.
                    Ele efetivando com a Domingos, o primeiro honorário que ele pagar é <strong>SEU!</strong>
                  </p>
                </div>

                <button
                  className="cta-button"
                  onClick={() => setModoFormulario(true)}
                >
                  INDIQUE AGORA
                </button>

                <div className="ticket-footer">
                  <p>
                    Ah! E não esqueça de pedir para ele avisar que foi você que nos indicou!
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="formulario"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="form-area"
              >
                <form className="simple-form">
                  <input type="text" placeholder="Seu nome" required />
                  <input type="email" placeholder="Seu email" required />
                  <button type="submit">Enviar</button>
                </form>

                <button
                  className="voltar-btn"
                  onClick={() => setModoFormulario(false)}
                >
                  Voltar
                </button>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
};

export default Home;
