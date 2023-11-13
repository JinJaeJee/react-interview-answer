import "./cart.css";

const Cart = () => {
  return (
    <div className="container">
      <div className="headerTitle">
        <h3> Cart </h3>
      </div>
      <div className="wholeItemListCart">
        <div className="cartListAndCost">
          <div className="AdditemList">
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              alt={`Car: `}
              style={{ width: "100px", height: "auto" }}
            />
          </div>
          <div className="cardInfo">
            <h2 className="carTitle">Title:</h2>
            <p className="carPrice">Price: </p>
          </div>
          <button>+</button>
          <p>1</p>
          <button>-</button>
        </div>
        <div className="costsum">
          <div className="totalPay">
            <p>Total</p>
            <p>1000 THB</p>
          </div>
          <div className="discountCheck">
            <div className="totalandDiscount">
              <p>Total</p>
              <input placeholder="Discount input" style={{ width: "100px", height: "15px" }}/>
            </div>
            <p>100 THB</p>
          </div>
          <div className="grandtotal">
            <p> Grand Total </p>
            <p> 880 THB </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;