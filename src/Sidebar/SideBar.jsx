import $ from 'jquery';
import Link from "next/link";
import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");

  const toggleSidebar = (value) => {
    console.log(value);
    setSideMenu(value);
  };

  useEffect(() => {
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
  }, [])

  let { location } = props;
  let pathName = location ? location.pathName : '';

  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={true}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main Menu</span>
                </li>
                <li
                  className={`${"/estudante" === pathName || "/estudante/register" === pathName ? "active submenu" : "submenu"}`}
                >
                  <Link
                    href="#"
                    className={isSideMenu == "estudante" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "estudante" ? "" : "estudante"
                      )
                    }
                  >
                    <i className="fas fa-building" /> <span> Estudantes </span>{" "}
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "estudante" ? (
                    <ul
                      style={{
                        display: isSideMenu == "estudante" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          href="/estudante"
                          className={`${"/estudante" === pathName ? "active" : ""}`}
                        >
                          Listagem de Estudantes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/estudante/register"
                          className={`${"/estudante/register" === pathName ? "active" : ""}`}
                        >
                          Adicionar Estudante
                        </Link>
                      </li>

                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${"/instituicao" === pathName || "/instituicao/register" === pathName ? "active submenu" : "submenu"}`}
                >
                  <Link
                    href="#"
                    className={isSideMenu == "instituicao" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "instituicao" ? "" : "instituicao"
                      )
                    }
                  >
                    <i className="fas fa-building" /> <span> Instituições </span>{" "}
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "instituicao" ? (
                    <ul
                      style={{
                        display: isSideMenu == "instituicao" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          href="/instituicao"
                          className={`${"/instituicao/register" === pathName ? "active" : ""}`}
                        >
                          Adicionar Instituição
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
    </>
  );
};
export default Sidebar;