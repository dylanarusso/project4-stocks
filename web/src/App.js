import './App.css';

import {useState} from 'react'
import {useEffect} from 'react';
// import Chart from './Components/Chart';
// import { search } from '../../api/app'

function App() {

  const [activeSearch, setActiveSearch] = useState();
  const [stockPrice, setStockPrice] = useState();
  const [wallet, setWallet] = useState();
  const [buyQuantity, setBuyQuantity] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [currentPortfolio, setCurrentPortfolio] = useState();


  const updateActiveSearch = (ev) => {
    console.log(ev.currentTarget.value);
    setActiveSearch(ev.currentTarget.value)
  };

  const searchStock = async () => {
    let res = await fetch(`http://localhost:3000/api/v1/search/${activeSearch}`);
    let json = await res.json();
    console.log(json);
    setStockPrice(json.price);
  
  };

    // const prices = await yahooStockPrices.getHistoricalPrices(0, 6, 2020, 0, 8, 2020, 'AAPL', '1d');
    // console.log(prices);

  const fetchWallet = async () => {
    console.log('fetches the wallet')
    let res = await fetch('http://localhost:3000/api/v1/wallet');
    let json = await res.json();
    console.log(json);
    setWallet(parseInt(json.value));
  };

  const fetchPortfolio = async () => {
    console.log('fetches the wallet')
    let res = await fetch('http://localhost:3000/api/v1/portfolio');
    let json = await res.json();
    console.log(json);
    setCurrentPortfolio(json);
  };

  useEffect(() => {
    fetchWallet();
    fetchPortfolio();
  }, [])

  const sellStock = async (id) => {
    console.log('selling the stock with the id number', id);

    await fetch(`http://localhost:3000/api/v1/portfolio/${id}`, {method: 'DELETE'})
    alert('Success!');
    window.location.reload();
     };

  const buyStock = async () => {
    console.log('buy stock')
    console.log(buyQuantity)
    console.log(stockPrice)
    console.log(activeSearch)
    let cashRequired = buyQuantity * stockPrice;
    console.log(cashRequired)
    console.log(wallet)
    if(cashRequired <= wallet){
        let res = await fetch(`http://localhost:3000/api/v1/portfolio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                symbol: searchTerm,
                quantity: buyQuantity,
                price: stockPrice,
            })
        });
        let json = await res.json();
        console.log(json);

        fetchWallet()
        setBuyQuantity()
        setSearchTerm()
        setActiveSearch()


    } else {
        alert('Error: Not enough funds to complete transaction');
    }

};



  return (
    <>

      {/* Title Header */}
      <div className={'grid grid-cols-12 font-serif'}>
       
        <div className={'col-span-12 border border-white border-b-4 bg-gray-300'}>
          <h1 className={'text-center text-4xl p-5'}>Personal E-Trader</h1>
        </div>


        {/* Search Bar */}
        <div className={'col-span-12 md:col-span-7 border-white h-96 border-r-4 bg-gray-300'}>
          
          <div className={'grid grid-cols-12'}>
            <div className={'col-span-12 md:col-span-6 h-32 border p-5'}>
              <input value={activeSearch} onChange={updateActiveSearch} type='search' className={'border w-2/3 p-3 rounded-full'}/>

              <button onClick={searchStock} className={'border w-1/3 bg-blue-500 text-white cursor-pointer rounded'}>Search</button>

            </div>
          

          {/* Empty Box */}
            <div className={'hidden md:grid col-span-6 h-32 border p-5'}>
            
            </div>


            {/* Display Symbol & Price */}
            <div className={'col-span-6 h-32 border p-5'}>
            

            <div className={'text-2xl'}>Stock Symbol: {activeSearch}</div>
            <div className={'text-2xl'}>Stock Price: {stockPrice} USD</div>

          {/* Chart */}



            </div>



              {/* Buy Button */}
            <div className={'col-span-6 h-32 border p-5'}>
              
              <div className={'col-span-12 md:col-span-6 p-3'}>

            <input onChange={(ev) => setBuyQuantity(ev.currentTarget.value)}
                type="number"
                  className={'border p-2 w-20 border-gray-300 rounded mr-2'}/>
            <button onClick={buyStock} className={'p-2 bg-green-600 rounded text-white cursor-pointer w-1/3'}>Buy</button>
            
            <div className={'col-span-12 md:col-span-6 hidden md:block p-3'}>
                      <h1 className={'text-2xl font-bold text-right text-green-500'}>${parseFloat(wallet).toFixed(2)}</h1>
            </div>
            
            </div>

            </div>

          </div>


        </div>

        
        <div className={'col-span-12 md:col-span-5 h-96 bg-gray-300'}>
            {/* Portfolio Chart */}
            <h1 className={'text-center text-2xl p-5'}>Portfolio Dashboard</h1>

            {/* <ul> {currentPortfolio  && currentPortfolio.map((item) => { return <li key={item.id}>{item.symbol}</li> })} </ul> */}

            {currentPortfolio && <table style={{width: '100%'}}>
                <thead>
                    <th className={'border'}>Stock</th>
                    <th className={'border'}>Quantity</th>
                    <th className={'border'}>Value</th>
                </thead>
                <tbody>
                    {currentPortfolio.map((item, idx) => {
                        return <tr key={idx}>
                            <td className={'border text-center'}>{item.symbol}</td>
                            <td className={'border text-center'}>{item.quantity}</td>
                            <td className={'border text-center'}>{item.price}</td>
                            <td className={'border text-center p-4'}>
                                <span onClick={() => {
                                    sellStock(item.id);
                                }} className={'p-2 pl-4 pr-4 bg-blue-500 rounded text-white cursor-pointer'}>Sell</span>

                            </td>
                        </tr>

                    })}


                </tbody>
            </table>}

            

        </div>

      </div>

    </>
  );
}

export default App;
