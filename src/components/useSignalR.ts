import { useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

export default function useSignalR() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const createConnection = () => {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5189/squadhub")  // Defina a URL do seu hub SignalR no backend
        .build();

      connection
        .start()
        .then(() => {
          console.log("Conexão estabelecida com SignalR");
          setIsConnected(true);
        })
        .catch((err) => console.log("Erro ao conectar-se ao SignalR:", err));

      // Defina os eventos que o frontend irá escutar
      connection.on("SquadAssigned", (squadId, mentorId) => {
        // Atualize os dados locais conforme necessário
        console.log(`Squad ${squadId} foi alocado ao mentor ${mentorId}`);
      });

      connection.on("MentorUnassigned", (squadId, mentorId) => {
        // Atualize os dados locais conforme necessário
        console.log(`Mentor foi desalocado da Squad ${squadId} ${mentorId}`);
      });

      setConnection(connection);
    };

    createConnection();

    return () => {
      connection?.stop();
      setIsConnected(false);
    };
  }, []);

  return { connection, isConnected };
}
