import './App.css';

function App() {
  return (
    <>


      <div className={'grid grid-cols-12'}>
       
        <div className={'col-span-12 border border-gray-700 border-b-4'}>
          <h1 className={'text-center text-4xl p-5'}>Paper Trader</h1>
        </div>

        <div className={'col-span-7 border-gray-700 h-96 border-r-4'}>
              box2
        </div>

        <div className={'col-span-5 h-96'}>
              box3
        </div>

      </div>



    </>
  );
}

export default App;
