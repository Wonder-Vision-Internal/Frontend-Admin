import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getsidebarmodules } from '../redux/Slice'


const Sidebar = () => {

    const dispatch = useDispatch()
    const [menu, setMenu] = useState()
    

    const fetchNavbar = async () => {
        
        let userType = await localStorage.getItem('userType')
        const formData = new FormData()
        formData.append('userType',userType)
        const response = await dispatch(getsidebarmodules(formData))
        console.log('sidebar', response.payload);
        setMenu(response.payload.sidemodules)
    }

    useEffect(() => {
        fetchNavbar()
    }, [])

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* <!-- Brand Logo --> */}
            <a href="#" className="brand-link">
                <img src="./dist/img/favicon.png" alt="Wonder Vision Logo" className="brand-image" style={{ opacity: .8 }} />
                <span className="brand-text ">Wonder Vision</span>
            </a>

            {/* <!-- Sidebar --> */}
            <div className="sidebar">
                {/* <!-- Sidebar user (optional) --> */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="./dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block"><b>ADMIN</b></a>
                    </div>
                    {/* {user_type === 'admin' ? <div className="info">
                        <a href="#" className="d-block"><b>ADMIN</b></a>
                    </div> :
                    user_type === 'sub-admin' ? <div className="info">
                    <a href="#" className="d-block"><b>SUB ADMIN</b></a>
                </div> : null} */}
                </div>

                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2 mb-5">
                    {
                        menu && menu.map((x, index) => (
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" key={index}>
                                <li className="nav-item menu-open">
                                {x.link == null ? 
                               <Link to='#' className="nav-link">
                               {/* <i className="nav-icon fas fa-tty"></i> */}
                               <p>
                                   {x.module_name}
                                   {x.sub_module.length > 0 && <i className="right fas fa-angle-left"></i>}
                               </p>
                           </Link> 
                                     :<Link to={`/${x.link}`} className="nav-link">
                                        {/* <i className="nav-icon fas fa-tty"></i> */}
                                        <p>
                                            {x.module_name}
                                            {x.sub_module.length > 0 && <i className="right fas fa-angle-left"></i>}
                                        </p>
                                    </Link>}
                                    {x.sub_module.length > 0 && x.sub_module.map((y, idx) => (
                                        <ul className="nav nav-treeview" key={idx}>
                                            <li className="nav-item">
                                                <Link to={`/${y.sub_mod_link}`} className="nav-link">
                                                    &nbsp;&nbsp;<i className="far fa-circle nav-icon"></i>&nbsp;&nbsp;
                                                    <p>{y.sub_mod_name}</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    ))

                                    }
                                </li>
                            </ul>
                        ))
                    }

                </nav>
                {/* <!-- /.sidebar-menu --> */}
            </div>
            {/* <!-- /.sidebar --> */}
        </aside>

    )
}

export default Sidebar