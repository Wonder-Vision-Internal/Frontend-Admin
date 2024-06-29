import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AllPackages, FilteredPackages, deletepackage, hideunhidepackage } from '../../redux/Slice'

const PackageList = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [packageDetails, setPackageDetails] = useState([])
  const [filter, setFilter] = useState({ package_category: '' })


  const getPackages = async () => {
    const response = await dispatch(AllPackages())
    setPackageDetails(response.payload.packages)
  }

  console.log('package details', packageDetails)

  useEffect(() => {
    getPackages()
  }, [])



  const filterPackages = async () => {
    if (filter.package_category) {
      const response = await dispatch(FilteredPackages(filter.package_category))
      setPackageDetails(response.payload.packages)
    }
  }

  useEffect(() => {
    filterPackages()
  }, [filter])

  const handleChange = (e) => {
    setFilter({ [e.target.name]: e.target.value })
  }

  const handleHide = async (slug) => {
    const response = await dispatch(hideunhidepackage(slug))
    console.log('from hide', response);
    if (response.payload == 1 || response.payload == 2) {
      setTimeout(() => { window.location.reload(false) }, 1000)
    }
  }

  const handleDelete = async (slug) => {
    const response = await dispatch(deletepackage(slug))
    if (response.payload == 1) {
      setTimeout(() => { window.location.reload(false) }, 1000)
    }
  }

  return (
    <div>
      <Layout />
      {/* <!-- Content Wrapper. Contains page content --> */}
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>List of All Packages</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                  <li className="breadcrumb-item active">Package List</li>
                </ol>
              </div>
            </div>
          </div>
          {/* <!-- /.container-fluid --> */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {/* <div className="card-header"> */}
                  {/* <Button className='btn bg-gradient-primary' onClick={handleClick}>ADD PACKAGE</Button> */}
                  {/* <h3 className="card-title"></h3> */}
                  {/* </div> */}
                  {/* <!-- /.card-header --> */}
                  <div className="row" style={{
                    marginLeft: '20px',
                    marginTop: '10px'
                  }}>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Category</label>
                        <select name='package_category' onChange={handleChange}
                          className="form-control select2" style={{ width: '100%' }}>
                          <option value=''>Select Category</option>

                          <option value='beautiful_asia'>Beautiful Asia</option>
                          <option value='wild_africa'>Wild Africa</option>
                          <option value='incredible_india'>Incredible India</option>
                          <option value='colorful_festival'>Colorful Festival</option>
                          <option value='adventure_himalayas'>Adventure Himalayas</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="col-md-8 d-flex justify-content-end">
                      <Link to="/packages/addpackage" className='addition'>
                        <button type="button" className="btn bg-gradient-primary">
                          <i className="fas fa-plus"></i>&nbsp;NEW PACKAGE
                        </button>
                      </Link>

                      <Link to="/packages/addpackagetab" className='addition'>
                        <button type="button" className="btn bg-gradient-primary">
                          <i className="fas fa-plus"></i>&nbsp;NEW PACKAGE TAB
                        </button>
                      </Link>
                    </div>

                  </div>
                  <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Sl. No.</th>
                          <th>Category Name</th>
                          <th>Package Name</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packageDetails && packageDetails.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.package_category}</td>
                            <td>{data.title}</td>
                            <td>{data.status == '1' ? 'Open' : 'Blocked'}</td>
                            <td><Link to={`/packages/loadsinglepackage/${data.slug}`}><i className='fas fa-pen fas'></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {/* <i className='fas fa-trash' onClick={()=>handleDelete(data.slug)}></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                              <Link to={`/packages/viewsinglepackage/${data.slug}`}><i className='fas fa-info'></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <i className='fas fa-lock' onClick={() => handleHide(data.slug)}></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Sl. No.</th>
                          <th>Category Name</th>
                          <th>Package Name</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {/* <!-- /.card-body --> */}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default PackageList
