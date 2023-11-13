import logo from "./logo.svg";
import "./App.css";
import CarList from "./component/carlist/CarList";
import Cart from "./component/cart/Cart";



// const TokenApi = new Headers();
// TokenApi.append("Authorization", "Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o");

// // var formdata = new FormData();

// const requestOptions: RequestInit = {
//   method: 'GET',
//   headers: TokenApi,
// };

// fetch("https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result.items[0]))
//   .catch(error => console.log('error', error));


function App() {
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
        
        <div><CarList /></div>
        <div><Cart/></div>
      </div>
      <div className="app-footer">FOOTER</div>
    </div>
  );
}


export default App;
