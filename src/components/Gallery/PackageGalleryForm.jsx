import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { AllPackages, addhomestaypackagegallery} from '../../redux/Slice'
import { Link, useNavigate,useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const PackageGalleryForm = () => {

    const [packageDetails, setPackageDetails] = useState([{}])
    const [img, setImg] = useState()
    const [pic, setPic] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {galid} = useParams()

    const getPackages = async () => {
        const response = await dispatch(AllPackages())
        setPackageDetails(response.payload.packages)
        return
    }

    // console.log('package details', packageDetails)

    useEffect(() => {
        getPackages()
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
        text1: {
            // required: {
            //     value: true,
            //     message: '*Please Enter Text'
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

    const handleImageUpload = (e) => {
        setImg(e.target.files[0].name) //for mongodb
        setPic(e.target.files[0])  //for storage
    }
    const handleForm = async (input, e) => {
        e.preventDefault()
        reset()
        console.log('input', input)
        const formData = new FormData()
        let slug = input.slug
        // if(input.text1 != undefined){
            
        // }
        // else{
        //     formData.append('text1', '')
        // }
        formData.append('text1', input.text1)
        formData.append('img', img)
        formData.append('pic', pic)
        const response = await dispatch(addhomestaypackagegallery({ formData, slug }))
        console.log('add', response.payload.status)
        if (response.payload.status == 1) {
            navigate('/packagegallery')
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
                                <h1><b>GALLERY PICTURE CREATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/packagegallery'>Gallery</Link></li>
                                    <li className="breadcrumb-item active">Add Picture</li>
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
                                        <h3 className="card-title">Form To Create New Gallery Picture</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">
                                        {!galid ? 
                                          <div className="row">
                                          <div className="col-md-6">
                                              <div className="form-group">
                                                  <label>Package</label>
                                                  <select className="form-control select2" style={{ width: '100%' }}
                                                      {...register('slug', formOptions.slug)}>
                                                      <option value=''>Choose Package</option>
                                                      {packageDetails && packageDetails.map((data, index) => (
                                                          <option value={data.slug} key={index}>{data.title}</option>
                                                      ))}

                                                  </select>
                                                  <p className='error'>{errors.slug?.message}</p>
                                              </div>

                                          </div>
                                      </div>
                                        : null}
                                          

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Text 1</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Text"
                                                    {...galid ? defaultValue='a':null}
                                                    {...register('text1', formOptions.text1)} />
                                                <p className='error'>{errors.text1?.message}</p>
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



export default PackageGalleryForm
