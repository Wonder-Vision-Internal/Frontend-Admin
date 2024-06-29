import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { getroombyid, updateroom } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const EditRoom = () => {

    const [img, setImg] = useState()
    const [roompic, setRoompic] = useState()
    const [room, setRoom] = useState()
    const [short_description, setShort_description] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { roomid } = useParams()




    const loadSingleRoom = async () => {
        const response = await dispatch(getroombyid(roomid))
        console.log('rooms component', response.payload.roomDetails[0])
        setRoom(response.payload.roomDetails[0])
        // setHomeStay(response.payload.details)
        return
    }

    useEffect(() => {
        loadSingleRoom()
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {

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
            }
        },
        img: {
            required: {
                value: true,
                message: '*Please Choose Image'
            }
        }
    }

    // const handleChange = (e)=>{
    //     setSlug({[e.target.name]:e.target.value})
    // }

    const hadnleImageUpload = (e) => {
        setImg(e.target.files[0].name)
        setRoompic(e.target.files[0])
    }
    const handleForm = async (input, e) => {
        e.preventDefault()
        reset()
        console.log('input', input)
        const formData = new FormData()

        formData.append('title', input.title ? input.title : room.title)
        formData.append('desc', short_description ? short_description : room.desc)
        formData.append('img', img) //for mongo
        formData.append('roompic', roompic) //for saving
        const response = await dispatch(updateroom({ formData, roomid }))
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
                                <h1><b>ROOM UPDATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/roomslist'>Rooms</Link></li>
                                    <li className="breadcrumb-item active">Update Room</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        {room &&
                            <div className="row">
                                {/* <!-- left column --> */}
                                <div className="col-md-12">
                                    {/* <!-- jquery validation --> */}
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Form To Edit Room</h3>
                                        </div>
                                        {/* <!-- /.card-header --> */}
                                        {/* <!-- form start --> */}

                                        <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                            <div className="card-body">

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Title</label>
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Room Title"
                                                        defaultValue={room.title}
                                                        {...register('title', formOptions.title)} />
                                                    <p className='error'>{errors.title?.message}</p>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Description</label>
                                                    <SunEditor
                                                    height="500"
                                                    setDefaultStyle="font-size: 16px;"
                                                        onChange={(event) => setShort_description(event)}
                                                        setContents={room.desc} />
                                                    
                                                </div>

                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Picture</label>
                                                            <input type="file" className="form-control"
                                                                placeholder="Enter Address"

                                                                name="img" onChange={hadnleImageUpload}
                                                            // {...register('img', formOptions.img)}
                                                            />
                                                            <p className='error'>{errors.img?.message}</p>
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
                        }
                        {/* <!-- /.row --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
            </div>
        </div>
    )
}



export default EditRoom
