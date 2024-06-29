import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { loadsinglegallery, updategallery } from '../../redux/Slice'
import { Link, useNavigate,useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const EditHomeStayPackageGallery = () => {


    const {galid} = useParams()
    const {post_type} = useParams()
    const [gallery, setGallery] = useState(
        {
            // text1:'',
            // img:''
        }
        )

    const [img, setImg] = useState()
    const [pic, setPic] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getgallery = async () => {
        console.log('galid',galid);
        const response = await dispatch(loadsinglegallery(galid))
        console.log('gallery details', response.payload)
        setGallery(response.payload.galleryDetails)
        return
    }


    useEffect(() => {
        getgallery()
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {
      
        text1: {
            // required: {
            //     value: true,
            //     message: '*Please Enter Text'
            // }
        },
        img: {
            // required: {
            //     value: true,
            //     message: '*Please Choose Image'
            // }
        }
    }

    const hadnleImageUpload = (e) => {
        setImg(e.target.files[0].name) //for mongodb
        setPic(e.target.files[0])  //for storage
    }
    const handleForm = async (input, e) => {
        e.preventDefault()
        reset()
        console.log('input.text1', input)
        const formData = new FormData()
        // if(input.text1 !== ''){
        //     formData.append('text1', input.text1)
        // }
        // else{
        //     formData.append('text1', '')
        // }
        formData.append('text1', input.text1 ? input.text1 : gallery.text1)
        formData.append('img', img)
        formData.append('pic', pic)
        const response = await dispatch(updategallery({ formData, galid }))
        console.log('update gallery', response.payload.status)
        if (response.payload.status == 1) {
            if(post_type === 'packages'){
                navigate('/packagegallery')
            }
            else if(post_type === 'home_stay')
            navigate('/homestaygallery')
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
                                <h1><b>GALLERY UPDATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/homestaygallery'>Gallery</Link></li>
                                    <li className="breadcrumb-item active">Edit Gallery</li>
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
                                        <h3 className="card-title">Form To Update Gallery</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Text 1</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Author"
                                                    defaultValue={gallery.text1}
                                                    
                                                    {...register('text1', formOptions.text1)} />
                                                <p className='error'>{errors.text1?.message}</p>
                                            </div>

                                        

                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Picture</label>
                                                        <input type="file" className="form-control"
                                                            placeholder="Enter Address"
                                                            name="img" onChange={hadnleImageUpload}/>
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



export default EditHomeStayPackageGallery
