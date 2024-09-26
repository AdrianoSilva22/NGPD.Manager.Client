'use client'
import { UserSession } from "@/models/UserSession";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState<UserSession>()
    useEffect(() => {
        const fetchDaraUser = async () => {
            const session: Session | null = await getSession()
            setUser(session?.user)
        }
        fetchDaraUser()
    }, []);

    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col">
                    <h1 className="text-center">Olá {user?.name}, Seja Bem-vindo!</h1>
                    <p className="text-center"> Núcleo de Gestão do Porto Digital.</p>
                </div>
            </div>
        
            </div>
    
    );

}
