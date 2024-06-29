import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AllPackages, deletepackage, deletepackagegaq, getgaqbypackage, hideunhidepackage } from '../../redux/Slice'

const GaqList = () => {


    const dispatch = useDispatch()


    const [packageDetails, setPackageDetails] = useState([{}])
    const [gaq, setGaq] = useState()
    const [gaqid, setGaqid] = useState()
    //   const [tab,setTab] = useState()
    const [filter, setFilter] = useState({ slug: '' })


    const getPackages = async () => {
        const response = await dispatch(AllPackages())
        setPackageDetails(response.payload.packages)
        return
    }

    // console.log('package details', packageDetails)

    useEffect(() => {
        getPackages()
    }, [])



    const filterGaqs = async () => {
        if (filter.slug) {
            const response = await dispatch(getgaqbypackage(filter.slug))
            console.log('new', response.payload.gaqData[0].gaqDetails[0]);
            setGaqid(response.payload.gaqData[0].gaqDetails[0]._id)

            const convertedGaq = JSON.parse(response.payload.gaqData[0].gaqDetails[0].gaq_details)
            console.log('converted', convertedGaq);
            setGaq(convertedGaq)
        }
    }
    gaq && console.log('gaq', gaq)
    useEffect(() => {
        filterGaqs()
    }, [filter])

    const handleChange = (e) => {
        setFilter({ [e.target.name]: e.target.value })
    }

    const handleHide = async (slug) => {
        const response = await dispatch(hideunhidepackage(slug))
        console.log('from hide', response);
        if (response.payload == 1 || response.payload == 2) {
            setTimeout(() => { window.location.reload(false) }, 1000)
        }
    }

    const handleDelete = async (gaqid, tab_index, title_index) => {
        const response = await dispatch(deletepackagegaq({ gaqid, tab_index, title_index }))
        if (response.payload.status == 1) {
            setTimeout(() => { window.location.reload(false) }, 500)
        }
    }

    return (
        <div>
            <Layout />
            {/* <!-- Content Wrapper. Contains page content --> */}
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                {/* {packageDetails && <h1>Generally Asked Questions of {packageDetails.title}</h1>} */}
                                <h1>GAQs</h1>

                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item active">GAQ List</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    {/* <div className="card-header"> */}
                                    {/* <Button className='btn bg-gradient-primary' onClick={handleClick}>ADD PACKAGE</Button> */}
                                    {/* <h3 className="card-title"></h3> */}
                                    {/* </div> */}
                                    {/* <!-- /.card-header --> */}
                                    <div className="row" style={{
                                        marginLeft: '20px',
                                        marginTop: '10px'
                                    }}>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Package</label>
                                                <select name='slug'
                                                    onChange={handleChange}
                                                    className="form-control select2" style={{ width: '100%' }}
                                                >
                                                    <option value=''>Select Package</option>
                                                    {packageDetails && packageDetails.map((data, index) => (
                                                        <option key={index} value={data.slug}>{data.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-md-8 d-flex justify-content-end'>
                                                <Link to='/gaq/addgaqtab' className='addition'>
                                                    <button type="button" className="btn bg-gradient-primary"
                                                        >
                                                        <i className='fas fa-plus'></i>&nbsp;NEW TAB</button>
                                                </Link>                                          
                                            
                                                <Link to='/gaq/addgaq' className='addition'>
                                                    <button type="button" className="btn bg-gradient-primary"
                                                       >
                                                        <i className='fas fa-plus'></i>&nbsp;NEW GAQ</button>
                                                </Link>
                                            
                                        </div>
                                        </div>
                                        
                                                                              
                                    <div className="card-body">
                                        {gaq && gaq.map((outerdata, index) => (
                                            <div>
                                                <button key={index}
                                                    style={{ border: 'none', background: 'grey', color: 'white' }}>
                                                    {outerdata.tab_name}</button>
                                                <br /><br />
                                                {outerdata.tab_details &&
                                                    <table className="table table-bordered table-striped">

                                                        <thead>
                                                            <tr>
                                                                <th>Sl. No.</th>
                                                                <th>Title</th>
                                                                <th>Description</th>
                                                                <th >Actions</th>
                                                            </tr>
                                                        </thead>
                                                        {outerdata.tab_details.map((data, idx) => (
                                                            <tbody>

                                                                <tr key={idx}>
                                                                    <td>{idx + 1}</td>
                                                                    <td>{data.title}</td>
                                                                    <td>{data.desc}</td>
                                                                    <td><Link to={`/gaq/loadsinglegaq/${gaqid}/${index}/${idx}`}><i className='fas fa-pen fas'></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        <i className='fas fa-trash' onClick={() => handleDelete(gaqid, index, idx)}></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                                                    </td>
                                                                </tr>

                                                            </tbody>
                                                        ))}
                                                        <tfoot>
                                                            <tr>
                                                                <th>Sl. No.</th>
                                                                <th>Title</th>
                                                                <th>Description</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </tfoot>

                                                    </table>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                    {/* <!-- /.card-body --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default GaqList
