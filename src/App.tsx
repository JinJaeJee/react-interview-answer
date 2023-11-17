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
  fields: {
    title: string;
    price: number;
    photo: string;
    qty: number;
  };
}

const App: React.FC = () => {
  const [apiData, setApiData] = useState<ApiItem[]>([]);
  const initialCartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );

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

  const [cartItems, setcartItems] = useState<CartItem[]>(initialCartItems);

  ///////// AddItem/////////
  const onAdd = (product: ApiItem): void => {
    const exist = cartItems.find(
      (x) => x.fields.title === product.fields.title
    );
    if (exist) {
      setcartItems((prevCartItems) =>
        prevCartItems.map((x) =>
          x.fields.title === product.fields.title
            ? {
                ...x,
                fields: {
                  ...x.fields,
                  qty: x.fields.qty + 1,
                },
              }
            : x
        )
      );
    } else {
      setcartItems((prevCartItems) => [
        ...prevCartItems,
        { fields: { ...product.fields, qty: 1 } },
      ]);
    }
  };
  ///////////// Remove Items //////////////
  const onRemove = (product: ApiItem): void => {
    const exist = cartItems.find(
      (x) => x.fields.title === product.fields.title
    );

    if (exist && exist.fields.qty === 1) {
      setcartItems((prevCartItems) =>
        prevCartItems.filter((x) => x.fields.title !== product.fields.title)
      );
    } else {
      setcartItems((prevCartItems) =>
        prevCartItems.map((x) =>
          x.fields.title === product.fields.title
            ? { ...x, fields: { ...x.fields, qty: x.fields.qty - 1 } }
            : x
        )
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <div className="app-header">
        <img src={logo} alt="logo" /> <span>Drivehub</span>
      </div>
      <div>XX</div>
      <div>Sorted Component</div>
      <div>Search Component</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "20px",
          marginBottom: "130px",
        }}
      >
        <div>
          <CarList apiData={apiData} onAdd={onAdd} />
        </div>
        <div>
          <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
        </div>
      </div>
      <div className="app-footer">FOOTER</div>
    </div>
  );
};

export default App;
