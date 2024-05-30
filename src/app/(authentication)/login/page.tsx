'use client'
import { Session as NextAuthSession } from "next-auth";

interface Session extends NextAuthSession {
  id_token: string;
}

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Login() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/loadingPageAuth' })
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
      {isClient && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="text-center mb-4">
                    <h1>Acesse com o Google</h1>
                  </div>
                  <button className="btn-google btn btn-block" onClick={handleLogin}>
                    Acesse com o Google
                  </button>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            .btn-google {
              background-color: #4285F4;
              color: #fff;
              border: none;
              border-radius: 4px;
              padding: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }

            .btn-google:hover {
              background-color: #357ae8;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
