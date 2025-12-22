import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <h3>Task Manager</h3>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
