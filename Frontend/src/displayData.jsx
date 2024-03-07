import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DisplayData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getDbData");
        const fetchedData = response.data.data;

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

  const handleClick = (id) => {};

  return (
    <section>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Productimage</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Category</th>
            <th scope="col">Owner</th>
            <th scope="col">Update</th>
            <th scope="col">Detele</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => (
            <tr key={element._id}>
              <th scope="row">{element._id}</th>
              <td>{element.name}</td>
              <td>{element.description}</td>
              <td>
                {element.productimage ? (
                  <img
                    src={`${element.productimage}`}
                    alt="Product Image"
                    width={200}
                    height={200}
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td>{element.price}</td>
              <td>{element.stock}</td>
              <td>{element.category}</td>
              <td>{element.owner}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    handleClick(element._id);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="link-underline-secondary">
        Go To Home
      </Link>
    </section>
  );
};

export default DisplayData;
