import axios from "axios";
import React from "react";
import Table from "react-bootstrap/Table";
const url = import.meta.env.VITE_BASE_API_URL;

function VideoCardTable({ setShow, setFormData, getDataapi, getData }) {
  const handleShow = (item) => {
    setShow(true);
    setFormData(item);
  };

  const handleDelete = async (value) => {
    try {
      let res = await axios.delete(
        `${url}/delete-package-youtube-url/${value}`
      );
      if (res.status === 200) {
        toastr.success("Successful Delete");
        await getData();
      }
    } catch (error) {
      console.log("Erorr", error);
      toastr.error("Something went wrong");
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>URL</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {getDataapi.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <div
                className="col-md-4 position-relative mb-4"
                dangerouslySetInnerHTML={{
                  __html: item.url,
                }}
              ></div>
            </td>
            <td
              style={{
                display: "flex",
                justifyContent: "space-around",
                cursor: "pointer",
              }}
            >
              <div onClick={() => handleShow(item)}>
                <i className="fas fa-pen fas"></i>
              </div>
              <div>
                <i
                  className="fas fa-trash"
                  onClick={() => handleDelete(item._id)}
                ></i>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default VideoCardTable;
