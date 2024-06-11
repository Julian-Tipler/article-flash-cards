export const Splash = () => {
  const mainPageLink = import.meta.env.VITE_WEB_URL as string;
  return (
    <div className="wise-login-container">
      <div
        style={{
          width: "25px",
          height: "25px",
          backgroundImage: `url(${chrome.runtime.getURL("icon-lg.png")})`,
          backgroundSize: "cover",
        }}
      ></div>
      <p className="wise-login-text">Thank you for using this extension!</p>
      <p className="wise-help-text">
        Click the action button at the bottom right of the screen to create your flashcards!
      </p>
      <a href={mainPageLink} target="_blank" className="wise-help-link">
        Main page
      </a>
    </div>
  );
};