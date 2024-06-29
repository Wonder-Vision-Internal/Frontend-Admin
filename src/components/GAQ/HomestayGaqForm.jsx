import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addhomestaygaq, addrooms, getAllHomeStay } from '../../redux/Slice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const HomestayGaqForm = () => {

    const [homestay, setHomeStay] = useState()
    // const [input, setInput] = useState({slug:'',title:'',desc:''})
    const [short_description,setShort_description] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const gethomestaynames = async () => {
        const response = await dispatch(getAllHomeStay())
        console.log('home stay names', response.payload.details)
        setHomeStay(response.payload.details)
        return
    }

    useEffect(() => {
        gethomestaynames()
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {
        slug: {
            required: {
                value: true,
                message: '*Please Choose Home Stay Name'
            }
        },
        title: {
            required: {
                value: true,
                message: '*Please Enter Title'
            }
        }
    }

  

    const handleForm = async (data,e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('slug',data.slug)
        formData.append('title',data.title)
        formData.append('desc',short_description)
        const response = await dispatch(addhomestaygaq(formData))
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
                                <h1><b>HOMESTAY FAQ CREATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/homestaygaqlist'>Homestay FAQs</Link></li>
                                    <li className="breadcrumb-item active">Add Homestay FAQ</li>
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
                                        <h3 className="card-title">Form To Create New FAQ For Homestay</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Home Stay</label>
                                                        <select className="form-control select2" style={{ width: '100%' }}
                                                            name='slug'
                                                            {...register('slug',formOptions.slug)}>
                                                            <option value=''>Choose Home Stay</option>
                                                            {homestay && homestay.map((data, index) => (
                                                                <option value={data.slug} key={index}>{data.title}</option>
                                                            ))}
                                                        </select>
                                                        {/* <p className='error'>{errors.slug?.message}</p> */}
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Title</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Title"
                                                    name='title'
                                                    {...register('title',formOptions.title)}
                                                    />
                                                <p className='error'>{errors.title?.message}</p>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Description</label>
                                                <SunEditor
                                                height="500"
                                                    onChange={(event) => setShort_description(event)}
                                                    setContents={short_description}/>
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



export default HomestayGaqForm
