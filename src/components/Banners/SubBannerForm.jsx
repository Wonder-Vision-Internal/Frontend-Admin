import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { AllPackages, addsubbanner, getAllHomeStay, getallblogs } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const SubBannerForm = () => {

    const [home_package_blog, setHomePackageBlog] = useState()

    const [img, setImg] = useState()
    const [pic, setPic] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {page_name} = useParams()

    const gethomestaynames = async () => {
        const response = await dispatch(getAllHomeStay())
        console.log('home stay names', response.payload.details)
        setHomePackageBlog(response.payload.details)
        return
    }

    const getpackagenames = async () => {
        const response = await dispatch(AllPackages())
        setHomePackageBlog(response.payload.packages)
        return
    }

    const getblognames = async () => {
        const response = await dispatch(getallblogs())
        setHomePackageBlog(response.payload.allBlogs)
        return
    }
    useEffect(() => {
        if(page_name === 'homestay'){
            gethomestaynames()
        }
        else if(page_name === 'packages'){
            getpackagenames()
        }
        else if(page_name === 'blogs'){
            getblognames()
        }
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {

        slug: {
            required: {
                value: true,
                message: '*Please Choose Any One'
            }
        },
        text1: {
            // required: {
            //     value: true,
            //     message: '*Please Enter Title'
            // }
        },
        text2: {
            // required: {
            //     value: true,
            //     message: '*Please Enter Description'
            // }
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
        setPic(e.target.files[0])
    }
    const handleForm = async (input, e) => {
        e.preventDefault()
        reset()

        const formData = new FormData()

        formData.append('slug', input.slug)
        formData.append('text1', input.text1)
        formData.append('text2', input.text2)
        formData.append('img', img)
        formData.append('pic', pic)
        const response = await dispatch(addsubbanner(formData))
        console.log('add', response.payload.status)
        if (response.payload.status == 1) {
            navigate(`/banner/${page_name}`)
            // navigate('/home')
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
                                <h1><b>BANNER CREATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    {/* <li className="breadcrumb-item "><Link to={`/banner/${page_name}`}>Banners</Link></li> */}
                                    <li className="breadcrumb-item active">Add Banner</li>
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
                                        <h3 className="card-title">Form To Create New Banner</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">
                                         
                                            <div className="row">
                                                <div className="col-md-6">

                                                { page_name === 'homestay' ?
                                                    <div className="form-group">
                                                        <label>Home Stay</label>
                                                        <select className="form-control select2" style={{ width: '100%' }}
                                                            {...register('slug', formOptions.slug)}>
                                                            <option value=''>Choose Home Stay</option>
                                                            {home_package_blog && home_package_blog.map((data, index) => (
                                                                <option value={data.slug} key={index}>{data.title}</option>
                                                            ))}

                                                        </select>
                                                        <p className='error'>{errors.slug?.message}</p>
                                                    </div>
                                              
                                            : page_name === 'packages' ?
                                            <div className="form-group">
                                            <label>Packages</label>
                                            <select className="form-control select2" style={{ width: '100%' }}
                                                {...register('slug', formOptions.slug)}>
                                                <option value=''>Choose Package</option>
                                                {home_package_blog && home_package_blog.map((data, index) => (
                                                    <option value={data.slug} key={index}>{data.title}</option>
                                                ))}

                                            </select>
                                            <p className='error'>{errors.slug?.message}</p>
                                        </div> 
                                        : page_name === 'blogs' ?
                                        <div className="form-group">
                                        <label>Blogs</label>
                                        <select className="form-control select2" style={{ width: '100%' }}
                                            {...register('slug', formOptions.slug)}>
                                            <option value=''>Select Blog Name</option>
                                            {home_package_blog && home_package_blog.map((data, index) => (
                                                <option value={data.slug} key={index}>{data.title}</option>
                                            ))}

                                        </select>
                                        <p className='error'>{errors.slug?.message}</p>
                                    </div> 
                                        : null
                                        }
                                        </div>
                                        </div> 
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Text 1</label>
                                                <input type="text1" className="form-control"
                                                    placeholder="Enter Text 1"
                                                    {...register('text1', formOptions.text1)} />
                                                <p className='error'>{errors.text1?.message}</p>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Text 2</label>
                                                <input type="text2" className="form-control"
                                                    placeholder="Enter Text 2"
                                                    {...register('text2', formOptions.text2)}></input>
                                                <p className='error'>{errors.text2?.message}</p>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Banner</label>
                                                        <input type="file" className="form-control"
                                                            placeholder="Enter Address"
                                                            name="img" onChange={hadnleImageUpload}

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



export default SubBannerForm
