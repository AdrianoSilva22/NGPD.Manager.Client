'use client'
import Sidebar from "@/Sidebar/SideBar";
import Header from "@/components/Header/Header";

export default function Dashboard() {
    return (
        <div className="container mt-5 pt-5">
            <Header />
            <Sidebar />
            <div className="row">
                <div className="col">
                    <h1 className="text-center">Olá Thiago, Seja Bem-vindo!</h1>
                    <p className="text-center">Aqui está um resumo do seu dashboard.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Card 1</h5>
                            <p className="card-text">Informações relevantes do Card 1.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Card 2</h5>
                            <p className="card-text">Informações relevantes do Card 2.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Card 3</h5>
                            <p className="card-text">Informações relevantes do Card 3.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
