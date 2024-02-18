import { useState } from "react";
import { UserProps, useAuth } from "../../provider/authProvider";
import httpClient from "../../utils/httpClient";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

type LoginResponse = {
  user: {
    data: {
      attributes: UserProps;
    }
  }
}

const LoginForm = () => {
  const { handleLogin, handleLogout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const params = { user: { email, password } };
    httpClient.post('/api/login', params)
      .then((response: AxiosResponse<LoginResponse>) => {
        localStorage.setItem('token', response.headers.getAuthorization());
        handleLogin(response.data.user.data.attributes);
        navigate('/quotes');
      })
      .catch((_error) => {
        handleLogout();
      });
  }

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="button" onClick={handleSubmit}>Login</button>
    </form>
  );
}
const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}

export default Login;
