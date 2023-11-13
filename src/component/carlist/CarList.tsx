import "./cardlist.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ApiItem {
  fields: {
    title: string;
    price: number;
    photo: string;
  };
}

const CarList: React.FC = () => {
  const [apiData, setApiData] = useState<ApiItem[]>([]);

  useEffect(() => {
    const apiUrl: string =
      "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car";
    const apiToken: string = "VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o";

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })
      .then((response) => {
        const data = response.data;

        const apiEntries: ApiItem[] = data.items;
        setApiData(apiEntries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="headerCarList"> <h3>Car List</h3></div>
      {apiData.map((entry, index) => (
        <div className="carList" key={index}>
          <img
            src={entry.fields.photo}
            alt={`Car: ${entry.fields.title}`}
            style={{ width: "100px", height: "auto" }}
          />
          <div className="cardInfo">
            <h2 className="carTitle">Title: {entry.fields.title}</h2>
            <p className="carPrice">Price: {entry.fields.price}</p>
          </div>
          <button className="AddToCartButton">Add To cart</button>
        </div>
      ))}
    </div>
  );
};

export default CarList;
