import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { loadsinglebanner, updatebanner} from '../../redux/Slice'
import { Link, useNavigate,useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const EditBanner = () => {

    const [banner, setBanner] = useState()

    const [img, setImg] = useState()
    const [pic, setPic] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {bannerid} = useParams()

    const loadbannerdata = async () => {
        console.log('bannerid edit',bannerid);
        const response = await dispatch(loadsinglebanner(bannerid))
        console.log('single banner', response.payload.bannerData)
        setBanner(response.payload.bannerData)
        return
    }

    useEffect(() => {
        loadbannerdata()
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {
     
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

        formData.append('text1', input.text1 ? input.text1 : banner.text1)
        formData.append('text2', input.text2 ? input.text2 : banner.text2)
        formData.append('img', img)
        formData.append('pic', pic)
        const response = await dispatch(updatebanner({ formData, bannerid}))
        console.log('add', response.payload.status)
        if (response.payload.status == 1) {
            navigate('/home')
            // navigate(`/banner/${page_name}`)
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
                                <h1><b>BANNER UPDATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    {/* <li className="breadcrumb-item "><Link to={`/banner/${page_name}`}>Banners</Link></li> */}
                                    <li className="breadcrumb-item active">Update Banner</li>
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
                                        <h3 className="card-title">Form To Update Banner</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">
                                           
                                            
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Text 1</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Author"
                                                    defaultValue={banner && banner.text1}
                                                    {...register('text1', formOptions.text1)} />
                                                <p className='error'>{errors.text1?.message}</p>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Text 2</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Content"
                                                    defaultValue={banner && banner.text2}
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



export default EditBanner
