import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
const apiUrl = import.meta.env.VITE_Access_key;

function App() {
  const [fromCurrency, setFromCurrency] = useState("INR")
  const [toCurrency, setToCurrency] = useState("USDS")
  const [amount, setAmount] = useState(0)
  const [livePrice, setLivePrice] = useState(null)

  function getRate() {
    axios.get(`https://api.metalpriceapi.com/v1/convert?api_key=${apiUrl}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&date=2025-03-01`)
      .then((response) => {
        console.log(response.data.result);
        setLivePrice(response.data.result);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
     getRate()
    },[amount, fromCurrency, toCurrency])

  return (
    <>
      <div>
        <h1>Currency Converter</h1>
        <div>
          <div>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
            <label> to </label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <input type="number" placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} />
            <label>Converted Amount: </label>
            <p>{livePrice}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
