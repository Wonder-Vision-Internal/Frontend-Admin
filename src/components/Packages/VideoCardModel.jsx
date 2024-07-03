import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const url = import.meta.env.VITE_BASE_API_URL;

function VideoCardModel({ setShow, show, formData, setFormData, getData }) {
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    const { __v, ...formDataWithoutV } = formData;
    try {
      const res = await axios.post(
        `${url}/update-package-youtube-url/${formData._id}`,
        {
          ...formDataWithoutV,
          slug: formData.slug,
        }
      );
      if (res.status === 200) {
        toastr.success("Successful Update");
        await getData();
      }
    } catch (error) {
      console.log("Erorr", error);
      toastr.error("Something went wrong");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* <!-- left column --> */}
                <div className="col-md-12">
                  {/* <!-- jquery validation --> */}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h5>Edit Form</h5>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <div
                      id="quickForm"
                      // onSubmit={handleSubmit(handleForm, handleError)}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">URL</label>

                              <textarea
                                type="text"
                                className="form-control"
                                placeholder="Enter URL"
                                name="url"
                                style={{
                                  width: "400px",
                                  height: "200px",
                                  resize: "none",
                                }}
                                onChange={handleChange}
                                value={formData?.url}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VideoCardModel;
