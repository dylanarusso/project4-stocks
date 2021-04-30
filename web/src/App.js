import './App.css';

import {useState} from 'react'
import {useEffect} from 'react';
// import { search } from '../../api/app'

function App() {

  const [activeSearch, setActiveSearch] = useState();
  const [stockPrice, setStockPrice] = useState();
  const [wallet, setWallet] = useState();
  const [buyQuantity, setBuyQuantity] = useState();
  const [searchTerm, setSearchTerm] = useState();


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

  const fetchWallet = async () => {
    console.log('fetches the wallet')
    let res = await fetch('http://localhost:3000/api/v1/wallet');
    let json = await res.json();
    console.log(json);
    setWallet(json.value);
  };

  useEffect(() => {
    fetchWallet();
  }, [])

  const buyStock = async () => {
    console.log('buy stock')
    let cashRequired = buyQuantity * activeSearch.price;
    console.log(cashRequired)
    if(cashRequired <= wallet){
        let res = await fetch(`http://localhost:3000/api/v1/portfolio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                symbol: searchTerm,
                quantity: buyQuantity,
                price: activeSearch.price
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
          <h1 className={'text-center text-4xl p-5'}>Paper Trader</h1>
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
            

            <div>Stock Symbol: {activeSearch}</div>
            <div>Stock Price: {stockPrice} USD</div>


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

        </div>

      </div>



    </>
  );
}

export default App;
