import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { loadsinglehomestaygaq, updatehomestaygaq } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const EdithomestayGaq = () => {

    const [homestay, setHomeStay] = useState()
    const [input, setInput] = useState({ title: '', desc: '' })
    const [short_description, setShort_description] = useState()

    const { gaqid, index } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getsinglehomestaygaq = async () => {
        console.log('gaqid', gaqid);
        
        const response = await dispatch(loadsinglehomestaygaq({ gaqid, index }))
        console.log('home stay names', response.payload)
        setInput(response.payload.singleGaq)
        return
    }

    useEffect(() => {
        getsinglehomestaygaq()
    }, [])

    // const { register, reset, formState: { errors } } = useForm()
    // const handleError = (errors) => { }
    // const formOptions = {
    //     slug: {
    //         required: {
    //             value: true,
    //             message: '*Please Choose Home Stay Name'
    //         }
    //     },
    //     title: {
    //         required: {
    //             value: true,
    //             message: '*Please Enter Title'
    //         }
    //     },
    //     desc: {
    //         required: {
    //             value: true,
    //             message: '*Please Enter Description'
    //         }
    //     }
    // }

    const handleChange = (e) => {

        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        // const gaqObj = {
        //     title: input.title ,
        //     desc: short_description
        // }
        let formData = new FormData()
        formData.append('gaqid', gaqid)
        formData.append('title', input.title )
        formData.append('desc', short_description)
        formData.append('index', index )
        const response = await dispatch(updatehomestaygaq(formData))
        //console.log('add', response.payload.status)
        if (response.payload.status == 1) {
            navigate('/homestaygaqlist')
        }
    }
    return (
        <div>
            <Layout />
            {/* <!-- Main content --> */}
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1><b>HOMESTAY FAQ UPDATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/homestaygaqlist'>Homestay FAQs</Link></li>
                                    <li className="breadcrumb-item active">Edit Homestay FAQ</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* <!-- left column --> */}
                            <div className="col-md-12">
                                {/* <!-- jquery validation --> */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Form To Update FAQ For Homestay</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit}>
                                        <div className="card-body">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Title</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Title"
                                                    name='title'
                                                    defaultValue={input.title}
                                                    onChange={handleChange} />
                                                {/* <p className='error'>{errors.title?.message}</p> */}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Description</label>
                                                <SunEditor
                                                height="500"
                                                    onChange={(event) => setShort_description(event)}
                                                    setContents={input.desc} />

                                                {/* <textarea type="text" className="form-control"
                                                    placeholder="Enter Content"
                                                    name='desc't
                                                onChange={handleChange}></textarea> */}
                                                {/* <p className='error'>{errors.desc?.message}</p> */}
                                            </div>


                                        </div>
                                        {/* <!-- /.card-body --> */}
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                                {/* <!-- /.card --> */}
                            </div>
                            {/* <!--/.col (left) --> */}

                            {/* <!--/.col (right) --> */}
                        </div>
                        {/* <!-- /.row --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
            </div>
        </div>
    )
}



export default EdithomestayGaq
