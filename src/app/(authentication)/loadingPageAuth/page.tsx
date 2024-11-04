'use client'
import '@/styles/loadginPage.css'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LoadingPage = () => {
  const router = useRouter()

  useEffect(() => {
    const sendTokenToBackend = async () => {
      const axios = (await import('axios')).default
      const Cookies = (await import('js-cookie')).default
      try {
        const session: Session | null = await getSession()
        if (session) {
          const googleIdToken = session.id_token;

          const backendResponse = await axios.post('http://localhost:5189/api/Auth/login', {
            tokenId: googleIdToken
          })

          const tokenUserInfo = backendResponse.data.token
          Cookies.set('tokenUserInfo', tokenUserInfo)
          router.push('/dashboard')
        } else {
          console.error('Usuário não autenticado.')
        }
      } catch (error) {
        console.error('Erro ao enviar token para o backend:', error)
      }
    };

    if (typeof window !== 'undefined') {
      sendTokenToBackend()
    }
  }, [])

  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Aguarde enquanto estamos processando sua autenticação...</p>
    </div>
  );
};

export default LoadingPage;
