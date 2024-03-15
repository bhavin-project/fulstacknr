import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

let fetchedData = [];
const DisplayData = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getDbData`);
        fetchedData = response.data.data;
        // Fetch category data for each item concurrently
        const categoryPromises = fetchedData.map((element) =>
          fetchCategory(element.category)
        );
        const categories = await Promise.all(categoryPromises);

        // Combine data with categories
        const combinedData = fetchedData.map((element, index) => ({
          ...element,
          category: categories[index],
        }));

        setData(combinedData);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };
    fetchData();
  }, []);

  const fetchCategory = async (categoryId) => {
    try {
      if (categoryId !== undefined) {
        const response = await axios.post(
          "http://localhost:3000/api/getCategoryName",
          {
            categoryId: categoryId,
          }
        );
        return response.data.categoryName;
      } else {
        return "N/A";
      }
    } catch (error) {
      console.log("Failed", error);
      return "N/A";
    }
  };

  const handleEdit = (id) => {
    const dataofitem = fetchedData.find((item) => item._id === id);
    navigate(`/registration`, { state: { data: dataofitem } });
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmation) {
      const response = await axios.post(
        "http://localhost:3000/api/deleteitem",
        {
          deleteId: id,
        }
      );
      alert(response.data.message);
    }
    window.location.reload();
  };

  const data1 = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 270,
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 200,
      },
      {
        label: "Productimage",
        field: "productimage",
        sort: "asc",
        width: 200,
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 200,
      },
      {
        label: "Stock",
        field: "stock",
        sort: "asc",
        width: 200,
      },
      {
        label: "Category",
        field: "category",
        sort: "asc",
        width: 200,
      },
      {
        label: "Owner",
        field: "owner",
        sort: "asc",
        width: 200,
      },
      {
        label: "Update",
        field: "update",
        sort: "asc",
        width: 200,
      },
      {
        label: "Detele",
        field: "delete",
        sort: "asc",
        width: 100,
      },
    ],
    rows: data.map((element) => ({
      id: element._id,
      name: element.name,
      description: element.description,
      productimage: element.productimage ? (
        <img
          src={`${element.productimage}`}
          alt="Product Image"
          width={200}
          height={200}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = ""; // Clear the src attribute to avoid repeated error event
            e.target.style.display = "none"; // Hide the broken image
            e.target.nextSibling.style.display = "block"; // Show the error message
          }}
        />
      ) : (
        <span className="text-muted">Image not available</span>
      ),

      price: element.price,
      stock: element.stock,
      category: element.category,
      owner: element.owner,
      update: (
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            handleEdit(element._id);
          }}
        >
          Edit
        </button>
      ),
      delete: (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            handleDelete(element._id);
          }}
        >
          Delete
        </button>
      ),
    })),
  };

  return (
    <section>
      <MDBDataTable striped bordered small data={data1} />

      {/* //   <table className="table table-striped">
    //     <thead>
    //       <tr>
    //         <th scope="col">#</th>
    //         <th scope="col">Name</th>
    //         <th scope="col">Description</th>
    //         <th scope="col">Productimage</th>
    //         <th scope="col">Price</th>
    //         <th scope="col">Stock</th>
    //         <th scope="col">Category</th>
    //         <th scope="col">Owner</th>
    //         <th scope="col">Update</th>
    //         <th scope="col">Detele</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.map((element) => (
    //         <tr key={element._id}>
    //           <th scope="row">{element._id}</th>
    //           <td>{element.name}</td>
    //           <td>{element.description}</td>
    //           <td>
    //             {element.productimage ? (
    //               <img
    //                 src={`${element.productimage}`}
    //                 alt="Product Image"
    //                 width={200}
    //                 height={200}
    //                 onError={(e) => {
    //                   e.target.onerror = null; // Prevent infinite loop
    //                   e.target.src = ""; // Clear the src attribute to avoid repeated error event
    //                   e.target.style.display = "none"; // Hide the broken image
    //                   e.target.nextSibling.style.display = "block"; // Show the error message
    //                 }}
    //               />
    //             ) : (
    //               <span className="text-muted">Image not available</span>
    //             )}
    //             <span className="text-muted" style={{ display: "none" }}>
    //               Image not available
    //             </span>
    //           </td>
    //           <td>{element.price}</td>
    //           <td>{element.stock}</td>
    //           <td>{element.category}</td>
    //           <td>{element.owner}</td>
    //           <td>
    //             <button
    //               type="button"
    //               className="btn btn-success"
    //               onClick={() => {
    //                 handleEdit(element._id);
    //               }}
    //             >
    //               Edit
    //             </button>
    //           </td>
    //           <td>
    //             <button
    //               type="button"
    //               className="btn btn-danger"
    //               onClick={() => {
    //                 handleDelete(element._id);
    //               }}
    //             >
    //               Delete
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table> */}

      <Link to="/" className="link-underline-secondary">
        Go To Home
      </Link>
    </section>
  );
};

export default DisplayData;
