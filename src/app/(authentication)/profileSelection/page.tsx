"use client";

import { Button, Card, Typography, Space, Row, Col } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export default function ProfileSelection() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const router = useRouter()

  const profiles = ['Gerente', 'Mentor', 'Usuário'];

  const handleProfileSelection = (profile: string) => {
    setSelectedProfile(profile);
    // Simulação do envio do perfil ao backend
    console.log('Perfil selecionado:', profile);
  };

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
