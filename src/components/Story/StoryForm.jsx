import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addstories, getAllHomeStay } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const StoryForm = () => {

  const [homestay, setHomeStay] = useState()
  const [img, setImg] = useState()
  const [pic, setPic] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { post_type } = useParams()

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
    author: {
      required: {
        value: true,
        message: '*Please Enter Author'
      }
    },
    content: {
      required: {
        value: true,
        message: '*Please Enter Content'
      }
    },
    address: {
      // required: {
      //   value: true,
      //   message: '*Please Enter Address'
      // }
    }
  }

  const handleChange = async (e) => {
    setImg(e.target.files[0].name) //for mongodb
    setPic(e.target.files[0])  //for storage
  }

  const handleForm = async (input) => {

    input.img = img
    input.pic = pic
    console.log('input', input)

    const formData = new FormData()

    formData.append('author', input.author)
    formData.append('content', input.content)
    formData.append('address', input.address)
    formData.append('img', img)
    formData.append('pic', pic)
    if (post_type) {
      formData.append('post_type', post_type)
    }
    else if (input.slug) {
      formData.append('slug', input.slug)
    }

    const response = await dispatch(addstories({ formData }))
    console.log('add', response.payload)
    if (response.payload == 1) {
      if (post_type) {
        navigate('/storieslist/testimonial')
      }
      else {
        navigate('/storieslist')
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
                <h1><b>STORY CREATION FORM</b></h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                  <li className="breadcrumb-item "><Link to='/storieslist'>Stories</Link></li>
                  <li className="breadcrumb-item active">Add Story</li>
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
                    <h3 className="card-title">Form To Create New Story</h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  {/* <!-- form start --> */}
                  <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                    <div className="card-body">
                      {!post_type ?
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Home Stay</label>
                              <select className="form-control select2" style={{ width: '100%' }}
                                {...register('slug', formOptions.slug)} >
                                <option value=''>Choose Home Stay</option>
                                {homestay && homestay.map((data, index) => (
                                  <option value={data.slug} key={index}>{data.title}</option>
                                ))}

                              </select>
                              <p className='error'>{errors.slug?.message}</p>
                            </div>

                          </div>
                        </div> : null}

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Author</label>
                        <input type="text" className="form-control"
                          placeholder="Enter Author"
                          {...register('author', formOptions.author)} />
                        <p className='error'>{errors.author?.message}</p>
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Content</label>
                        <textarea type="text" name="content" className="form-control"
                          placeholder="Enter Content"
                          {...register('content', formOptions.content)}></textarea>
                        <p className='error'>{errors.content?.message}</p>
                      </div>

                      <div className='row'>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Address</label>
                            <input type="text" className="form-control"
                              placeholder="Enter Address"
                              {...register('address', formOptions.address)} />
                            <p className='error'>{errors.address?.message}</p>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">User Image</label>
                            <input type="file" className="form-control"
                              placeholder="Choose User Image"
                              onChange={handleChange} />

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

export default StoryForm
