import { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";

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

interface DiscountItem {
  amount: number;
  code: string;
}

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: ApiItem) => void;
  onRemove: (product: ApiItem) => void;
}

const Cart: React.FC<CartProps> = (props) => {
  const { cartItems, onAdd, onRemove } = props;
  const [discountData, setDiscountData] = useState<DiscountItem[]>([]);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  useEffect(() => {
    const discountApiUrl: string =
      "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount";
    const apiToken: string = "VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o";

    axios
      .get(discountApiUrl, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const discountItems: DiscountItem[] = data.items.map((item: any) => {
          return {
            amount: item.fields.amount,
            code: item.fields.code,
          };
        });
        setDiscountData(discountItems);
      })
      .catch((error) => {
        console.error("Error fetching discount data:", error);
      });
  }, []);

  const [discountInput, setDiscountInput] = useState<string>("");
  console.log(discountData);
  // console.log(discountInput);

  useEffect(() => {
    applyDiscount();
  }, [discountInput, cartItems, discountData]);

  const applyDiscount = (): void => {
    const cleanedDiscountInput = discountInput.trim().toLowerCase();
    const discountItem = discountData.find(
      (discount) => discount.code.trim().toLowerCase() === cleanedDiscountInput
    );
    if (discountItem) {
      setDiscountAmount(discountItem.amount);
      cartItems.map((item) => {
        const discountedPrice = Math.max(
          0,
          item.fields.price - discountItem.amount
        );
        return {
          ...item,
          fields: {
            ...item.fields,
            price: discountedPrice,
          },
        };
      });
    } else {
      setDiscountAmount(0);
    }
  };

  const calculateGrandTotal = (): number => {
    const totalBeforeDiscount = cartItems.reduce(
      (total, item) => total + item.fields.price * item.fields.qty,
      0
    );

    return Math.max(0, totalBeforeDiscount - discountAmount);
  };

  return (
    <div className="container">
      <div className="headerTitle">
        <h3> Cart </h3>
      </div>

      <div className="wholeItemListCart">
        {cartItems.map((entry, index) => (
          <div className="cartListAndCost" key={index}>
            <div className="AdditemList">
              <img
                src={entry.fields.photo}
                alt={`Car: ${entry.fields.title}`}
                style={{ width: "100px", height: "auto" }}
              />
            </div>
            <div className="cardInfo">
              <h2 className="carTitle">{`Title: ${entry.fields.title}`}</h2>
              <p className="carPrice">{`Price: ${entry.fields.price} THB/DAY`}</p>
            </div>
            <button onClick={() => onAdd(entry)}>+</button>
            <p>{entry.fields.qty}</p>
            <button onClick={() => onRemove(entry)}>-</button>
          </div>
        ))}
        <div className="costsum">
          <div className="totalPay">
            <p>Total</p>
            <p>{`${cartItems.reduce(
              (total, item) => total + item.fields.price * item.fields.qty,
              0
            )} THB`}</p>
          </div>
          <div className="discountCheck">
            <div className="totalandDiscount">
              <p>Total</p>
              <input
                placeholder="Discount input"
                style={{ width: "100px", height: "15px" }}
                value={discountInput}
                onChange={(e) => {
                  setDiscountInput(e.target.value);
                }}
              />
            </div>
            <p>{`${discountAmount} THB`}</p>
          </div>
          <div className="grandtotal">
            <p> Grand Total </p>
            <p>{` ${calculateGrandTotal()} THB`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
