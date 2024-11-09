"use client";

import { Button, Card, Typography, Space, Row, Col } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import jwtEncode from 'jwt-encode'
import { TokenDecoded } from '@/models/tokenDecoded';

const { Title, Text } = Typography;

export default function ProfileSelection() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<string[]>([])

  const router = useRouter()

  useEffect(() => {
    const tokenUser = Cookies.get("tokenUserInfo") as string
    const tokenDecoded = jwtDecode(tokenUser) as TokenDecoded
    const profilesDynamic = Object.keys(tokenDecoded).filter((key) => {
      try {
        const permissions = JSON.parse(tokenDecoded[key]);
        return Array.isArray(permissions);
      } catch (error) {
        return false;
      }
    });
    setProfiles(profilesDynamic)
  }, [])

  useEffect(() => {
    if (!selectedProfile) {
      return;
    }

    try {
      const encodedProfile = jwtEncode(selectedProfile, 'a8f9s0fj0sdfff0s9fj#')
      console.log(selectedProfile);

      Cookies.set('userProfile', encodedProfile)
      router.push('/dashboard')

    } catch (error) {
      console.error('Erro ao salvar o perfil no cookie:', error)
    }
  }, [selectedProfile]);

  const handleProfileSelection = (profile: string) => {
    setSelectedProfile(profile)
  }

  const handleLogout = () => {
    router.push('/login')
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light position-relative">
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        className="position-absolute top-0 end-0 m-3"
        title="Sair"
      />
      <Card className="shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
        <Title level={3} className="text-center">Escolha seu Perfil</Title>
        <Text className="text-muted text-center d-block mb-4">
          Selecione o perfil que deseja utilizar no momento
        </Text>

        <Space direction="vertical" className="w-100">

          {profiles.map((profile) => (
            <Button
              key={profile}
              type="primary"
              block
              className={`mb-2 ${selectedProfile === profile ? 'active' : ''}`}
              onClick={() => handleProfileSelection(profile)}
            >
              {profile}
            </Button>
          ))}
        </Space>

        {selectedProfile && (
          <div className="text-center mt-4">
            <Text strong>Perfil selecionado:</Text> <Text>{selectedProfile}</Text>
          </div>
        )}
      </Card>
    </div>
  );
}
