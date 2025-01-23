import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/authSlice';
import toast from 'react-hot-toast';

const Auth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = () => {
    dispatch(login());
    toast.success("User Logged in")
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("User Logged Out")
  };

  return (
    <div className="auth-buttons flex justify-end  mt-10">
      {isAuthenticated ? (
        <button className='border rounded-full p-3 text-2xl bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-all cursor-pointer px-15 ' onClick={handleLogout}>Logout</button>
      ) : (
        <button className='border rounded-full p-3 text-2xl bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-all cursor-pointer px-15 ' onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Auth;
