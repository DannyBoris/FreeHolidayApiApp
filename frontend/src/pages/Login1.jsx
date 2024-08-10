import { useState } from "react";
import "./login.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(
      "Email:",
      email,
      "Password:",
      password,
      "Remember Me:",
      rememberMe
    );
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-buttons">
        <button type="button" className="social-button apple">
          <img src="/path/to/apple-logo.png" alt="Apple" />
        </button>
        <button type="button" className="social-button google">
          <img src="/path/to/google-logo.png" alt="Google" />
        </button>
        <button type="button" className="social-button twitter">
          <img src="/path/to/twitter-logo.png" alt="Twitter" />
        </button>
      </div>
      <div className="or-divider">OR</div>
      <div className="email-input">
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="password-input">
        {" "}
         
        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="forgot-password">Forgot password?</span>
      </div>
      <div className="remember-me">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label>Remember me</label>
      </div>
      <button type="submit">Sign in</button>
      <div className="signup-link">
        Don't have an account yet? <a href="#">Sign Up</a>
      </div>
    </form>
  );
}

export default LoginForm;
