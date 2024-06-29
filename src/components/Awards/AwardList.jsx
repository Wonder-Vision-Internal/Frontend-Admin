import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { deleteaward, getallawards } from '../../redux/Slice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const AwardList = () => {

    const [text, setText] = useState()
    const [award, setAward] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getAwards = async () => {
        const response = await dispatch(getallawards())

        setText(response.payload.awardData[0])
        setAward(response.payload.awardData[0].awards)
        return
    }

    useEffect(() => {
        getAwards()
    }, [])

    const handleDelete = async (awardId) => {
        const response = await dispatch(deleteaward(awardId))
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
                                <h1>Awards & Certificates</h1>
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
                                        <Link to='/awardform' className="addition">  <button className='btn bg-gradient-primary'>ADD</button> </Link>
                                        <h3 className="card-title"></h3>
                                    </div>
                                    {/* {/* <!-- /.card-header --> */}

                                    {text && (
                                        <div className="card-body">
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Text</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr >
                                                        <td>{text.small_text}</td>
                                                        <td>
                                                            <Link
                                                                to={`/loadawardtext/${text._id}`}
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
                                                    className="table table-bordered table-striped"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Sl. No.</th>
                                                            <th>Image</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {award.map((data, index) => (
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
                                                                <td>
                                                                    <Link
                                                                        to={`/awards/loadsingleAward/${data._id}`}
                                                                    >
                                                                        <i className="fas fa-pen fas"></i>
                                                                    </Link>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <i
                                                                        className="fas fa-trash"
                                                                        onClick={() => handleDelete(data._id)}
                                                                    ></i>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                    <tfoot>
                                                        <tr>
                                                            <th>Sl. No.</th>
                                                            <th>Image</th>
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



export default AwardList
