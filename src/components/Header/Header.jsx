'use client'

import logo from '@/assets/img/PortoDigital_2019.png';
import logoSmall from '@/assets/img/transferir.jpeg';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [user, setUser] = useState();
  const [userResponseBackend, setUserResponseBackend] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controle do dropdown

  useEffect(() => {
    const fetchDataUser = async () => {
      const session = await getSession();
      setUser(session?.user);
      const tokenUser = Cookies.get("tokenUserInfo");
      const tokenDecoded = jwtDecode(tokenUser);
      const objectAccess = JSON.parse(tokenDecoded.acesso);
      const perfil = objectAccess.perfils[0];
      setUserResponseBackend(perfil);
    };
    fetchDataUser();
  }, []);

  // Função para alternar a sidebar
  const handleSidebar = () => {
    if (typeof window !== 'undefined') {
      document.body.classList.toggle("mini-sidebar");
    }
  };

  // Função para alternar o menu mobile
  const handleSidebarMobileMenu = () => {
    if (typeof window !== 'undefined') {
      document.body.classList.toggle('slide-nav');
    }
  };

  // Limpar todos os cookies
  const clearAllCookies = () => {
    const cookieKeys = Object.keys(Cookies.get());
    cookieKeys.forEach((cookieKey) => {
      Cookies.remove(cookieKey);
    });
    setIsDropdownOpen(false); // Fecha o dropdown após logout
  };

  // Função para alternar o dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Alterna o estado do dropdown
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link href="#" className="logo">
            <Image src={logo} alt="Logo" />
          </Link>
          <Link href="#" className="logo logo-small">
            <Image src={logoSmall} alt="Logo" width={100} height={100} />
          </Link>
        </div>

        <div className="menu-toggle">
          <Link href="#" id="toggle_btn" onClick={handleSidebar}>
            <i className="fas fa-bars" />
          </Link>
        </div>

        <div className="top-nav-search">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <button className="btn" type="submit">
              <i className="fas fa-search" />
            </button>
          </form>
        </div>

        {/* Botão do menu mobile */}
        <Link href="#" className="mobile_btn" id="mobile_btn" onClick={handleSidebarMobileMenu}>
          <i className="fas fa-bars" />
        </Link>

        <ul className="nav user-menu">
          <li className="nav-item dropdown has-arrow new-user-menus custom-dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle nav-link">
              <span className="user-img">
                <Image
                  className="rounded-circle"
                  width={31}
                  height={31}
                  alt='Usuário'
                  src={user?.image || logoSmall}
                />
                <div className="user-text">
                  <h6>{user?.name}</h6>
                  <p className="text-muted mb-0">{userResponseBackend}</p>
                </div>
              </span>
            </button>
            <div className={`dropdown-menu ${isDropdownOpen ? 'visible' : ''}`}>
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <Image
                    className="rounded-circle"
                    width={31}
                    height={31}
                    alt='Usuário'
                    src={user?.image || logoSmall}
                  />
                </div>
                <div className="user-text">
                  <h6>{user?.name}</h6>
                  <p className="text-muted mb-0">{userResponseBackend}</p>
                </div>
              </div>
              <Link className="dropdown-item" href="/" onClick={clearAllCookies}>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
