import logo from "./logo.svg";
import "./App.css";
import CarList from "./component/carlist/CarList";
import Cart from "./component/cart/Cart";
import axios from "axios";
import React, { useEffect, useState } from "react";


interface ApiItem {
  fields: {
    title: string;
    price: number;
    photo: string;
  };
}

interface CartItem {
  title: string;
  price: number;
  photo: string;
  qty: number;
}


const App: React.FC = () => {

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

  ///////// AddItem RemoveItem /////////
  const [cartItems,setcartItems] = useState<CartItem[]>([])
  // const allFields = apiData.map(item => item.fields);
  const onAdd = (product: ApiItem): void =>{
    const exist = cartItems.find((x) => x.title === product.fields.title);
    if (exist) {
      setcartItems(
        cartItems.map((x) =>
          x.title === product.fields.title ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setcartItems([...cartItems, { ...product.fields, qty: 1 }]);
    }}
  



  return (
    <div>
      <div className="app-header">
        <img src={logo} alt="logo" /> <span>Drivehub</span>
      </div>
      <div>XX</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "20px",
          marginBottom: "130px",
        }}
      >
        
        <div><CarList apiData={apiData} /></div>
        <div><Cart/></div>
      </div>
      <div className="app-footer">FOOTER</div>
    </div>
  );
}


export default App;
