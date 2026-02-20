import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoDomingos from "./assets/logo_domingos_transparente.png";
import "./App.css";

const Home = () => {
  const [modoFormulario, setModoFormulario] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    interesses: [],
    indicacao: "",
    contato: ""
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="promo-page">
      <motion.div
        className={`ticket-container ${modoFormulario ? "expanded" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="ticket-content">

          {/* LOGO */}
          <div className="ticket-header">
            <div className="logo">
              <img src={logoDomingos} alt="Domingos Contabilidade" />
            </div>
          </div>

          <AnimatePresence mode="wait">

            {/* ================= LANDING ================= */}
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

              /* ================= FORM ================= */
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="split-area"
              >

                {/* LADO ESQUERDO */}
                <div className="split-left">
                  <h2>Programa Cliente Parceiro 🤝</h2>
                  <span className="sub-highlight">Etapa {step} de 4</span>

                  <p>
                    Transforme suas indicações em recompensa.
                    Sempre que um amigo fechar contrato com a Domingos, você recebe benefícios exclusivos.
                  </p>

                  <button
                    className="voltar-btn desktop"
                    onClick={() => {
                      if (step === 1) {
                        setModoFormulario(false);
                      } else {
                        prevStep();
                      }
                    }}
                  >
                    Voltar
                  </button>
                </div>

                {/* LADO DIREITO */}
                <div className="split-right">
                  <form className="simple-form" onSubmit={handleSubmit}>

                    {/* ETAPA 1 */}
                    {step === 1 && (
                      <>
                        <input
                          type="text"
                          placeholder="Seu nome"
                          required
                          onChange={(e) =>
                            setFormData({ ...formData, nome: e.target.value })
                          }
                        />
                        <input
                          type="email"
                          placeholder="Seu email"
                          required
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </>
                    )}

                    {/* ETAPA 2 */}
                    {step === 2 && (
                      <>
                        <p>Quais serviços você tem interesse?</p>

                        {["Contabilidade", "Consultoria", "Jurídico"].map((item) => (
                          <label key={item}>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    interesses: [...formData.interesses, item],
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    interesses: formData.interesses.filter(i => i !== item),
                                  });
                                }
                              }}
                            />
                            {item}
                          </label>
                        ))}
                      </>
                    )}

                    {/* ETAPA 3 */}
                    {step === 3 && (
                      <input
                        type="text"
                        placeholder="Quem você está indicando?"
                        onChange={(e) =>
                          setFormData({ ...formData, indicacao: e.target.value })
                        }
                      />
                    )}

                    {/* ETAPA 4 */}
                    {step === 4 && (
                      <input
                        type="text"
                        placeholder="Telefone ou WhatsApp"
                        onChange={(e) =>
                          setFormData({ ...formData, contato: e.target.value })
                        }
                      />
                    )}

                    {/* BOTÃO */}
                    <button
                      className="cta-button submit-btn"
                      type={step === 4 ? "submit" : "button"}
                      onClick={step < 4 ? nextStep : undefined}
                    >
                      <span className="btn-content">

                        <span className="text-wrapper">
                          {step === 4 ? "Enviar Indicação" : "Próximo"}
                        </span>

                        <svg
                          className={`icon ${step < 4 ? "rotate" : ""}`}
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

                {/* VOLTAR MOBILE */}
                <button
                  className="voltar-btn mobile"
                  onClick={() => {
                    if (step === 1) {
                      setModoFormulario(false);
                    } else {
                      prevStep();
                    }
                  }}
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
