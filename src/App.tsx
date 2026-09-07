import React, { useState } from "react";

export default function App() {
  const [attempts, setAttempts] = useState(0);
  const [accepted, setAccepted] = useState(false);

  // O botão NÃO começa ao lado do SIM
  const [noPosition, setNoPosition] = useState({
    left: "calc(50% + 55px)",
    top: "calc(50% + 95px)",
  });

  const messages = [
    "NÃO",
    "Tem certeza?",
    "Pensa melhor 😭",
    "Não vale fugir!",
    "Sério isso? 🥺",
    "Olha o SIM ali 👀",
    "Você não vai escapar! 😂",
    "Última chance! ❤️",
    "Aceita logo! 😭💕",
  ];

  /*
   * Move o botão NÃO somente quando ele é clicado.
   */
  const moveNoButton = () => {
    const nextAttempt = attempts + 1;

    setAttempts(nextAttempt);

    // Tamanho aproximado do botão
    const buttonWidth = Math.max(
      60,
      100 - nextAttempt * 6
    );

    const buttonHeight = Math.max(
      38,
      44 - nextAttempt * 2
    );

    // Margem mínima da tela
    const padding = 16;

    const maxX =
      window.innerWidth -
      buttonWidth -
      padding;

    const maxY =
      window.innerHeight -
      buttonHeight -
      padding;

    // Nova posição aleatória
    const x =
      padding +
      Math.random() *
        Math.max(0, maxX - padding);

    const y =
      padding +
      Math.random() *
        Math.max(0, maxY - padding);

    setNoPosition({
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  /*
   * Texto atual do botão NÃO
   */
  const noText =
    messages[
      Math.min(
        attempts,
        messages.length - 1
      )
    ];

  /*
   * SIM começa pequeno e cresce
   * a cada tentativa de clicar no NÃO.
   *
   * 0 tentativas = 0.75
   * 1 tentativa  = 0.87
   * 2 tentativas = 0.99
   * ...
   */
  const yesScale = Math.min(
    0.75 + attempts * 0.12,
    1.7
  );



  /*
   * =====================================================
   * TELA FINAL
   * =====================================================
   */

  if (accepted) {
    return (
      <div style={styles.page}>
        <style>{globalCSS}</style>

        <div
          style={{
            ...styles.decorativeHeart,
            top: "8%",
            left: "10%",
          }}
        >
          💕
        </div>

        <div
          style={{
            ...styles.decorativeHeart,
            top: "15%",
            right: "10%",
          }}
        >
          💗
        </div>

        <div
          style={{
            ...styles.decorativeHeart,
            bottom: "15%",
            left: "12%",
          }}
        >
          💖
        </div>

        <div
          style={{
            ...styles.decorativeHeart,
            bottom: "10%",
            right: "12%",
          }}
        >
          💕
        </div>

        <div style={styles.card}>
          <div style={styles.finalHeart}>
            ❤️
          </div>

          <h1 style={styles.title}>
            EU SABIA! 🥰
          </h1>

          <p style={styles.subtitle}>
            Gabriele, você acaba de deixar
            <br />
            alguém muito feliz! ❤️
          </p>

          <div style={styles.finalEmojis}>
            ✨ 💕 ✨
          </div>
        </div>
      </div>
    );
  }

  /*
   * =====================================================
   * TELA PRINCIPAL
   * =====================================================
   */

  return (
    <div style={styles.page}>
      <style>{globalCSS}</style>

      {/* Corações decorativos */}

      <div
        style={{
          ...styles.decorativeHeart,
          top: "8%",
          left: "10%",
        }}
      >
        💕
      </div>

      <div
        style={{
          ...styles.decorativeHeart,
          top: "15%",
          right: "10%",
        }}
      >
        💗
      </div>

      <div
        style={{
          ...styles.decorativeHeart,
          bottom: "15%",
          left: "12%",
        }}
      >
        💖
      </div>

      <div
        style={{
          ...styles.decorativeHeart,
          bottom: "10%",
          right: "12%",
        }}
      >
        💕
      </div>

      {/* CARD */}

      <div style={styles.card}>
        <div style={styles.heart}>
          ❤️
        </div>

        <h1 style={styles.title}>
          Gabriele, aceita
          <br />
          namorar comigo?
        </h1>

        <p style={styles.subtitle}>
          {attempts === 0 && (
            <>Pense com carinho... 💕</>
          )}

          {attempts === 1 && (
            <>
              Hmm... você realmente clicou
              no NÃO? 😂
            </>
          )}

          {attempts === 2 && (
            <>
              Acho que você não entendeu
              a pergunta... 🥺
            </>
          )}

          {attempts >= 3 && (
            <>
              Você já tentou dizer não{" "}
              <strong>{attempts}</strong>{" "}
              vezes... 😂
            </>
          )}
        </p>

        {/* 
          CONTÊINER DOS BOTÕES

          O SIM e o NÃO começam juntos aqui.
          Depois que o NÃO é clicado, ele sai
          deste espaço e passa a ficar pela tela.
        */}

        <div style={styles.buttonsContainer}>
          {/* SIM */}

          <button
            type="button"
            onClick={() => setAccepted(true)}
            style={{
              ...styles.yesButton,
              transform: `scale(${yesScale})`,
            }}
          >
            SIM ❤️
          </button>

          {/* 
            Espaço reservado para o NÃO
            somente na posição inicial.
          */}

          {attempts === 0 && (
            <button
              type="button"
              onClick={moveNoButton}
              style={{
                ...styles.initialNoButton,
              }}
            >
              {noText}
            </button>
          )}
        </div>
      </div>

      {/* 
        Depois do primeiro clique,
        o NÃO passa a ser FIXED e
        pode fugir pela tela.
      */}

      {attempts > 0 && (
        <button
          type="button"
          onClick={moveNoButton}
          style={{
            ...styles.noButton,
            left: noPosition.left,
            top: noPosition.top,
          }}
        >
          {noText}
        </button>
      )}

      {/* Contador */}

      {attempts >= 3 && (
        <div style={styles.counter}>
          Tentativas de NÃO: {attempts}
        </div>
      )}
    </div>
  );
}

/*
 * =======================================================
 * ESTILOS
 * =======================================================
 */

const styles: Record<
  string,
  React.CSSProperties
> = {
  page: {
    width: "100%",
    height: "100dvh",
    minHeight: "100svh",

    position: "relative",

    overflow: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "16px",

    boxSizing: "border-box",

    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",

    background:
      "radial-gradient(circle at 20% 10%, #ffb3c6 0%, transparent 35%), radial-gradient(circle at 80% 90%, #b8a0ff 0%, transparent 35%), linear-gradient(135deg, #ff758c 0%, #ff7eb3 45%, #9b8de5 100%)",

    WebkitTapHighlightColor:
      "transparent",

    userSelect: "none",
  },

  card: {
    width: "100%",

    maxWidth: "560px",

    padding:
      "clamp(32px, 8vw, 55px) 22px",

    boxSizing: "border-box",

    borderRadius: "30px",

    textAlign: "center",

    position: "relative",

    zIndex: 2,

    background:
      "rgba(255, 255, 255, 0.20)",

    border:
      "1px solid rgba(255,255,255,0.45)",

    boxShadow:
      "0 25px 70px rgba(70, 20, 50, 0.25)",

    backdropFilter: "blur(20px)",

    WebkitBackdropFilter:
      "blur(20px)",
  },

  heart: {
    fontSize:
      "clamp(48px, 14vw, 72px)",

    lineHeight: 1,

    marginBottom: "18px",

    filter:
      "drop-shadow(0 8px 15px rgba(0,0,0,0.15))",
  },

  finalHeart: {
    fontSize:
      "clamp(70px, 22vw, 110px)",

    lineHeight: 1,

    marginBottom: "20px",

    animation:
      "heartPulse 1.2s ease-in-out infinite",

    filter:
      "drop-shadow(0 8px 15px rgba(0,0,0,0.15))",
  },

  title: {
    margin: 0,

    color: "#ffffff",

    fontSize:
      "clamp(30px, 8vw, 52px)",

    fontWeight: 800,

    lineHeight: 1.15,

    letterSpacing: "-1.5px",

    textShadow:
      "0 4px 15px rgba(70, 20, 50, 0.25)",
  },

  subtitle: {
    minHeight: "28px",

    margin:
      "20px 0 30px",

    color:
      "rgba(255,255,255,0.94)",

    fontSize:
      "clamp(15px, 4vw, 18px)",

    lineHeight: 1.5,
  },

  /*
   * SIM e NÃO ficam lado a lado
   * inicialmente.
   */

  buttonsContainer: {
    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    gap: "12px",

    minHeight: "55px",

    position: "relative",

    zIndex: 5,
  },

  /*
   * SIM começa pequeno.
   */

  yesButton: {
    minWidth: "92px",

    minHeight: "42px",

    padding:
      "10px 18px",

    border: "none",

    borderRadius: "999px",

    color: "#ffffff",

    background:
      "linear-gradient(135deg, #ff416c, #ff4b2b)",

    boxShadow:
      "0 7px 20px rgba(255, 65, 108, 0.40)",

    fontSize: "15px",

    fontWeight: 800,

    cursor: "pointer",

    transition:
      "transform 0.3s ease",

    touchAction: "manipulation",

    WebkitTapHighlightColor:
      "transparent",

    whiteSpace: "nowrap",
  },

  /*
   * NÃO inicial.
   */

  initialNoButton: {
    minWidth: "92px",

    minHeight: "42px",

    padding:
      "10px 18px",

    border:
      "1px solid rgba(255,255,255,0.8)",

    borderRadius: "999px",

    color: "#ffffff",

    background:
      "rgba(255,255,255,0.16)",

    backdropFilter: "blur(10px)",

    WebkitBackdropFilter:
      "blur(10px)",

    fontSize: "15px",

    fontWeight: 700,

    cursor: "pointer",

    touchAction: "manipulation",

    WebkitTapHighlightColor:
      "transparent",

    whiteSpace: "nowrap",
  },

  /*
   * NÃO depois que começa a fugir.
   */

  noButton: {
    position: "fixed",

    zIndex: 20,

    minHeight: "42px",

    padding:
      "10px 18px",

    border:
      "1px solid rgba(255,255,255,0.85)",

    borderRadius: "999px",

    color: "#ffffff",

    background:
      "rgba(255,255,255,0.16)",

    backdropFilter: "blur(10px)",

    WebkitBackdropFilter:
      "blur(10px)",

    fontSize: "15px",

    fontWeight: 700,

    cursor: "pointer",

    whiteSpace: "nowrap",

    transition:
      "left 0.25s ease, top 0.25s ease, transform 0.25s ease",

    touchAction: "manipulation",

    WebkitTapHighlightColor:
      "transparent",

    boxSizing: "border-box",
  },

  decorativeHeart: {
    position: "absolute",

    zIndex: 1,

    fontSize:
      "clamp(24px, 8vw, 42px)",

    opacity: 0.45,

    pointerEvents: "none",
  },

  counter: {
    position: "fixed",

    bottom: "10px",

    left: "50%",

    transform:
      "translateX(-50%)",

    color:
      "rgba(255,255,255,0.65)",

    fontSize: "11px",

    zIndex: 3,

    whiteSpace: "nowrap",
  },

  finalEmojis: {
    marginTop: "25px",

    fontSize: "28px",
  },
};

/*
 * =======================================================
 * CSS GLOBAL
 * =======================================================
 */

const globalCSS = `
  html,
  body,
  #root {
    margin: 0;
    padding: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }

  button {
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  button:focus {
    outline: none;
  }

  @keyframes heartPulse {
    0%, 100% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.15);
    }
  }
`;
