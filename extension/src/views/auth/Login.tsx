import "./Login.css";

export const Login = () => {
  const webAuthUrl = import.meta.env.VITE_WEB_URL + "/login";
  return (
    <div className="login-container">
      <p>Login here: No credit card required!</p>
      <a href={webAuthUrl} target="_blank" rel="noopener">
        <button className="submit-button">Login Here</button>
      </a>
    </div>
  );
};
