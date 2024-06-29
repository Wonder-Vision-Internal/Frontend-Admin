import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { deleteaward, deletetestimonial, getallawards, getalltestimonials } from '../../redux/Slice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const TestimonialList = () => {

    const [testimonial, setTestimonial] = useState()
    

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getTestimonials = async () => {
        const response = await dispatch(getalltestimonials())
        setTestimonial(response.payload.testimonialData)
        return
    }

    useEffect(() => {
        getTestimonials()
    }, [])

    const handleDelete = async (testimonialId) => {
        const response = await dispatch(deletetestimonial(testimonialId))
        console.log('res', response);
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
                                <h1>Testimonials</h1>
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
                                    <div className="card-header">
                                        <Link to='/testimonialform'>  <button className='btn bg-gradient-primary addition'>ADD</button> </Link>
                                        <h3 className="card-title"></h3>
                                    </div>
                                    {/* {/* <!-- /.card-header --> */}

                                    {testimonial && (
                                        <div className="card-body">
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Videos</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {testimonial.map((data, index) => (
                                                        <tr key={index}>

                                                            <td>
                                                                <p dangerouslySetInnerHTML={{ __html: data.video_link }}></p>
                                                            </td>
                                                            <td><Link to={`/edit-testimonial/${data._id}`}>
                                                                <i className="fas fa-pen fas"></i>
                                                            </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                
                                                                <i className="fas fa-trash" onClick={()=>handleDelete(data._id)}></i>
                                                                

                                                            </td>
                                                        </tr>

                                                    ))}
                                                </tbody>
                                            </table>

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



export default TestimonialList
