'use client'
import NGPD from '@/assets/img/login-ngpd-logo.png';
import { Session as NextAuthSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

interface Session extends NextAuthSession {
  id_token: string;
}

export default function Login() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/loadingPageAuth' });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
      {isClient && (
        <div className="main-wrapper login-body">
          <div className="login-wrapper">
            <div className="container">
              <div className="loginbox">
                <div className="login-right">
                  <div className="login-right-wrap">
                    <h1 style={{ whiteSpace: "nowrap" }}>Bem-vindo ao Sistema NGPD!</h1>
                    <p className="account-subtitle">
                      Olá! Para ter acesso aos nossos diversos recursos, você terá que logar pelo Google. Clique no botão abaixo para fazer o login.
                    </p>

                    {/* Form */}
                    <form>
                      <div className="form-group">
                        <button
                          className="btn btn-primary btn-block"
                          type="button"
                          onClick={handleLogin}>
                          <FaGoogle style={{ marginRight: "10px" }} /> Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="login-left">
                  <img
                    src={NGPD.src}
                    alt="NGPD Logo"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
