import logo from '@/assets/img/PortoDigital_2019.png';
import logoSmall from '@/assets/img/transferir.jpeg';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle('slide-nav');
  }

  // useEffect(() => {
  //   const handleClick = () => {
  //     if (!document.fullscreenElement) {
  //       document.documentElement.requestFullscreen();
  //     } else {
  //       if (document.exitFullscreen) {
  //         document.exitFullscreen();
  //       }
  //     }
  //   }

  //   const maximizeBtn = document.querySelector('.win-maximize');
  //   maximizeBtn.addEventListener('click', handleClick);

  //   return () => {
  //     maximizeBtn.removeEventListener('click', handleClick);
  //   };

  // }, []);
  return (
    <>
      {/* Header */}
      <div className="header">
        {/* Logo */}
        <div className="header-left">
          <Link href="/admindashboard" className="logo">
            <Image src={logo} alt="Logo" />
          </Link>
          <Link href="/admindashboard" className="logo logo-small">
            <Image src={logoSmall} alt="Logo" width={100} height={100} />
          </Link>
        </div>
        {/* /Logo */}
        <div className="menu-toggle">
          <Link href="#" id="toggle_btn" onClick={handlesidebar}>
            <i className="fas fa-bars" />
          </Link>
        </div>
        {/* /Logo */}
        <div className="menu-toggle">
          <Link href="#" id="toggle_btn" onClick={handlesidebar}>
            <i className="fas fa-bars" />
          </Link>
        </div>
        {/* Search Bar */}
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
        {/* /Search Bar */}
        {/* Mobile Menu Toggle */}
        <Link href="#" className="mobile_btn" id="mobile_btn" onClick={() => handlesidebarmobilemenu()}>
          <i className="fas fa-bars" />
        </Link>
        {/* /Mobile Menu Toggle */}
        {/* Header Right Menu */}
        <ul className="nav user-menu">
          <li className="nav-item dropdown language-drop me-2">
            <Link
              href="#"
              className="dropdown-toggle nav-link header-nav-list"
              data-bs-toggle="dropdown"
            >
            </Link>
          </li>
          {/* Notifications */}
          <li className="nav-item dropdown noti-dropdown me-2">
            <Link
              href="#"
              className="dropdown-toggle nav-link header-nav-list"
              data-bs-toggle="dropdown"
            >
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <Link href="#" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link href="#">
                      <div className="media d-flex">
                        
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Carlson Tech</span> has
                            approved{" "}
                            <span className="noti-title">your estimate</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="#">
                      <div className="media d-flex">
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">
                              International Software Inc
                            </span>{" "}
                            has sent you a invoice in the amount of{" "}
                            <span className="noti-title">$218</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              6 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="#">
                      <div className="media d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">John Hendry</span> sent
                            a cancellation request{" "}
                            <span className="noti-title">Apple iPhone XR</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              8 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="#">
                      <div className="media d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">
                              Mercury Software Inc
                            </span>{" "}
                            added a new product{" "}
                            <span className="noti-title">
                              Apple MacBook Pro
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              12 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          {/* /Notifications */}
          {/* <li className="nav-item zoom-screen me-2">
                                <Link to="#" className="nav-link header-nav-list">
                                    <img src={headericon04} alt="" />
                                </Link>
                            </li> */}
          
          {/* User Menu */}
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
                  alt="Ryan Taylor"
                  src={logoSmall}
                />
                <div className="user-text">
                  <h6>Thiago</h6>
                  <p className="text-muted mb-0">Mentor</p>
                </div>
              </span>
            </Link>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    alt="User Image"
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>Ryan Taylor</h6>
                  <p className="text-muted mb-0">Administrator</p>
                </div>
              </div>
              <Link className="dropdown-item" href="/profile">
                My Profile
              </Link>
              <Link className="dropdown-item" href="/inbox">
                Inbox
              </Link>
              <Link className="dropdown-item" href="/login">
                Logout
              </Link>
            </div>
          </li>
          {/* /User Menu */}
        </ul>
        {/* /Header Right Menu */}
      </div>
      {/* /Header */}
    </>
  );
}

export default Header
