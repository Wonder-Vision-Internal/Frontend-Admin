import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addrooms, getAllHomeStay } from '../../redux/Slice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const RoomForm = () => {

    const [homestay, setHomeStay] = useState()

    const [img, setImg] = useState()
    const [roompic, setRoompic] = useState()
    const [short_description, setShort_description] = useState()
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
        },
        desc: {
            required: {
                value: true,
                message: '*Please Enter Description'
            },
            validate: {
                validImage: (value) => {
                  // Check if a file has been selected
                  return value && value.length > 0;
                }
        }
        },
        img: {
            required: {
                value: true,
                message: '*Please Choose Image'
            },
            validate: {
                validImage: (value) => {
                  // Check if a file has been selected
                  return value && value.length > 0;
                }
        }
    }
    }

   
    const handleImageUpload = (e) => {
        setImg(e.target.files[0].name)
        setRoompic(e.target.files[0])
    }
    const handleForm = async (input, e) => {
        e.preventDefault()
        reset()
        console.log('input', input)
        const formData = new FormData()
        let slug = input.slug
        formData.append('title', input.title)
        formData.append('desc', short_description)
        formData.append('img', img)
        formData.append('roompic', roompic)
        const response = await dispatch(addrooms({ formData, slug }))
        console.log('add', response.payload.status)
        if (response.payload.status == 1) {
            navigate('/roomslist')
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
                                <h1><b>ROOM CREATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/roomslist'>Rooms</Link></li>
                                    <li className="breadcrumb-item active">Add Room</li>
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
                                        <h3 className="card-title">Form To Create New Room</h3>
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
                                                            {...register('slug', formOptions.slug)}>
                                                            <option value=''>Choose Home Stay</option>
                                                            {homestay && homestay.map((data, index) => (
                                                                <option value={data.slug} key={index}>{data.title}</option>
                                                            ))}

                                                        </select>
                                                        <p className='error'>{errors.slug?.message}</p>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Title</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Title"
                                                    {...register('title', formOptions.title)} />
                                                <p className='error'>{errors.title?.message}</p>
                                            </div>

                                            <div className="form-group"  >
                                                <label htmlFor="exampleInputEmail1">Description</label>
                                                <SunEditor
                                                height="500"
                                                setDefaultStyle="font-size: 16px;"
                                                    onChange={(event) => setShort_description(event)}
                                                     />
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Picture</label>
                                                        <input type="file" className="form-control"
                                                            placeholder="Enter Address"
                                                            name="img" onChange={handleImageUpload}
                                                        // {...register('img', formOptions.img)}
                                                        />
                                                        {/* <p className='error'>{errors.img?.message}</p> */}
                                                    </div>
                                                </div>


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



export default RoomForm
