import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoDomingos from "./assets/logo_domingos_transparente.png";
import "./App.css";

const Home = () => {
  const [modoFormulario, setModoFormulario] = useState(false);
  const [hoverBotao, setHoverBotao] = useState(false);

  return (
    <div className="promo-page">
      <motion.div
        className={`ticket-container ${modoFormulario ? "expanded" : ""}`}
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
                  <h1>INDIQUE E GANHE</h1>
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
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="split-area"
              >

                {/* LADO ESQUERDO */}
                <div className="split-left">
                  <h2>Programa Cliente Parceiro 🤝</h2>
                  <span className="sub-highlight">Indique e ganhe!</span>

                  <p>
                    Transforme suas indicações em recompensa.
                    Sempre que um amigo fechar contrato com a Domingos, você recebe benefícios exclusivos.
                  </p>

                  <ul>
                    <li>Cada indicação efetivada gera recompensa.</li>
                    <li>Indique quantas pessoas quiser.</li>
                    <li>A primeira mensalidade é revertida para você.</li>
                  </ul>
                  <button
                    className="voltar-btn desktop"
                    onClick={() => setModoFormulario(false)}
                  >
                    Voltar
                  </button>
                </div>

                {/* LADO DIREITO */}
                <div className="split-right">
                  <form className="simple-form">
                    <input type="text" placeholder="Seu nome" required />
                    <input type="email" placeholder="Seu email" required />
                    <button
                      className="cta-button submit-btn"
                      type="submit"
                      onMouseEnter={() => setHoverBotao(true)}
                      onMouseLeave={() => setHoverBotao(false)}
                    >
                      <span className="btn-content">

                        <span className="text-wrapper">
                          {hoverBotao ? "Próximo" : "Enviar Indicação"}
                        </span>

                        <svg
                          className={`icon ${hoverBotao ? "rotate" : ""}`}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                          <path d="M6 12h16" />
                        </svg>

                      </span>
                    </button>

                  </form>
                </div>

                {/* BOTÃO VOLTAR AGORA FICA POR ÚLTIMO */}
                <button
                  className="voltar-btn mobile"
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
