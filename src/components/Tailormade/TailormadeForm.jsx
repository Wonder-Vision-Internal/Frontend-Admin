import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addtailormade, get_tailormade, updatetailormade } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const TailormadeForm = () => {

    const [img, setImg] = useState()
    const [pic, setPic] = useState()
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { type } = useParams()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const handleError = (errors) => {};

      const fetchTailormade = async () => {
        const response = await dispatch(get_tailormade());
        console.log("tailormade", response.payload.tailorData);
        return;
    };

    useEffect(() => {
        fetchTailormade()
    }, [])

    const formOptions = {
        
        video_link: {
            //   required: {
            //     value: true,
            //     message: "*Please Enter Title",
            //   },
            }
    }
    const handleImageUpload = (e) => {
        setImg(e.target.files[0].name)
        setPic(e.target.files[0])
    }
    const handleForm = async (data,e) => {
        e.preventDefault()
        reset()
        let formData = new FormData()
        console.log('pic',pic);
        if(type === 'picture'){
            formData.append('type',type)
            formData.append('featured_img',img)
            formData.append('pic',pic)
        }
        else{
            formData.append('type',type)
            formData.append('video_link',data.video_link)
        }
            
        console.log('data',data);
        const response = await dispatch(addtailormade( formData ))
        console.log('add', response.payload.status)
        if (response.payload.status == 1) {
                navigate('/tailormade')  
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
                               <h1><b>NEW TAILORMADE</b></h1>
                                    

                            </div>
                            <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/tailormade'>Tailormade</Link></li>
                                    <li className="breadcrumb-item active">New Tailormade</li>
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
                                       <h3 className="card-title">Form To Create New Tailormade</h3>
                                               
                                     

                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    
                                     <form id="quickForm"  onSubmit={handleSubmit(handleForm, handleError)}>
                                     <div className="card-body">
                                        {type === 'picture' ? 
                                        <div className='row'>
                                        <div className='col-md-6'>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Picture</label>
                                                <input type="file" className="form-control"
                                                    placeholder="Choose Picture"
                                                    name="img" onChange={handleImageUpload}
                                                   
                                                    />
                                            </div>
                                        </div>
                                    </div> :
                                    <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Video Link</label>
                                            <input type="text" className="form-control"
                                                placeholder="Enter Video Link"
                                                
                                               {...register('video_link',formOptions.video_link)}
                                                />
                                        </div>
                                    </div>
                                </div>}
                                         
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



export default TailormadeForm
