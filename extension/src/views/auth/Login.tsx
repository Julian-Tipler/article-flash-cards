import "./Login.css";

export const Login = () => {
  const webAuthUrl = import.meta.env.VITE_WEB_URL;
  return (
    <div className="wise-login-container">
      <div
        style={{
          width: "25px",
          height: "25px",
          backgroundImage: `url(${chrome.runtime.getURL("assets/icon.png")})`,
          backgroundSize: "cover",
        }}
      ></div>
      <p className="wise-login-text">Thank you for using this extension!</p>
      <a href={webAuthUrl} target="_blank" rel="noopener">
        <button className="submit-button">Login Here</button>
      </a>
    </div>
  );
};
