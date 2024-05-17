// import React from 'react'
// import { Link } from 'react-router-dom'
// import Header from './Header'
// import SideBar from '../SideBar/SideBar'
// import TextEditor from '../TextEditor'

// const Compose = () => {
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
//                                     <h3 className="page-title">Compose</h3>
//                                     <ul className="breadcrumb">
//                                         <li className="breadcrumb-item">
//                                             <Link to="/admindashboard">Dashboard</Link>
//                                         </li>
//                                         <li className="breadcrumb-item active">Compose</li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* /Page Header */}
//                         <div className="row">
//                             <div className="col-lg-3 col-md-4">
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
//                                         <form action="./inbox">
//                                             <div className="form-group">
//                                                 <input type="email" placeholder="To" className="form-control" />
//                                             </div>
//                                             <div className="row">
//                                                 <div className="col-md-6">
//                                                     <div className="form-group">
//                                                         <input
//                                                             type="email"
//                                                             placeholder="Cc"
//                                                             className="form-control"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="form-group">
//                                                         <input
//                                                             type="email"
//                                                             placeholder="Bcc"
//                                                             className="form-control"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="form-group">
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Subject"
//                                                     className="form-control"
//                                                 />
//                                             </div>
//                                             <div className="form-group">
//                                                 <TextEditor />
//                                             </div>
//                                             <div className="form-group mb-0">
//                                                 <div className="text-center">
//                                                     <button className="btn btn-primary">
//                                                         <i className="fas fa-paper-plane m-r-5" /> <span>Send</span>
//                                                     </button>
//                                                     <button className="btn btn-success m-l-5" type="button">
//                                                         {" "}
//                                                         <i className="far fa-save m-r-5" /> <span>Draft</span>
//                                                     </button>
//                                                     <button className="btn btn-danger m-l-5" type="button">
//                                                         {" "}
//                                                         <i className="far fa-trash-alt m-r-5" />
//                                                         <span>Delete</span>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </form>
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

// export default Compose
