import './App.css';

import {useState} from 'react'
// import { search } from '../../api/app'

function App() {

  const [activeSearch, setActiveSearch] = useState();
  const [stockPrice, setStockPrice] = useState();


  const updateActiveSearch = (ev) => {
    console.log(ev.currentTarget.value);
    setActiveSearch(ev.currentTarget.value)
  };

  const searchStock = async () => {
    let res = await fetch(`http://localhost:3000/api/v1/search/${activeSearch}`);
    let json = await res.json();
    // console.log(json);
    setStockPrice;
  

  };




  return (
    <>


      <div className={'grid grid-cols-12 font-serif'}>
       
        <div className={'col-span-12 border border-white border-b-4 bg-gray-300'}>
          <h1 className={'text-center text-4xl p-5'}>Paper Trader</h1>
        </div>

        <div className={'col-span-12 md:col-span-7 border-white h-96 border-r-4 bg-gray-300'}>

          <div className={'grid grid-cols-12'}>
            <div className={'col-span-12 md:col-span-6 h-32 border p-5'}>
              <input value={activeSearch} onChange={updateActiveSearch} type='search' className={'border w-2/3 p-3 rounded-full'}/>

              <button onClick={searchStock} className={'border w-1/3 bg-blue-500 text-white cursor-pointer rounded'}>Search</button>

            </div>
          
            <div className={'hidden md:grid col-span-6 h-32 border p-5'}>
              Empty
            </div>

            <div className={'col-span-6 h-32 border p-5'}>
              Stock name

            {stockPrice}
          
            




            </div>

            <div className={'col-span-6 h-32 border p-5'}>
              Buy button


            </div>

          </div>


        </div>

        <div className={'col-span-12 md:col-span-5 h-96 bg-gray-300'}>
              box3
        </div>

      </div>



    </>
  );
}

export default App;
