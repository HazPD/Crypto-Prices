import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css"

function App() {
  
  const [search,setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': 'W+ltgI1BupN784/XqPebleAclvIBOoM5vwSO3WHIkiQ='
      }
    };
  
    fetch("https://openapiv1.coinstats.app/coins", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Check the structure of 'data'
      setCrypto(data.result || []); // Adjust according to actual response structure
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);


  return (
    <div className="Main">
        <h1>CryptoCurrency Prices</h1>                  
        <input
          type="text"
          placeholder="search"
          onChange = {(e) => {
            setSearch(e.target.value)
          }}
        />      
        <table>
          <thead>
              <tr>
                  <td>Rank</td>
                  <td>Name</td>
                  <td>Symbol</td>
                  <td>Market Cap</td>
                  <td>Price</td>
                  <td>Available Supply</td>
                  <td>Volume(24hrs)</td>
              </tr>
          </thead>

          <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Loading data...
                    </td>
                  </tr>
                ) : crypto.length > 0 ? (
                  crypto
                    .filter((val) =>
                      val.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((val, id) => (
                      <tr key={id}>
                        <td className="rank">{val.rank}</td>
                        <td className="logo">
                          <a href={val.websiteUrl}>
                            <img src={val.icon} alt="logo" width="30px" />
                          </a>
                          <p>{val.name}</p>
                        </td>
                        <td className="symbol">{val.symbol}</td>
                        <td>${val.marketCap.toLocaleString()}</td>
                        <td>${val.price.toFixed(2)}</td>
                        <td>{val.availableSupply.toLocaleString()}</td>
                        <td>{val.volume.toLocaleString()}</td> 
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No data available
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
    </div>
  )
}

export default App
