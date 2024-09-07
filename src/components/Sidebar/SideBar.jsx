import $ from 'jquery';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Link from "next/link";
import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [userRole, setUserRole] = useState(null);

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };

  useEffect(() => {
    const tokenUser = Cookies.get("tokenUserInfo")
    const tokenUserDecoded = jwtDecode(tokenUser)

    setUserRole(tokenUserDecoded.role);

    function handleMouseOver(e) {
      e.stopPropagation();
      if (typeof window !== 'undefined') {
        const toggleBtn = document.querySelector('#toggle_btn');
        if (toggleBtn && toggleBtn.offsetParent !== null) {
          var targ = e.target.closest('.sidebar');
          if (targ) {
            document.body.classList.add('expand-menu');
            document.querySelectorAll('.subdrop + ul').forEach((ul) => ul.style.display = 'block');
          } else {
            document.body.classList.remove('expand-menu');
            document.querySelectorAll('.subdrop + ul').forEach((ul) => ul.style.display = 'none');
          }
          return false;
        }
      }
    }
    
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    $(document).on('change', '.sidebar-type-four input', function () {
      if ($(this).is(':checked')) {
        $('.sidebar').addClass('sidebar-eight');
        $('.sidebar-menu').addClass('sidebar-menu-eight');
        $('.menu-title').addClass('menu-title-eight');
        $('.header').addClass('header-eight');
        $('.header-left-two').addClass('header-left-eight');
        $('.user-menu').addClass('user-menu-eight');
        $('.dropdown-toggle').addClass('dropdown-toggle-eight');
        $('.white-logo').addClass('show-logo');
        $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').addClass('hide-logo');
        $('.header-two .header-left-two .logo:not(.logo-small)').removeClass('hide-logo');
        $('.header-two .header-left-two .dark-logo').removeClass('show-logo');
      } else {
        $('.sidebar').removeClass('sidebar-eight');
        $('.sidebar-menu').removeClass('sidebar-menu-eight');
        $('.menu-title').removeClass('menu-title-eight');
        $('.header').removeClass('header-eight');
        $('.header-left-two').removeClass('header-left-eight');
        $('.user-menu').removeClass('user-menu-eight');
        $('.dropdown-toggle').removeClass('dropdown-toggle-eight');
        $('.white-logo').removeClass('show-logo');
        $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').removeClass('hide-logo');
      }
    });
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
                <span> NGPD Menu</span>
              </li>
              <li className={`${"/empresa" === pathName || "/empresa/register" === pathName ? "active submenu" : "submenu"}`}>
                <Link
                  href="#"
                  
                  onClick={() => toggleSidebar(isSideMenu === "empresa" ? "" : "empresa")}
                >
                  <i className="fas fa-city" /> <span> Empresas </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu === "empresa" && (
                  <ul style={{ display: isSideMenu === "empresa" ? "block" : "none" }}>
                    <li>
                      <Link href="/empresa" className={`${"/empresa" === pathName ? "active" : ""}`}>
                        Empresas
                      </Link>
                    </li>
                   
                  </ul>
                )}
              </li>
              <li className={`${"/instituicao" === pathName || "/instituicao/register" === pathName ? "active submenu" : "submenu"}`}>
                <Link
                  href="#"
                  className={isSideMenu === "instituicao" ? "subdrop" : ""}
                  onClick={() => toggleSidebar(isSideMenu === "instituicao" ? "" : "instituicao")}
                >
                  <i className="fas fa-university" /> <span> Instituições </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu === "instituicao" && (
                  <ul style={{ display: isSideMenu === "instituicao" ? "block" : "none" }}>
                    <li>
                      <Link href="/instituicao" className={`${"/instituicao" === pathName ? "active" : ""}`}>
                        Instituições
                      </Link>
                    </li>
                   
                  </ul>
                )}
              </li>

              {/* testeeeeeeeeeee */}
              <li className={`${"/instituicao/turma" === pathName || "/instituicao/turma/register" === pathName ? "active submenu" : "submenu"}`}>
                <Link
                  href="#"
                  className={isSideMenu === "turma" ? "subdrop" : ""}
                  onClick={() => toggleSidebar(isSideMenu === "turma" ? "" : "turma")}
                >
                  <i className="fa-solid fa-book-open-reader" /> <span> Turmas </span> <span className="menu-arrow" />

                  
                </Link>
                {isSideMenu === "turma" && (
                  <ul style={{ display: isSideMenu === "instituicao" ? "block" : "none" }}>
                   
                    <li>
                      <Link href="/instituicao/turma" className={`${"/instituicao/turma" === pathName ? "active" : ""}`}>
                        Turmas
                      </Link>
                    </li>
                  </ul>
                )}
