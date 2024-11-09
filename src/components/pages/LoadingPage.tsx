'use client'
import { TokenDecoded } from '@/models/tokenDecoded'
import '@/styles/loadginPage.css'
import { jwtDecode } from 'jwt-decode'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import jwtEncode from 'jwt-encode'

const LoadingPage = () => {
  const router = useRouter()

  useEffect(() => {
    const sendTokenToBackend = async () => {
      const axios = (await import('axios')).default
      const Cookies = (await import('js-cookie')).default

      try {
        const session: Session | null = await getSession()
        if (session) {
          const googleIdToken = session.id_token

          const backendResponse = await axios.post('http://localhost:5189/api/Auth/login', {
            tokenId: googleIdToken
          })

          const tokenUserInfo = backendResponse.data.token
          Cookies.set('tokenUserInfo', tokenUserInfo)

          if (tokenUserInfo) {
            const tokenDecoded = jwtDecode(tokenUserInfo) as TokenDecoded

            const profiles = Object.keys(tokenDecoded).filter((key) => {
              try {
                const permissions = JSON.parse(tokenDecoded[key]);
                return Array.isArray(permissions);
              } catch (error) {
                return false;
              }
            });

            if (profiles.length > 1) {
              router.push('/profileSelection');
            } else if (profiles.length === 1 && tokenDecoded[profiles[0]] && JSON.parse(tokenDecoded[profiles[0]]).length > 0) {
              const encodedProfile = jwtEncode(profiles[0], 'a8f9s0fj0sdfff0s9fj#');
              Cookies.set('userProfile', encodedProfile);
              router.push('/dashboard');
            } else {
              router.push('/login');
            }
          } else {
            router.push('/login');
          }
        } else {
          console.error('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao enviar token para o backend:', error);
      }
    };

    if (typeof window !== 'undefined') {
      sendTokenToBackend();
    }
  }, []);

  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Aguarde enquanto estamos processando sua autenticação...</p>
    </div>
  );
};

export default LoadingPage;
