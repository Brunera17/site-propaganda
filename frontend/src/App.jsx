import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoFuzhu from "@/assets/logo_domingos_transparente.png";
import "@/App.css";

const Home = () => {
  const [modoFormulario, setModoFormulario] = useState(false);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    interesses: [],
    indicacao: "",
    contato: "",
    emailamigo: ""
  });

  const servicos = [
    "Contabilidade",
    "Consultoria",
    "Registro de marcas e patentes",
    "Holding",
    "Recuperação tributária",
    "CNO de obras",
    "Corpo de bombeiros",
    "Jurídico",
    "Segurança e medicina do trabalho",
    "Licitação",
    "Certificado Digital"
  ];
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };


  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.nome.trim()) {
        newErrors.nome = "Nome é obrigatório";
      } else if (formData.nome.trim().length < 3) {
        newErrors.nome = "Nome deve ter pelo menos 3 caracteres";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email é obrigatório";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email inválido";
      }

      if (!formData.empresa.trim()) {
        newErrors.empresa = "Empresa é obrigatório";
      } else if (formData.nome.trim().length < 3) {
        newErrors.nome = "Nome deve ter pelo menos 3 caracteres";
      }
    }

    if (currentStep === 2 && formData.interesses.length === 0) {
      newErrors.interesses = "Selecione pelo menos um serviço";
    }

    if (currentStep === 3 && !formData.indicacao.trim()) {
      newErrors.indicacao = "Nome do indicado é obrigatório";
    }

    if (currentStep === 4) {
      const telefone = formData.contato?.trim();
      const emailAmigo = formData.emailamigo?.trim();

      if (!telefone && !emailAmigo) {
        newErrors.contato = "Informe pelo menos telefone ou email do amigo";
        newErrors.emailamigo = "Informe pelo menos telefone ou email do amigo";
      }

      if (telefone) {
        const telefoneLimpo = telefone.replace(/\D/g, "");

        if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
          newErrors.contato = "Telefone deve ter DDD + número (10 ou 11 dígitos)";
        }
      }

      if (emailAmigo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAmigo)) {
        newErrors.emailamigo = "Email inválido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    setSubmitting(true);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbx3tOAQU0Zq6pvalT3G0fblEv26lbwnGTJUyOPEKkhZG9HZ7ICYNMU1t25SQPwOct4m/exec", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // Mostra mensagem de sucesso
      setShowSuccess(true);

      // Reset após 3s
      setTimeout(() => {
        setFormData({
          nome: "",
          email: "",
          empresa: "",
          interesses: [],
          indicacao: "",
          contato: "",
          emailamigo: ""
        });
        setStep(1);
        setModoFormulario(false);
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setErrors({ submit: "Erro ao enviar. Tente novamente." });
    } finally {
      setSubmitting(false);
    }
  };

  const getStepProgress = () => {
    return (step / 4) * 100;
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
              <img src={logoFuzhu} alt="Fuzhu Contabilidade" />
            </div>
          </div>

          <AnimatePresence mode="wait">

            {/* ================= LANDING ================= */}
            {!modoFormulario ? (
              <motion.div
                key="landing"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="ticket-title">
                  <h1>INDIQUE E GANHE</h1>
                </div>

                <div className="info-box">
                  <p>
                    É muito simples, basta indicar uma ou mais empresas.
                    Ele efetivando com a Domingos, o primeiro honorário que ele pagar é <strong>SEU!</strong>
                  </p>
                </div>

                <button
                  className="cta-button"
                  onClick={() => setModoFormulario(true)}
                >
                  <span>INDIQUE AGORA</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="ticket-footer">
                  <p>
                    Ah! E não esqueça de pedir para ele avisar que foi você que nos indicou!
                  </p>
                </div>
              </motion.div>
            ) : (

              /* ================= FORM ================= */
              <div className="split-area">

                {/* LADO ESQUERDO (FIXO) */}
                <div className="split-left">
                  <h2>Programa Cliente Parceiro 🤝</h2>
                  <span className="sub-highlight">Etapa {step} de 4</span>

                  {/* Barra de progresso */}
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${getStepProgress()}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

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
                    onClick={() => {
                      if (step === 1) setModoFormulario(false);
                      else prevStep();
                    }}
                  >
                    ← Voltar
                  </button>
                </div>

                {/* LADO DIREITO */}
                <div className="split-right">
                  <form className="simple-form" onSubmit={handleSubmit}>

                    {/* CONTEÚDO FIXO */}
                    <div className="form-content">

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.35 }}
                        >

                          {/* ETAPA 1 */}
                          {step === 1 && (
                            <>
                              <div className="input-group">
                                <input
                                  type="text"
                                  placeholder="Seu nome completo"
                                  value={formData.nome}
                                  onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, nome: e.target.value }));
                                    if (errors.nome) setErrors(prev => ({ ...prev, nome: null }));
                                  }}
                                  className={errors.nome ? "error" : ""}
                                />
                                {errors.nome && <span className="error-message">{errors.nome}</span>}
                              </div>

                              <div className="input-group">
                                <input
                                  type="email"
                                  placeholder="Seu melhor email"
                                  value={formData.email}
                                  onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                                    if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                                  }}
                                  className={errors.email ? "error" : ""}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                              </div>

                              <div className="input-group">
                                <input
                                  type="text"
                                  placeholder="Sua Empresa"
                                  value={formData.empresa}
                                  onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, empresa: e.target.value }));
                                    if (errors.empresa) setErrors(prev => ({ ...prev, empresa: null }));
                                  }}
                                  className={errors.empresa ? "error" : ""}
                                />
                                {errors.empresa && <span className="error-message">{errors.empresa}</span>}
                              </div>
                            </>
                          )}

                          {/* ETAPA 2 */}
                          {step === 2 && (
                            <>
                              <p className="step-title">Quais serviços você ou seu indicado tem interesse?</p>
                              {errors.interesses && <span className="error-message centered">{errors.interesses}</span>}

                              <div className="checkbox-group">
                                {servicos.map((item) => {
                                  const ativo = formData.interesses.includes(item);

                                  return (
                                    <div
                                      key={item}
                                      className={`checkbox-item ${ativo ? "active" : ""}`}
                                      onClick={() => {
                                        if (ativo) {
                                          setFormData((prev) => ({
                                            ...prev,
                                            interesses: prev.interesses.filter(i => i !== item),
                                          }));
                                        } else {
                                          setFormData((prev) => ({
                                            ...prev,
                                            interesses: [...prev.interesses, item],
                                          }));
                                        }
                                        if (errors.interesses) setErrors(prev => ({ ...prev, interesses: null }));
                                      }}
                                    >
                                      <input type="checkbox" checked={ativo} readOnly />
                                      <span>{item}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}

                          {/* ETAPA 3 */}
                          {step === 3 && (
                            <div className="input-group">
                              <input
                                type="text"
                                placeholder="Nome completo da pessoa indicada"
                                value={formData.indicacao}
                                onChange={(e) => {
                                  setFormData((prev) => ({ ...prev, indicacao: e.target.value }));
                                  if (errors.indicacao) setErrors(prev => ({ ...prev, indicacao: null }));
                                }}
                                className={errors.indicacao ? "error" : ""}
                              />
                              {errors.indicacao && <span className="error-message">{errors.indicacao}</span>}
                            </div>
                          )}

                          {/* ETAPA 4 */}
                          {step === 4 && (
                            <>
                              {(errors.contato || errors.emailamigo) && (
                                <span className="error-message centered">
                                  Informe pelo menos o <strong>Telefone</strong> ou o <strong>E-mail</strong> do amigo
                                </span>
                              )}
                              <div className="input-group">
                                <input
                                  type="tel"
                                  placeholder="Telefone ou WhatsApp (com DDD)"
                                  value={formData.contato}
                                  onChange={(e) => {
                                    const formatted = formatPhone(e.target.value);

                                    setFormData((prev) => ({ ...prev, contato: formatted }));

                                    if (errors.contato) {
                                      setErrors(prev => ({ ...prev, contato: null }));
                                    }
                                  }}
                                />
                              </div>

                              <div className="input-group">
                                <input
                                  type="email"
                                  placeholder="Email do amigo"
                                  value={formData.emailamigo}
                                  onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, emailamigo: e.target.value }));
                                    if (errors.emailamigo) setErrors(prev => ({ ...prev, emailamigo: null }));
                                  }}
                                />
                              </div>

                              <AnimatePresence>
                                {showSuccess && (
                                  <motion.div
                                    className="success-message"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                  >
                                    ✓ Indicação enviada com sucesso!
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          )}

                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* BOTÃO FIXO */}
                    <button
                      className="cta-button submit-btn"
                      type={step === 4 ? "submit" : "button"}
                      disabled={submitting}
                      onClick={() => {
                        if (step < 4) nextStep();
                      }}
                    >
                      <span className="btn-content">
                        {submitting ? (
                          <>
                            <span className="spinner"></span>
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <span>{step === 4 ? "Enviar Indicação" : "Próximo"}</span>
                            <svg
                              className="icon"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M3.714 3.048l18 8.5-18 8.5 2.843-7.627a2 2 0 0 0 0-1.396z" />
                              <path d="M6 12h16" />
                            </svg>
                          </>
                        )}
                      </span>
                    </button>

                  </form>
                </div>

                {/* MOBILE BACK */}
                <button
                  className="voltar-btn mobile"
                  onClick={() => {
                    if (step === 1) setModoFormulario(false);
                    else prevStep();
                  }}
                >
                  ← Voltar
                </button>

              </div>
            )}

          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