</li>

              <li className={`${"/squad" === pathName || "/squad/register-instituicao" === pathName ? "active submenu" : "submenu"}`}>
                <Link
                  href="#"
                  className={isSideMenu === "squad" ? "subdrop" : ""}
                  onClick={() => toggleSidebar(isSideMenu === "squad" ? "" : "squad")}
                >
                  <i className="fas fa-users" /> <span> Squads </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu === "squad" && (
                  <ul style={{ display: isSideMenu === "squad" ? "block" : "none" }}>
                    <li>
                      <Link href="/squad" className={`${"/squad" === pathName ? "active" : ""}`}>
                       Squads
                      </Link>
                    </li>
                   
                  </ul>
                )}
              </li>
              <li className={`${"/mentor" === pathName || "/mentor" === pathName ? "active submenu" : "submenu"}`}>
                <Link
                  href="#"
                  className={isSideMenu === "mentor" ? "subdrop" : ""}
                  onClick={() => toggleSidebar(isSideMenu === "mentor" ? "" : "mentor")}
                >
                  <i className="fas fa-user fa-md" /> <span> Mentor </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu === "mentor" && (
                  <ul style={{ display: isSideMenu === "mentor" ? "block" : "none" }}>
                    <li>
                      <Link href="/mentor" className={`${"/mentor" === pathName ? "active" : ""}`}>
                        Mentores
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className={`${"/user" === pathName || "/user" === pathName ? "active submenu" : "submenu"}`}>
                <Link
                  href="#"
                  className={isSideMenu === "user" ? "subdrop" : ""}
                  onClick={() => toggleSidebar(isSideMenu === "user" ? "" : "user")}
                >
                  <i className="fas fa-user-plus fa-md" /> <span> Funcionário </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu === "user" && (
                  <ul style={{ display: isSideMenu === "user" ? "block" : "none" }}>
                    <li>
                      <Link href="/user" className={`${"/user" === pathName ? "active" : ""}`}>
                        Adicionar Usuário
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className={`${"/sobre" === pathName || "/sobre" === pathName ? "active submenu" : "submenu"}`}>
                <Link
                  href="#"
                  className={isSideMenu === "sobre" ? "subdrop" : ""}
                  onClick={() => toggleSidebar(isSideMenu === "sobre" ? "" : "sobre")}
                >
                  <i className="fa-solid fa-eye" /> <span> Sobre Nós </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu === "sobre" && (
                  <ul style={{ display: isSideMenu === "user" ? "block" : "none" }}>
                    <li>
                      <Link href="/sobre" className={`${"/user" === pathName ? "active" : ""}`}>
                        Visualizar
                      </Link>
                    </li>
                  </ul>
                )}
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
                <span> NGPD Menu</span>
              </li>

              <li
                className={`${"/squad" === pathName ? "active submenu" : "submenu"}`}
              >
                <Link
                  href="#"
                  className={isSideMenu == "squad" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "squad" ? "" : "squad"
                    )
                  }
                >
                  <i className="fas fa-users" /> <span> Squad </span>{" "}
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "squad" ? (
                  <ul
                    style={{
                      display: isSideMenu == "squad" ? "block" : "none",
                    }}
                  >
                    <li>
                      <Link
                        href="/squad"
                        className={`${"/instituicao/update" === pathName ? "active" : ""}`}
                      >
                        Listar
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  )

  return (
    <div>
      {userRole === 'Gerente' || userRole === 'Suporte' ? (
        renderSidebarGerenteAndSuporte()
      ) : userRole === 'Mentor' ? (
        renderSidebarMentor()
      ) : (
        ''
      )}
    </div>
  );
};

export default Sidebar;
