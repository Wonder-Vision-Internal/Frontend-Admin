import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addbottombanner, getAllHomeStay, updatebottombanner } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const BottomBannerForm = () => {

    const [homestay, setHomeStay] = useState()
    const { bannerId } = useParams()
    const [img, setImg] = useState()
    const [bannerPic, setBannerPic] = useState()
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
        img: {
            required: {
                value: true,
                message: '*Please Choose Image'
            }
        }
    }

    const handleImageUpload = (e) => {
        setImg(e.target.files[0].name)
        setBannerPic(e.target.files[0])
    }
    const handleForm = async (input, e) => {
        e.preventDefault()
        reset()
        console.log('pic1', img)
        console.log('pic2', bannerPic)
        const formData = new FormData()
        let slug = input.slug

        formData.append('img', img)
        formData.append('bannerPic', bannerPic)
        if (bannerId) {
            const response = await dispatch(updatebottombanner({ formData, bannerId }))
            console.log('add', response.payload.status)
            if (response.payload.status == 1) {
                navigate('/bottombannerhomestay')
            }
        }
        else {
            const response = await dispatch(addbottombanner({ formData, slug }))
            console.log('add', response.payload.status)
            if (response.payload.status == 1) {
                navigate('/bottombannerhomestay')
            }
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
                                {bannerId ? <h1><b>BOTTOM BANNER UPDATION FORM</b></h1>
                                    : <h1><b>BOTTOM BANNER CREATION FORM</b></h1>}

                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/bottombannerhomestay'>Bottom Banner</Link></li>
                                    {bannerId ? <li className="breadcrumb-item active">Update Bottom Banner</li>
                                        : <li className="breadcrumb-item active">Add Bottom Banner</li>}

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
                                        {bannerId ? <h3 className="card-title">Form To Update Bottom Banner</h3>
                                            : <h3 className="card-title">Form To Create New Bottom Banner</h3>}

                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">
                                            {!bannerId ? <div className="row">
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
                                            </div> : null}




                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Bottom Banner</label>
                                                        <input type="file" className="form-control"
                                                            placeholder="Enter Bottom Banner"
                                                            name="img" onChange={handleImageUpload}

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
                        {/* <!-- /.row --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
            </div>
        </div>
    )
}



export default BottomBannerForm
