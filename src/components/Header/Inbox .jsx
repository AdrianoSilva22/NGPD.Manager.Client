// import React from 'react'
// import { Link } from 'react-router-dom'
// import Header from './Header'
// import SideBar from '../SideBar/SideBar'

// const Inbox = () => {
//     return (
//         <>
//             <div className="main-wrapper">
//                 {/* Header */}
//                 <Header />

//                 {/* Sidebar */}
//                 <SideBar />

//                 {/* Page Wrapper */}
//                 <div className="page-wrapper">
//                     <div className="content container-fluid">
//                         {/* Page Header */}
//                         <div className="page-header">
//                             <div className="row">
//                                 <div className="col">
//                                     <h3 className="page-title">Inbox</h3>
//                                     <ul className="breadcrumb">
//                                         <li className="breadcrumb-item">
//                                             <Link to="/admindashboard">Dashboard</Link>
//                                         </li>
//                                         <li className="breadcrumb-item active">Inbox</li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* /Page Header */}
//                         <div className="row">
//                             <div className="col-lg-3 col-md-4">
//                                 <div className="compose-btn">
//                                     <Link to="/compose" className="btn btn-primary btn-block">
//                                         Compose
//                                     </Link>
//                                 </div>
//                                 <ul className="inbox-menu">
//                                     <li className="active">
//                                         <Link to="#">
//                                             <i className="fas fa-download" /> Inbox{" "}
//                                             <span className="mail-count">(5)</span>
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="#">
//                                             <i className="far fa-star" /> Important
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="#">
//                                             <i className="far fa-paper-plane" /> Sent Mail
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="#">
//                                             <i className="far fa-file-alt" /> Drafts{" "}
//                                             <span className="mail-count">(13)</span>
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="#">
//                                             <i className="far fa-trash-alt" /> Trash
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                             <div className="col-lg-9 col-md-8">
//                                 <div className="card">
//                                     <div className="card-body">
//                                         <div className="email-header">
//                                             <div className="row">
//                                                 <div className="col top-action-left">
//                                                     <div className="float-start">
//                                                         <div className="btn-group dropdown-action">
//                                                             <button
//                                                                 type="button"
//                                                                 className="btn btn-white dropdown-toggle"
//                                                                 data-bs-toggle="dropdown"
//                                                             >
//                                                                 Select <i className="fas fa-angle-down" />
//                                                             </button>
//                                                             <div className="dropdown-menu">
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     All
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     None
//                                                                 </Link>
//                                                                 <div className="dropdown-divider" />
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Read
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Unread
//                                                                 </Link>
//                                                             </div>
//                                                         </div>
//                                                         <div className="btn-group dropdown-action">
//                                                             <button
//                                                                 type="button"
//                                                                 className="btn btn-white dropdown-toggle"
//                                                                 data-bs-toggle="dropdown"
//                                                             >
//                                                                 Actions <i className="fas fa-angle-down" />
//                                                             </button>
//                                                             <div className="dropdown-menu">
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Reply
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Forward
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Archive
//                                                                 </Link>
//                                                                 <div className="dropdown-divider" />
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Mark As Read
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Mark As Unread
//                                                                 </Link>
//                                                                 <div className="dropdown-divider" />
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Delete
//                                                                 </Link>
//                                                             </div>
//                                                         </div>
//                                                         <div className="btn-group dropdown-action">
//                                                             <button
//                                                                 type="button"
//                                                                 className="btn btn-white dropdown-toggle"
//                                                                 data-bs-toggle="dropdown"
//                                                             >
//                                                                 <i className="fas fa-folder" />{" "}
//                                                                 <i className="fas fa-angle-down" />
//                                                             </button>
//                                                             <div role="menu" className="dropdown-menu">
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Social
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Forums
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Updates
//                                                                 </Link>
//                                                                 <div className="dropdown-divider" />
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Spam
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Trash
//                                                                 </Link>
//                                                                 <div className="dropdown-divider" />
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     New
//                                                                 </Link>
//                                                             </div>
//                                                         </div>
//                                                         <div className="btn-group dropdown-action">
//                                                             <button
//                                                                 type="button"
//                                                                 data-bs-toggle="dropdown"
//                                                                 className="btn btn-white dropdown-toggle"
//                                                             >
//                                                                 <i className="fas fa-tags" />{" "}
//                                                                 <i className="fas fa-angle-down" />
//                                                             </button>
//                                                             <div role="menu" className="dropdown-menu">
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Work
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Family
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Social
//                                                                 </Link>
//                                                                 <div className="dropdown-divider" />
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Primary
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Promotions
//                                                                 </Link>
//                                                                 <Link className="dropdown-item" to="#">
//                                                                     Forums
//                                                                 </Link>
//                                                             </div>
//                                                         </div>
//                                                         <div className="btn-group dropdown-action mail-search">
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Search Messages"
//                                                                 className="form-control search-message"
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-auto top-action-right">
//                                                     <div className="text-end">
//                                                         <button
//                                                             type="button"
//                                                             title="Refresh"
//                                                             data-bs-toggle="tooltip"
//                                                             className="btn btn-white d-none d-md-inline-block"
//                                                         >
//                                                             <i className="fas fa-sync-alt" />
//                                                         </button>
//                                                         <div className="btn-group">
//                                                             <Link className="btn btn-white">
//                                                                 <i className="fas fa-angle-left" />
//                                                             </Link>
//                                                             <Link className="btn btn-white">
//                                                                 <i className="fas fa-angle-right" />
//                                                             </Link>
//                                                         </div>
//                                                     </div>
//                                                     <div className="text-end">
//                                                         <span className="text-muted d-none d-md-inline-block">
//                                                             Showing 10 of 112{" "}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="email-content">
//                                             <div className="table-responsive">
//                                                 <table className="table table-inbox table-hover">
//                                                     <thead>
//                                                         <tr>
//                                                             <th colSpan={6}>
//                                                                 <input type="checkbox" className="checkbox-all" />
//                                                             </th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         <tr className="unread clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="fas fa-star starred" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">John Doe</td>
//                                                             <td className="subject">
//                                                                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit
//                                                             </td>
//                                                             <td>
//                                                                 <i className="fas fa-paperclip" />
//                                                             </td>
//                                                             <td className="mail-date">13:14</td>
//                                                         </tr>
//                                                         <tr className="unread clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="far fa-star" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">Envato Account</td>
//                                                             <td className="subject">
//                                                                 Important account security update from Envato
//                                                             </td>
//                                                             <td />
//                                                             <td className="mail-date">8:42</td>
//                                                         </tr>
//                                                         <tr className="clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="far fa-star" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">Twitter</td>
//                                                             <td className="subject">HRMS Bootstrap Admin Template</td>
//                                                             <td />
//                                                             <td className="mail-date">30 Nov</td>
//                                                         </tr>
//                                                         <tr className="unread clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="far fa-star" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">Richard Parker</td>
//                                                             <td className="subject">
//                                                                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit
//                                                             </td>
//                                                             <td />
//                                                             <td className="mail-date">18 Sep</td>
//                                                         </tr>
//                                                         <tr className="clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="far fa-star" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">John Smith</td>
//                                                             <td className="subject">
//                                                                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit
//                                                             </td>
//                                                             <td />
//                                                             <td className="mail-date">21 Aug</td>
//                                                         </tr>
//                                                         <tr className="clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="far fa-star" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">me, Robert Smith (3)</td>
//                                                             <td className="subject">
//                                                                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit
//                                                             </td>
//                                                             <td />
//                                                             <td className="mail-date">1 Aug</td>
//                                                         </tr>
//                                                         <tr className="unread clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="far fa-star" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">Codecanyon</td>
//                                                             <td className="subject">Welcome To Codecanyon</td>
//                                                             <td />
//                                                             <td className="mail-date">Jul 13</td>
//                                                         </tr>
//                                                         <tr className="clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="far fa-star" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">Richard Miles</td>
//                                                             <td className="subject">
//                                                                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit
//                                                             </td>
//                                                             <td>
//                                                                 <i className="fas fa-paperclip" />
//                                                             </td>
//                                                             <td className="mail-date">May 14</td>
//                                                         </tr>
//                                                         <tr className="unread clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="far fa-star" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">John Smith</td>
//                                                             <td className="subject">
//                                                                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit
//                                                             </td>
//                                                             <td />
//                                                             <td className="mail-date">11/11/16</td>
//                                                         </tr>
//                                                         <tr className="clickable-row">
//                                                             <td>
//                                                                 <input type="checkbox" className="checkmail" />
//                                                             </td>
//                                                             <td>
//                                                                 <span className="mail-important">
//                                                                     <i className="fas fa-star starred" />
//                                                                 </span>
//                                                             </td>
//                                                             <td className="name">Mike Litorus</td>
//                                                             <td className="subject">
//                                                                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit
//                                                             </td>
//                                                             <td />
//                                                             <td className="mail-date">10/31/16</td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//             </div>
//             {/* /Main Wrapper */}

//         </>
//     )
// }

// export default Inbox 
