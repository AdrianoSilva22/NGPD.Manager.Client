'use client';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Link from "next/link";
import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const Sidebar = (props) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const perfilToken = Cookies.get("userProfile");
    if (perfilToken) {
      const perfil = jwtDecode(perfilToken);
      setUserRole(perfil);
    }
  }, []);

  let { location } = props;
  let pathName = location ? location.pathName : '';

  const renderSidebarGerenteAndSuporte = () => (
    <div className="sidebar" id="sidebar">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal
        hideTracksWhenNotNeeded
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>NGPD Menu</span>
              </li>
              <li className={`${"/empresa" === pathName ? "active" : ""}`}>
                <Link href="/empresa">
                  <i className="fas fa-city" /> <span>Empresas</span>
                </Link>
              </li>
              <li className={`${"/instituicao" === pathName ? "active" : ""}`}>
                <Link href="/instituicao">
                  <i className="fas fa-university" /> <span>Instituições</span>
                </Link>
              </li>
              <li className={`${"/instituicao/turma" === pathName ? "active" : ""}`}>
                <Link href="/instituicao/turma">
                  <i className="fa-solid fa-book-open-reader" /> <span>Turmas</span>
                </Link>
              </li>
              <li className={`${"/squad" === pathName ? "active" : ""}`}>
                <Link href="/squad">
                  <i className="fas fa-users" /> <span>Squads</span>
                </Link>
              </li>
              <li className={`${"/mentor" === pathName ? "active" : ""}`}>
                <Link href="/mentor">
                  <i className="fas fa-user fa-md" /> <span>Mentores</span>
                </Link>
              </li>
              <li className={`${"/user" === pathName ? "active" : ""}`}>
                <Link href="/user">
                  <i className="fas fa-user-plus fa-md" /> <span>Funcionários</span>
                </Link>
              </li>
              <li className={`${"/sobre" === pathName ? "active" : ""}`}>
                <Link href="/sobre">
                  <i className="fa-solid fa-eye" /> <span>Sobre Nós</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  );

  const renderSidebarMentor = () => (
    <div className="sidebar" id="sidebar">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal
        hideTracksWhenNotNeeded
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>NGPD Menu</span>
              </li>
              <li className={`${"/squad" === pathName ? "active" : ""}`}>
                <Link href="/squad">
                  <i className="fas fa-users" /> <span>Squad</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  );

  return (
    <div>
      {userRole === 'gerente' || userRole === 'Suporte' ? (
        renderSidebarGerenteAndSuporte()
      ) : userRole === 'mentor' ? (
        renderSidebarMentor()
      ) : (
        ''
      )}
    </div>
  );
};

export default Sidebar;
