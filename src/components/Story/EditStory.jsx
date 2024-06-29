import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { loadsinglestory, updatestory } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const EditStory = () => {
  const [img, setImg] = useState()
  const [pic, setPic] = useState()
  const [story, setStory] = useState({
    author:'',
    content:'',
    address:''
  })
  const [input,setInput] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { storyid } = useParams()
  const { post_type } = useParams()

  const getstory = async () => {
    const response = await dispatch(loadsinglestory(storyid))
    console.log('story details', response.payload.storyDetails)
    setStory(response.payload.storyDetails)
    return
  }

  useEffect(() => {
    getstory()
  }, [])

 const handleChange = (e)=>{
  setInput({...input,[e.target.name]:e.target.value})
 }

 const handleImage=async(e)=>{
  setImg(e.target.files[0].name) //for mongodb
  setPic(e.target.files[0])  //for storage
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('input', input)
    const formData = new FormData()
    
    formData.append('author',input.author ? input.author : story.author)
    formData.append('content',input.content ? input.content : story.content)
    formData.append('address',input.address ? input.address : story.address)
    formData.append('img',img)
    formData.append('pic',pic)
    const response = await dispatch(updatestory({formData,storyid}))
    console.log('add', response.payload)
    if (response.payload.status == 1) {
      if(post_type){
        navigate('/storieslist/testimonial')
      }
      else{
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
                <h1><b>STORY UPDATION FORM</b></h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                  <li className="breadcrumb-item "><Link to='/storieslist'>Stories</Link></li>
                  <li className="breadcrumb-item active">Edit Story</li>
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
                    <h3 className="card-title">Form To Edit Story</h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  {/* <!-- form start --> */}
                  <form id="quickForm" onSubmit={handleSubmit} >
                    <div className="card-body">

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Author</label>
                        <input type="text" name='author' className="form-control"
                          placeholder="Enter Author"
                          defaultValue={story.author}
                          onChange={handleChange}
                          />
                        {/* <p className='error'>{errors.author?.message}</p> */}
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Content</label>
                        <textarea type="text"  className="form-control"
                          name='content' placeholder="Enter Content"
                          defaultValue={story.content}
                          onChange={handleChange}></textarea>
                        {/* <p className='error'>{errors.content?.message}</p> */}
                      </div>

                      <div className='row'>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Address</label>
                            <input type="text" className="form-control"
                              name='address' placeholder="Enter Address"
                              defaultValue={story.address}
                              onChange={handleChange}/>
                            {/* <p className='error'>{errors.address?.message}</p> */}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">User Image</label>
                            <input type="file" className="form-control"
                              placeholder="Choose User Image"
                             onChange={handleImage}/>
                            
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

export default EditStory
