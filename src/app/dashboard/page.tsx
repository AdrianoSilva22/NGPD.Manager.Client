'use client'
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/SideBar";
import { User } from "@/models/user";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState<User>()
    useEffect(() => {
        const fetchDaraUser = async () => {
            const session: Session | null = await getSession()
            setUser(session?.user)
        }
        fetchDaraUser()
    }, []);

    return (
        <div className="container mt-5 pt-5">
            <Header />
            <Sidebar />
            <div className="row">
                <div className="col">
                    <h1 className="text-center">Olá {user?.name}, Seja Bem-vindo!</h1>
                    <p className="text-center"> Núcleo de Gestão do Porto Digital.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            <p className="card-text">...</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            <p className="card-text">...</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            <p className="card-text">...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
