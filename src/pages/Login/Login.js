import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import Webcam from "react-webcam";
import "./Login.css";

const slides = [
  {
    title: "DUACODE",
    description: "Programa rookie",
  },
  {
    title: "UX",
    description: "Profesionales en hacértelo más fácil ;)",
  },
  {
    title: "Equipo Rookie </>",
    description: "Martin Ois, Adrian Contreras, Mateo Picatoste",
  },
];

const Login = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTextHidden, setIsTextHidden] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [qrActive, setQrActive] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [socialPopup, setSocialPopup] = useState({ visible: false, type: "" });
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTextHidden(true);
      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        setIsTextHidden(false);
      }, 800);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleQrScan = async () => {
    const codeReader = new BrowserMultiFormatReader();
    const video = webcamRef.current.video;

    try {
      const result = await codeReader.decodeOnceFromVideoElement(video);
      setScannedResult(result.text);
      setQrActive(false);
    } catch (err) {
      console.error("Error al escanear el código QR", err);
    }
  };

  const handleActivateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (stream) {
        setQrActive(true);
      }
    } catch (err) {
      alert("No se pudo activar la cámara. Por favor, verifica tus permisos.");
    }
  };

  const handleSocialLogin = (platform) => {
    if (platform === "Google") {
      window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email profile";
    } else if (platform === "GitHub") {
      window.location.href = "https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user";
    } else {
      setSocialPopup({ visible: true, type: platform });
    }
  };

  const closeSocialPopup = () => {
    setSocialPopup({ visible: false, type: "" });
  };

  return (
    <div className="login-container">
      <div className="slideshow">
        <h2 className={`slideshow-title ${isTextHidden ? "hidden" : ""}`}>
          {slides[currentSlide].title}
        </h2>
        <p className={`slideshow-description ${isTextHidden ? "hidden" : ""}`}>
          {slides[currentSlide].description}
        </p>
      </div>
      <div className="login-form-container">
        <div className="tabs">
          <h3
            className={`tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Iniciar sesión
          </h3>
          <h3
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </h3>
        </div>
        <div className="form-content">
          {isLogin ? (
            <form className="form">
              <input
                type="text"
                placeholder="Correo o Usuario"
                className="form-input"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="form-input"
              />
              <div className="form-remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Recuérdame</label>
              </div>
              <button className="form-button">Iniciar sesión</button>
              <button
                type="button"
                className="form-button qr-button"
                onClick={handleActivateCamera}
              >
                Iniciar sesión con QR
              </button>
              <div className="social-login">
                <button
                  type="button"
                  className="social-button google-button"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <img
                    src="/google-icon.png"
                    alt="Google Icon"
                    className="social-icon"
                  />
                  Iniciar sesión con Google
                </button>
                <button
                  type="button"
                  className="social-button github-button"
                  onClick={() => handleSocialLogin("GitHub")}
                >
                  <img
                    src="/github-icon.png"
                    alt="GitHub Icon"
                    className="social-icon"
                  />
                  Iniciar sesión con GitHub
                </button>
              </div>
              <p className="form-forgot">
                <a href="#forgot">¿Olvidaste tu contraseña?</a>
              </p>
            </form>
          ) : (
            <form className="form">
              <input
                type="email"
                placeholder="Correo"
                className="form-input"
              />
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="form-input"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="form-input"
              />
              <button className="form-button">Registrarse</button>
              <p className="form-terms">
                Al registrarte, aceptas nuestros{" "}
                <a href="#terms">Términos de servicio</a>
              </p>
            </form>
          )}
        </div>
      </div>
      {qrActive && (
        <div className="qr-overlay">
          <div className="qr-scanner-container">
            <Webcam
              ref={webcamRef}
              onUserMedia={handleQrScan}
              audio={false}
              screenshotFormat="image/jpeg"
              style={{ width: "100%", height: "auto" }}
            />
            <button className="form-button" onClick={() => setQrActive(false)}>
              Cerrar escáner
            </button>
            {scannedResult && (
              <p className="scanned-result">
                Resultado escaneado: {scannedResult}
              </p>
            )}
          </div>
        </div>
      )}
      {socialPopup.visible && (
        <div className="social-popup">
          <div className="popup-content">
            <h3>Iniciar sesión con {socialPopup.type}</h3>
            <p>Selecciona tu cuenta para continuar o añade una nueva.</p>
            <button onClick={closeSocialPopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
