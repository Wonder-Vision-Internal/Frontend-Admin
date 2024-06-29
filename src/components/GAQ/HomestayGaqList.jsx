import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Layout from '../Layout'
import { useDispatch } from 'react-redux'
import {  deletehomestaygaq, getAllHomeStay,getgaqbyhomestay } from '../../redux/Slice'




const HomestayGaqList = () => {

    
    const [homestay, setHomeStay] = useState([{}])
    const [gaqid,setGaqid] = useState()
    const [filter, setFilter] = useState({ slug: '' })
    const [gaq, setGaq] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const gethomestaynames = async () => {
        const response = await dispatch(getAllHomeStay())
        setHomeStay(response.payload.details)
        return
    }

    useEffect(() => {
        gethomestaynames()
    }, [])

    const filtergaq = async () => {
        if (filter.slug) {
            console.log(('filter.slug',filter.slug));
            const response = await dispatch(getgaqbyhomestay(filter.slug))
            // console.log(response.payload);
            setGaq(JSON.parse(response.payload.HSgaq.gaq_details))
            setGaqid(response.payload.HSgaq._id)
            console.log('gaq',gaq);
        }
        else {
            
        }
    }

    useEffect(() => {
        filtergaq()
    }, [filter])

    const handleChange = async (e) => {
        await setFilter({ [e.target.name]: e.target.value })
    }

    const handleDelete = async (gaqid,title) => {
        const response = await dispatch(deletehomestaygaq({gaqid,title}))
        console.log('response.payload', response.payload)
        if (response.payload.status == 1) {
            setTimeout(() => { window.location.reload(false) }, 1000)

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
                               

                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item active">Homestay FAQs</li>
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
                                                <label>Choose Home Stay</label>
                                                <select name='slug' onChange={handleChange}
                                                    className="form-control select2" style={{ width: '100%' }}>
                                                    <option value="">Select Home Stay</option>
                                                    {homestay && homestay.map((data, index) => (
                                                        <option value={data.slug} key={index}>{data.title}</option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                        <div col-md-2>
                                            <Link to='/gaq/homestaygaqform'>
                                                <button type="button" className="btn bg-gradient-primary"
                                                    style={{ marginLeft: '550px' }}>
                                                    <i className='fas fa-plus'></i>&nbsp;NEW FAQ</button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        {gaq && (
                                            <table id="example1" className="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                    <th>Sl. No.</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {gaq.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{data.title}</td>
                                                            <td dangerouslySetInnerHTML={{__html:data.desc}}></td>
                                                            
                                                            <td style={{ width: '150px' }}>
                                                                <Link to={`/gaq/loadsinglehomestaygaq/${gaqid}/${index}`}><i className='fas fa-pen fas'></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <i className='fas fa-trash' onClick={() => handleDelete(gaqid,data.title)}></i>
                                                                </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                    <th>Sl. No.</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        
                                                        <th>Actions</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        )}
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
export default HomestayGaqList


