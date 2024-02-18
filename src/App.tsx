import RouteList from './RouteList'
import './App.scss'
import { useAuth } from './provider/authProvider'
import { Link } from 'react-router-dom';
import httpClient from './utils/httpClient';

function App() {
  const { currentUser, isLogin } = useAuth();
  const handleLogoutClick = () => {
    const token = localStorage.getItem('token');
    httpClient.delete('/api/logout', { withCredentials: true, headers: { Authorization: token } })
  }

  return (
    <>
      <header className="navbar">
        <div className="navbar__brand">
          dthtien
        </div>
        {
          isLogin && currentUser && (
            <>
              <div className="navbar__name">
                {currentUser.name}
              </div>
              <a onClick={handleLogoutClick} className="btn btn--dark">
                Sign out
              </a>
            </>
          )
        }

        {
          !isLogin && (
            <Link to="/login" className="btn btn--dark navbar__right">
              Sign in
            </Link>
          )
        }
      </header>
      <RouteList />
    </>
  )
}

export default App
