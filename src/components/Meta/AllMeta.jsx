import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link,useLocation } from 'react-router-dom'
import Layout from '../Layout'
import { getallmeta } from '../../redux/Slice'
// import CheckPermission from '../CheckPermission'


const AllMeta = () => {

    const location = useLocation()

   
    const [meta, setMeta] = useState()
    const [filter, setFilter] = useState()
    const dispatch = useDispatch()
    const getMeta = async (req, res) => {
        const response = await dispatch(getallmeta())
        console.log('parse', JSON.parse(response.payload.metaInfo.meta));
        for (let x in JSON.parse(response.payload.metaInfo.meta)) {
            console.log('x', x);
            if (x === filter) {
                setMeta(JSON.parse(response.payload.metaInfo.meta)[x])
            }
        }
    }

    useEffect(() => {
        getMeta()
    }, [filter])

    const handleChange = async (e) => {
        setFilter(e.target.value)
    }

    return (
        <div>
            <Layout />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Meta Information</h1>
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
                                    <div className="row" style={{
                                        marginLeft: '20px',
                                        marginTop: '10px'
                                    }}>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Select Page</label>
                                                <select name='page' onChange={handleChange}
                                                    className="form-control select2" style={{ width: '100%' }}>
                                                    <option value="">Choose Page</option>
                                                    <option value='home'>Home</option>
                                                    <option value="aboutus">About</option>
                                                    <option value="tailormade">Tailormade</option>
                                                    <option value="homestays">Homestays</option>
                                                    <option value="packages">Packages</option>
                                                    <option value="testimonial">Testimonial</option>
                                                    <option value="blogs">Blogs</option>
                                                    <option value="contact">Contact</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="card-body">
                                        {meta &&
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th >Description</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr >
                                                        <td>{meta.title}</td>
                                                        <td >
                                                            {meta.description}

                                                        </td>
                                                        <td>
                                                            <Link
                                                            to={`/editmeta/${filter}`}
                                                            >
                                                                <i className="fas fa-pen fas"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>

                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        }
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

export default AllMeta
