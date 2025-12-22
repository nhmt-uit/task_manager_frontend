const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <h3>Task Manager</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;