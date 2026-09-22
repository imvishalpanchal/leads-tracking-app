import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Layout';
import { TOASTER_OPTIONS } from './utils/constants';
import AppRoutes from './components/Routes';

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      <div className={isLoginPage ? "login-container" : "app-container"}>
        {!isLoginPage && <Header />}
        <main>
          <AppRoutes />
        </main>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        toastOptions={TOASTER_OPTIONS}
      />
    </>
  );
};

export default App;
