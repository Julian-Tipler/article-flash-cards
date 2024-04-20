export const Splash = () => {
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
      <p className="wise-help-text">
        Action button is on the bottom right of the screen.
      </p>
    </div>
  );
};
