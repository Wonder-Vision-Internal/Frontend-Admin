import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PackageBySlug } from '../../redux/Slice'
import { Link } from 'react-router-dom'
import Layout from '../Layout'

const PackageDetails = () => {

    const { slug } = useParams()
    const dispatch = useDispatch()

    const [packagedata, setPackageData] = useState({})
    const [tabDetails, setTabDetails] = useState([{}])

    const packageBySlug = async () => {
        const packagedetails = await dispatch(PackageBySlug(slug))
        console.log(packagedetails)
        setPackageData(packagedetails.payload.package[0])
        setTabDetails(JSON.parse(packagedetails.payload.package[0].package[0].other_details))

    }

    useEffect(() => {
        packageBySlug()
    }, [])
    // console.log('tabdetails', tabDetails)
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
                                {/* <h1>Package Details</h1> */}
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item"><Link to='/packages'>Package List</Link></li>
                                    <li className="breadcrumb-item active">Package Details</li>
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
                                    <div className="card-body">
                                        <p><b>{packagedata && packagedata.title}</b></p>
                                        <hr />
                                        <p><strong>Featured Image</strong></p><img
                                            src={
                                                process.env.REACT_APP_BASE_IMG_URL +
                                                packagedata.featured_img
                                            }
                                            style={{ height: "150px", width: "200px" }}
                                        />
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body" style={{ display: "flex" }}>

                                        <p dangerouslySetInnerHTML={{ __html: packagedata?.content }}></p>
                                        <p><strong>Map Image</strong>
                                            <br />
                                            <img
                                                src={
                                                    process.env.REACT_APP_BASE_IMG_URL +
                                                    packagedata.main_img
                                                }
                                                style={{ height: "150px", width: "200px" }}
                                            />
                                        </p>
                                    </div>
                                </div>
                                {tabDetails && tabDetails.map((data, index) => (
                                    <div className="card" key={index}>
                                        <div className="card-body">
                                            <button type="button" className="btn bg-gradient-info"
                                            >{data.title}</button>
                                        </div>
                                        <div className="card-body"
                                            dangerouslySetInnerHTML={{ __html: data.content }}>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PackageDetails
