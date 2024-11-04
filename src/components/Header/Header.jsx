'use client'
import logo from '@/assets/img/PortoDigital_2019.png';
import logoSmall from '@/assets/img/transferir.jpeg';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const Header = () => {

  const [user, setUser] = useState()
  const [userResponseBackend, setUserResponseBackend] = useState()
  useEffect(() => {
    const fetchDaraUser = async () => {
      const session = await getSession()
      setUser(session?.user)
      const tokenUser = Cookies.get("tokenUserInfo")
      const tokenDecoded = jwtDecode(tokenUser)
      const objectAcess = JSON.parse(tokenDecoded.acesso)
      const perfil = objectAcess.perfils[0];
      setUserResponseBackend(perfil)
    }
    fetchDaraUser()
  }, []);

  const handlesidebar = () => {
    if (typeof window !== 'undefined') {
      document.body.classList.toggle("mini-sidebar");
    }
  };
  
  const handlesidebarmobilemenu = () => {
    if (typeof window !== 'undefined') {
      document.body.classList.toggle('slide-nav');
    }
  };
  

  const clearAllCookies = () => {
    const cookieKeys = Object.keys(Cookies.get())
    cookieKeys.forEach((cookieKey) => {
      Cookies.remove(cookieKey)
    })
  }

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
          <Link href="#" id="toggle_btn" onClick={handlesidebar}>
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
        <Link href="#" className="mobile_btn" id="mobile_btn" onClick={() => handlesidebarmobilemenu()}>
          <i className="fas fa-bars" />
        </Link>
        <ul className="nav user-menu">
          <li className="nav-item dropdown has-arrow new-user-menus">
            <Link
              href="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
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
            </Link>
            <div className="dropdown-menu">
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
              <button onClick={clearAllCookies} className="btn btn-link text-decoration-none">
                <Link className="dropdown-item" href="/login">
                  Logout
                </Link>
              </button>

            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header
