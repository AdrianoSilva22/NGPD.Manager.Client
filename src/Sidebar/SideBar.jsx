import $ from 'jquery';
import Cookies from 'js-cookie';
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
    setUserRole(Cookies.get('userRole'));

    function handleMouseOver(e) {
      e.stopPropagation();
      if (document.body.classList.contains('mini-sidebar') && document.querySelector('#toggle_btn').offsetParent !== null) {
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
              <li className={`${"/estudante" === pathName || "/estudante/register" === pathName ? "active submenu" : "submenu"}`}>
                <Link
                  href="#"
                  className={isSideMenu === "estudante" ? "subdrop" : ""}
                  onClick={() => toggleSidebar(isSideMenu === "estudante" ? "" : "estudante")}
                >
                  <i className="fas fa-user-graduate" /> <span> Estudantes </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu === "estudante" && (
                  <ul style={{ display: isSideMenu === "estudante" ? "block" : "none" }}>
                    <li>
                      <Link href="/estudante" className={`${"/estudante" === pathName ? "active" : ""}`}>
                        Listagem
                      </Link>
                    </li>
                    <li>
                      <Link href="/estudante/register" className={`${"/estudante/register" === pathName ? "active" : ""}`}>
                        Adicionar
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
                  <i className="fas fa-building" /> <span> Instituições </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu === "instituicao" && (
                  <ul style={{ display: isSideMenu === "instituicao" ? "block" : "none" }}>
                    <li>
                      <Link href="/instituicao" className={`${"/instituicao" === pathName ? "active" : ""}`}>
                        Listagem
                      </Link>
                    </li>
                    <li>
                      <Link href="/instituicao/register" className={`${"/instituicao/register" === pathName ? "active" : ""}`}>
                        Adicionar
                      </Link>
                    </li>
                    <li>
                      <Link href="/instituicao/turma" className={`${"/instituicao/turma" === pathName ? "active" : ""}`}>
                        Listagem Turmas
                      </Link>
                    </li>
                    <li>
                      <Link href="/instituicao/turma/register" className={`${"/instituicao/turma/register" === pathName ? "active" : ""}`}>
                        Adicionar Turma
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className={`${"/squad" === pathName || "/squad/register" === pathName ? "active submenu" : "submenu"}`}>
                <Link
                  href="#"
                  className={isSideMenu === "squad" ? "subdrop" : ""}
                  onClick={() => toggleSidebar(isSideMenu === "squad" ? "" : "squad")}
                >
                  <i className="fas fa-users" /> <span> Squad </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu === "squad" && (
                  <ul style={{ display: isSideMenu === "squad" ? "block" : "none" }}>
                    <li>
                      <Link href="/squad" className={`${"/squad" === pathName ? "active" : ""}`}>
                        Listar
                      </Link>
                    </li>
                    <li>
                      <Link href="/squad/register" className={`${"/squad/register" === pathName ? "active" : ""}`}>
                        Adicionar
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
