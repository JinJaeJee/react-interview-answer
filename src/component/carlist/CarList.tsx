import "./cardlist.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ApiItem {
  fields: {
    title: string;
    price: number;
    photo: string;
  };
}

const CarList: React.FC = () => {

  const [apiData, setApiData] = useState<ApiItem[]>([]);

  useEffect(() =>{

    const apiUrl: string = 'https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car'
    const apiToken: string = 'VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o';

    axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiToken}`
      }
    })
    .then(response => {
      const data = response.data;

      const apiEntries: ApiItem[] = data.items;
      setApiData(apiEntries);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);



  return (
    <div>
      {apiData.map((entry, index) => (
        <div key={index}>
          <h2>Title: {entry.fields.title}</h2>
          <p>Price: {entry.fields.price}</p>
          <img src={entry.fields.photo} alt={`Photo for ${entry.fields.title}`} style={{ width: '200px', height: 'auto' }} />
        </div>
      ))}
    </div>
  );

    
    
}

export default CarList