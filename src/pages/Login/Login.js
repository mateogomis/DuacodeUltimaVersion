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
    description: "Profesionales en hacertelo mas facil ;)",
  },

  {
    title: "Equipo Rookie </>",
    description: "  Martin Ois, Adrian Contreras, Mateo Picatoste",
  },
];

const Login = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTextHidden, setIsTextHidden] = useState(false); // Estado para ocultar texto durante la transición
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
  const [qrActive, setQrActive] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTextHidden(true); // Oculta el texto actual
      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        setIsTextHidden(false); // Muestra el texto siguiente
      }, 800); // Tiempo sincronizado con la transición CSS
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
      const confirm = window.confirm(
        "Se requiere acceso a la cámara para usar esta función. ¿Quieres permitir el acceso?"
      );
      if (confirm) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (stream) {
            setQrActive(true);
          }
        } catch (err) {
          alert(
            "No se pudo activar la cámara. Por favor, verifica tus permisos."
          );
        }
      } else {
        alert("No se otorgó acceso a la cámara.");
      }
    }
  };

  const handleGoogleLogin = () => {
    alert("Iniciar sesión con Google: Redirigiendo...");
    // Aquí puedes implementar lógica para iniciar sesión con Google
    // como integrar Firebase, Auth0 o cualquier API relacionada.
  };

  const handleGitHubLogin = () => {
    alert("Iniciar sesión con GitHub: Redirigiendo...");
    // Aquí puedes implementar lógica para iniciar sesión con GitHub
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
                <div
                  className="social-button google-button"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="/IconoGoogle.png"
                    alt="Icono Google"
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
                <div
                  className="social-button github-button"
                  onClick={handleGitHubLogin}
                >
                  <img
                    src="/IconoGit.png"
                    alt="Icono GitHub"
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
              </div>
              <p className="form-forgot">
                <a href="#forgot">¿Olvidaste tu contraseña?</a>
              </p>
            </form>
          ) : (
            <form className="form">
              <input type="email" placeholder="Correo" className="form-input" />
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
    </div>
  );
};

export default Login;
