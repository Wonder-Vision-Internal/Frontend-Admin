import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { AllPackages, deletelogorating, homestaylogoratinglist } from '../../redux/Slice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const PackageLogoRatingList = () => {

    const [packages, setPackages] = useState()
    const [filter, setFilter] = useState({ slug: ''})
    
    const [mainText,setMainText] = useState()
    const [logoDetails,setLogoDetails] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getpackagenames = async () => {
        const response = await dispatch(AllPackages())
        console.log('allpackages',response.payload);
        setPackages(response.payload.packages)
        return
    }

    useEffect(() => {
        getpackagenames()
    }, [])


    const filterLogoRating = async () => {
        if (filter.slug) {
            console.log(('filter.slug',filter.slug));
            const response = await dispatch(homestaylogoratinglist(filter.slug))
            console.log('logo details',response.payload);
            setMainText(response.payload.expertFormData)
            setLogoDetails(JSON.parse(response.payload.expertFormData.paragraph))
        }
        // else {
        //     set('')
        // }
    }

    useEffect(() => {
        filterLogoRating()
    }, [filter])

    const handleChange = async (e) => {
        await setFilter({ [e.target.name]: e.target.value })
    }
    const handleDelete = async (id,index) => {
        const response = await dispatch(deletelogorating({id,index}))
        console.log('res', response);
        if (response.payload.status == 1) {
            setTimeout(() => { window.location.reload(false) }, 500)
        }
    }
let type1='text'
let type2='logo'
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
                                <h1>Logo & Rating of Packages</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

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
                                    {/* <div className="card-header">
                                        <Link to='/awardform'>  <button className='btn bg-gradient-primary'>ADD</button> </Link>
                                        <h3 className="card-title"></h3>
                                    </div> */}
                                    {/* {/* <!-- /.card-header --> */}
                                    <div className="row" style={{
                                        marginLeft: '20px',
                                        marginTop: '10px'
                                    }}>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Choose Package</label>
                                                <select name='slug' onChange={handleChange}
                                                    className="form-control select2" style={{ width: '100%' }}>
                                                    <option value="">Select Package</option>
                                                    {packages && packages.map((data, index) => (
                                                        <option value={data.slug} key={index}>{data.title}</option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                        <div col-md-2>
                                            <Link to='/packages/addlogorating'>
                                                <button type="button" className="btn bg-gradient-primary"
                                                    style={{ marginLeft: '550px' }}>
                                                    <i className='fas fa-plus'></i>&nbsp;ADD NEW</button>
                                            </Link>
                                        </div>
                                    </div>
                                    {mainText && (
                                        <div className="card-body">
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Bottom Text</th>
                                                        <th>Rating</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr >
                                                        <td>{mainText.text}</td>
                                                        <td>{mainText.score}</td>
                                                        <td>
                                                            <Link
                                                                to={`/packages/editlogorating/${type1}/${filter.slug}/${mainText._id}/index`}
                                                            >
                                                                <i className="fas fa-pen fas"></i>
                                                            </Link>
                                                           
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                            <div className="card-body">
                                                <table
                                                    id="example1"
                                                    className="table table-bordered table-secondary"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Sl. No.</th>
                                                            <th>Logo</th>
                                                            <th>Text</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {logoDetails.map((data, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    <img
                                                                        src={
                                                                            process.env.REACT_APP_BASE_IMG_URL +
                                                                            data.img
                                                                        }
                                                                        style={{ height: "150px", width: "200px" }}
                                                                    />
                                                                </td>
                                                                <td>{data.text}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/packages/editlogorating/${type2}/${filter.slug}/${mainText._id}/${index}`}
                                                                    >
                                                                        <i className="fas fa-pen fas"></i>
                                                                    </Link>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <i
                                                                        className="fas fa-trash"
                                                                        onClick={() => handleDelete(mainText._id,index)}
                                                                    ></i>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                    <tfoot>
                                                        <tr>
                                                            <th>Sl. No.</th>
                                                            <th>Logo</th>
                                                            <th>Text</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                    {/* <!-- /.card-body --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}



export default PackageLogoRatingList
