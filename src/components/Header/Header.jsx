'use client'

import logo from '@/assets/img/PortoDigital_2019.png'
import logoSmall from '@/assets/img/transferir.jpeg'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Select } from 'antd';
import { useRouter } from 'next/navigation'
import jwtEncode from 'jwt-encode'

const Header = () => {
  const [user, setUser] = useState();
  const [userPerfil, setUserPerfil] = useState()
  const [profiles, setProfiles] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchDataUser = async () => {
      const session = await getSession()
      setUser(session?.user)
      const perfilToken = Cookies.get("userProfile")
      if (perfilToken) {
        const perfil = jwtDecode(perfilToken)
        setUserPerfil(perfil)
      }
      const tokenUser = Cookies.get("tokenUserInfo")
      const tokenDecoded = jwtDecode(tokenUser)
      const profilesDynamic = Object.keys(tokenDecoded).filter((key) => {
        try {
          const permissions = JSON.parse(tokenDecoded[key]);
          return Array.isArray(permissions);
        } catch (error) {
          return false;
        }
      });
      setProfiles(profilesDynamic)
    };
    fetchDataUser()
  }, [])

  const handleSidebar = () => {
    if (typeof window !== 'undefined') {
      document.body.classList.toggle("mini-sidebar")
    }
  };

  const handleSidebarMobileMenu = () => {
    if (typeof window !== 'undefined') {
      document.body.classList.toggle('slide-nav')
    }
  };

  const clearAllCookies = () => {
    const cookieKeys = Object.keys(Cookies.get())
    cookieKeys.forEach((cookieKey) => {
      Cookies.remove(cookieKey)
    });
    setIsDropdownOpen(false)
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleSelectChange = selectedProfile => {
    try {
      setUserPerfil(selectedProfile)
      const encodedProfile = jwtEncode(selectedProfile, 'a8f9s0fj0sdfff0s9fj#')
      Cookies.set('userProfile', encodedProfile)
      location.reload()
    } catch (error) {
      console.error('Erro ao atualizar o perfil no cookie:', error)
    }
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
                  <p className="text-muted mb-0">{userPerfil}</p>
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
                  <p className="text-muted mb-0">
                    <Select
                      value={userPerfil}
                      style={{ width: 100, fontSize: '12px' }}
                      onChange={handleSelectChange}
                      size="small"
                    >
                      {profiles.map((perfil, index) => (
                        <Select.Option key={index} value={perfil}>
                          {perfil}
                        </Select.Option>
                      ))}
                    </Select></p>
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
  )
}

export default Header;
