import "./cardlist.css";

interface ApiItem {
  fields: {
    title: string;
    price: number;
    photo: string;
  };
}

const CarList: React.FC<{ apiData: ApiItem[] }> = ({ apiData }) => {
  const apiData1 = apiData
  return (
    <div className="container">
      <div className="headerCarList"> <h3>Car List</h3></div>
      {apiData1.map((entry, index) => (
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
