import { useState } from "react"



  // eslint-disable-next-line react/prop-types
  function Square ({ value, onClickBtn }) {


    return (
      <button 
        className=" bg-red-50 h-28 text-3xl  w-auto border-2 border-gray-950 "
          onClick={onClickBtn}
            >{value}</button>
    )
  }







 // eslint-disable-next-line react/prop-types
 function Board ( {xIsNext, square, onplay} ) {


      const winner = calculateWinner(square);
      let status;
        if (winner) {
          status = `Winner : ${winner}`
        } else {
          status =  (xIsNext ? "X" : "O");
        }



      function hanndleClick (i) {
        if (square[i] || calculateWinner(square)) {
          return; 
        }

        const nextSqrt = square;
          if (xIsNext) {
            nextSqrt[i] = "X"
          } else {
            nextSqrt[i] = "O"
          }

        onplay(nextSqrt)
      }

    return ( <>

      <div className=" rounded-b-md mb-2  h-auto  sm:w-5/12 mx-auto bg-gray-400">
        <h3 className=" text-3xl font-semibold text-yellow-400 text-center"> 
          Now :
          <span className=" text-red-500 rounded-full h-20 mx-3 w-36 bg-gradient-to-r from-indigo-500"> {status} </span>

        </h3>
      </div>

      <div className="grid grid-cols-3 justify-center items-center gap-3 sm:w-5/12 px-3 mx-auto">
          <Square 
            onClickBtn={()=>hanndleClick(0)}
               value={square[0]}>
          </Square>
          <Square 
            onClickBtn={()=>hanndleClick(1)}
               value={square[1]}>
          </Square>
          <Square 
            onClickBtn={()=>hanndleClick(2)}
               value={square[2]}>
          </Square>
          <Square 
            onClickBtn={()=>hanndleClick(3)}
               value={square[3]}>
          </Square>
          <Square 
            onClickBtn={()=>hanndleClick(4)}
               value={square[4]}>
          </Square>
          <Square 
            onClickBtn={()=>hanndleClick(5)}
               value={square[5]}>
          </Square>
          <Square 
            onClickBtn={()=>hanndleClick(6)}
               value={square[6]}>
          </Square>
          <Square 
            onClickBtn={()=>hanndleClick(7)}
               value={square[7]}>
          </Square>
          <Square 
            onClickBtn={()=>hanndleClick(8)}
               value={square[8]}>
          </Square>
      </div>
    </>)
}



function calculateWinner (square) {
  const lines = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
    for (let i = 0; i < lines.length; i++ ) {
      const [a,b,c] = lines[i];
      
        if (square[a] && square[a] === square[b] && square[a] === square[c] ){
          return square[a];
        }
    }
    return null;
}


export default  function Game () {
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXisNext ] = useState(true);

    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
   
      function handlePlay (nextSqrt) {
        setXisNext(!xIsNext);
        const nextHistory = [...history.slice(0, currentMove + 1 ), nextSqrt]
        setHistory(nextHistory);
         setCurrentMove(nextHistory.length-1)
      }

      

      function jumpTo( move ) {
        setCurrentMove(move);
        setXisNext(move % 2 === 0);


      }

      const moves = history.map( (square, move )=>{

          let description;
            if (move > 0) {
              description = `>Click to see, Player's Move  #${ move } Number`
            } else {
              description = <span className=" text-green-500"> Play</span>
            } 
          return ( <li 
                      className=" list-none font-semibold border-2 rounded-sm border-green-300 text-gray-700 bg-red-300 m-2"
                        key={move}>
                     <button
                        onClick={()=>jumpTo(move)}  
                          className=" p-3">{description}
                      </button>
                  </li>)

      })

    


  return ( <> 
  
      <div>
          <Board
            xIsNext= {xIsNext}
            square={currentSquares}
            onplay={handlePlay}
          ></Board>


          <div className=" sm:w-5/12 mx-auto border border-gray-500 my-3 rounded-md bg-yellow-100 ">
             {moves}
          </div>
      </div>
  
  </>)

}