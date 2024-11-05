import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
            <h2>Não Encontrado</h2>
            <p>Não foi possível encontrar o recurso solicitado</p>
            <Link href="/dashboard">
                Retorne para a Home
            </Link>
        </div>
    );
}
