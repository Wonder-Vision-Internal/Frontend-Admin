import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../Layout";
import {
  getpermissionsbyid,
  getsidebarmodules,
  updatepermissions,
} from "../../redux/Slice";
import { Link, useParams } from "react-router-dom";

const Permission = () => {

  const dispatch = useDispatch();
  const [permissions, setPermissions] = useState([]);
  const [modules, setModules] = useState([]);
  const { emp_id } = useParams();

  const getSidebarModules = async () => {
    let userType = await localStorage.getItem('userType')
    const formData = new FormData()
    formData.append('userType', userType)
    const response = await dispatch(getsidebarmodules(formData));
    
    setModules(response.payload.sidemodules);
  };
  useEffect(() => {
    getSidebarModules();
  }, []);


  const fetchPermissions = async () => {
    const response = await dispatch(getpermissionsbyid(emp_id));
    // console.log("permissions", response);
    setPermissions(response.payload.permissionData.modules);
  {permissions && console.log('per',permissions);}
  };
  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(()=>{
console.log('check',permissions);
  },[permissions])

  const handleChange = (mod_name, link, sub_mod_name, sub_mod_obj) => {

    if (sub_mod_name == undefined) {

      let len = permissions.length
      permissions.map((x, i) => {
        if (x.module_name === mod_name) {
          console.log('hello');
          permissions.splice(i, 1)
          setPermissions([...permissions])
          return
        }
      })

      if (len == permissions.length) {
        console.log('hi');
        setPermissions((prev) => [...prev, {
          module_name: mod_name,
          module_access: "1",
          link: link,
          sub_module: [],
        }])
      }
    } else {

      //Addition of fresh new sub_module
      let hasValue = permissions.some((obj) => obj['module_name'] === mod_name)
      console.log('hasValue', hasValue);
      let sub_arr = [{}]
      if (!hasValue) {
        console.log('sub_mod_obj', sub_mod_obj);
        sub_mod_obj.sub_mod_access = '1'
        sub_arr[0] = sub_mod_obj
        
        // permissions.push({ module_name: mod_name, sub_module: sub_arr })
        setPermissions((prev) => [...prev,
        {
          module_name: mod_name, sub_module: sub_arr
        }])
        // setPermissions([...permissions])
        return
      }
      else {
        let len, i, existingArr
        permissions.map((data, index) => {
          if (data.module_name === mod_name) {

            if (data.sub_module.length > 0) {
              len = data.sub_module.length
              i = index
              existingArr = [...data.sub_module]
              return
            }
          }
        })
        //Deletion from existing existing sub_module list
        permissions.map((data, index) => {
          if (data.module_name === mod_name) {
            data.sub_module.map((x, idx) => {
              if (x.sub_mod_name === sub_mod_name && x.sub_mod_access == 1) {
                if (data.sub_module.length == 1) {
                  
                  permissions.splice(index, 1)
                  setPermissions([...permissions])
                } else {
                  data.sub_module.splice(idx, 1)
                  setPermissions([...permissions])
                }
                
                return
              }
            })
          }
        })

        //Addition to an existing sub_module
        if (len > 0) {
          if (permissions[i].sub_module.length > 0 && len == permissions[i].sub_module.length) {
            console.log('entered');
            sub_mod_obj.sub_mod_access = '1'
            existingArr.push(sub_mod_obj)
            permissions[i].sub_module = existingArr
            setPermissions([...permissions])
          }
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("permi", permissions);
    const formData = new FormData();
    formData.append("permissions", JSON.stringify(permissions));
    formData.append('emp_id', emp_id)
    const resonse = await dispatch(updatepermissions(formData));
    // console.log("after updation", resonse.payload);
    // if (resonse.payload.status == 1) {
    //   fetchPermissions();
    // }
  };

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
                {/* {token && ( */}
                <h1>Set Permissions for {`${emp_id}`} </h1>
                {/* //  )}  */}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/stafflist">Set Permissions</Link>
                  </li>
                  <li className="breadcrumb-item active">Permissions</li>
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
                  <div className="card-body">
                    {modules && permissions && (
                      <table id="example1" className="table table-bordered ">
                        <thead>
                          <tr>
                            <th>Module Name</th>
                            <th>Module Access</th>
                            <th>Sub Module Name</th>
                            <th>Sub Module Access</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modules.map((data, index) => (
                            <tr key={index}>
                              <td>{data.module_name}</td>

                              <td>
                                {data.sub_module.length == 0 && (
                                  <input
                                    type="checkbox"
                                    checked={permissions.some((x) => {
                                      return (
                                        x.module_name === data.module_name &&
                                        x.module_access == 1
                                      );
                                    })}
                                    onChange={() =>
                                      handleChange(data.module_name, data.link, undefined, undefined)
                                    }
                                  />
                                )}
                              </td>

                              <td>
                                <table className="table table-bordered">
                                  <tbody>
                                    {data.sub_module.map((x, index) => (
                                      <tr key={index}>
                                        <td>{x.sub_mod_name}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                              <td>
                                <table className="table table-bordered">
                                  <tbody>
                                    {data.sub_module.map((x, idx) => (
                                      <tr key={idx}>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={permissions.some((y) => {
                                              return y.sub_module.some((z) => {
                                                return (
                                                  y.module_name === data.module_name &&
                                                  z.sub_mod_name ===
                                                  x.sub_mod_name &&
                                                  z.sub_mod_access == 1
                                                );
                                              });
                                            })}
                                            onChange={() =>
                                              handleChange(data.module_name, undefined, x.sub_mod_name, x)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Module Name</th>
                            <th>Module Access</th>
                            <th>Sub Module Name</th>
                            <th>Sub Module Access</th>
                          </tr>
                        </tfoot>
                      </table>
                    )}
                  </div>

                  {/* <!-- /.card-body --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <form onSubmit={handleSubmit}>
          <button className="btn btn-primary ml-3 mb-5">Submit</button>
          
        </form>
      </div>
    </div>
  );
};

export default Permission;
