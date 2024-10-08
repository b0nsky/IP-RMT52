import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosInstance from "../axios/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance({
        url: '/login',
        method: 'POST',
        data: { email, password }
      });

      localStorage.setItem('access_token', response.data.access_token);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Login',
      })
      navigate('/homepage');
      
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Login',
        text: `${err.response?.data?.error || err.message}`
      });
    }
  };

  async function handleCredentialResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential)
    const { data } = await axiosInstance.post("/login/google", {
      googleToken: response.credential
    });
    localStorage.setItem('access_token', data.access_token);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Login',
      })
      navigate('/homepage');
  }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "365803712182-fo7h02d63notgmfutrtr8qnqh9j3hi6p.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
    }, [])

  return (
    <div className="login-container">
      <div className="col-md-6 login-left">
        <img
          src="https://cdn.you.com/youagent-images/dalle3/db70868d-f961-4162-87f2-4a3c872c12d0.png"
          alt="8Entertainment Logo"
          className="login-logo"
        />
      </div>
      <div className="col-md-6 login-right">
        <div className="container">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <div className="mb-2">or</div>
            <div id="buttonDiv"></div>
          </div>
          <div className="text-center mt-3">
            <p>Don't have account?</p>
            <a href="/new-user" className="btn btn-warning">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
