// import { APITester } from "./APITester";
// import { useContext, useState } from "react";
import { useState } from "react";
import { useFetch, useOnline } from "./Hooks";

// import logo from "./logo.svg";
// import reactLogo from "./react.svg";

const url = "https://jsonplaceholder.typicode.com/posts/1";

const personita = {
  name: "Federico",
  age: 30,
  city: "Buenos Aires",
};

const BotonCuadrado = ({
  value,
  accionClickCuadrado,
  className,
}: {
  value: string;
  accionClickCuadrado: () => void;
  className: string;
}) => {
  return (
    <button className={`cuadrado ${className}`} onClick={accionClickCuadrado}>
      {value}
    </button>
  );
};

export function App() {
  const estadoOnline = useOnline();
  const { data, loading, error } = useFetch(url);

  const [cuadrados, setCuadrados] = useState(Array(9).fill(""));

  const [xIsNext, setXIsNext] = useState(true);

  const alClickearCuadrado = (i: number) => {
    if (cuadrados[i] || calculateWinner(cuadrados)) {
      return;
    }

    const siguienteCuadrado = cuadrados.slice();
    if (xIsNext) {
      siguienteCuadrado[i] = "X";
    } else {
      siguienteCuadrado[i] = "O";
    }
    setCuadrados(siguienteCuadrado);

    setXIsNext(!xIsNext);
  };

  function calculateWinner(squares: string[]) {
    // CAMBIO AQUÍ: Definimos que es un array de Tuplas de 3 números
    const lines: [number, number, number][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      // Ahora TypeScript sabe que a, b y c son siempre 'number', nunca 'undefined'
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { position: [a, b, c], winner: squares[a] };
      }
    }
    return null;
  }

  const isXorO = (value: string, isWinningSquare: boolean) => {
    if (isWinningSquare) {
      return "cuadrado-ganador"; // Nueva clase para casillas ganadoras
    }
    if (value === "X") {
      return "cuadrado-x";
    }
    if (value === "O") {
      return "cuadrado-o";
    }
    return "";
  };

  // Más abajo en el return, antes de renderizar los botones:
  const winner = calculateWinner(cuadrados);
  const winningPositions = winner ? winner.position : [];

  let status;
  if (winner) {
    status = "Ganador: " + winner.winner; // Cambiado para mostrar X u O en vez de posiciones
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h2>El estado online es: </h2>
      <p className={estadoOnline ? "mi-estilo" : "mi-estilo-offline"}>
        {estadoOnline ? "Conectado" : "Desconectado"}
      </p>
      <p>
        {personita.name} tiene {personita.age} años y vive en {personita.city}.
      </p>
      <div className="status">{status}</div>

      <div className="tablero">
        <BotonCuadrado
          value={cuadrados[0]}
          accionClickCuadrado={() => alClickearCuadrado(0)}
          className={isXorO(cuadrados[0], winningPositions.includes(0))} // Pasamos si es una posición ganadora
        />
        <BotonCuadrado
          value={cuadrados[1]}
          accionClickCuadrado={() => alClickearCuadrado(1)}
          className={isXorO(cuadrados[1], winningPositions.includes(1))}
        />
        <BotonCuadrado
          value={cuadrados[2]}
          accionClickCuadrado={() => alClickearCuadrado(2)}
          className={isXorO(cuadrados[2], winningPositions.includes(2))}
        />
        <BotonCuadrado
          value={cuadrados[3]}
          accionClickCuadrado={() => alClickearCuadrado(3)}
          className={isXorO(cuadrados[3], winningPositions.includes(3))}
        />
        <BotonCuadrado
          value={cuadrados[4]}
          accionClickCuadrado={() => alClickearCuadrado(4)}
          className={isXorO(cuadrados[4], winningPositions.includes(4))}
        />
        <BotonCuadrado
          value={cuadrados[5]}
          accionClickCuadrado={() => alClickearCuadrado(5)}
          className={isXorO(cuadrados[5], winningPositions.includes(5))}
        />
        <BotonCuadrado
          value={cuadrados[6]}
          accionClickCuadrado={() => alClickearCuadrado(6)}
          className={isXorO(cuadrados[6], winningPositions.includes(6))}
        />
        <BotonCuadrado
          value={cuadrados[7]}
          accionClickCuadrado={() => alClickearCuadrado(7)}
          className={isXorO(cuadrados[7], winningPositions.includes(7))}
        />
        <BotonCuadrado
          value={cuadrados[8]}
          accionClickCuadrado={() => alClickearCuadrado(8)}
          className={isXorO(cuadrados[8], winningPositions.includes(8))}
        />
      </div>
    </>
  );
}

// export function App() {
//   return (
//     <div className="app">
//       <div className="logo-container">
//         <img src={logo} alt="Bun Logo" className="logo bun-logo" />
//         <img src={reactLogo} alt="React Logo" className="logo react-logo" />
//       </div>

//       <h1>Bun + React</h1>
//       <p>
//         Edit <code>src/App.tsx</code> and save to test HMR
//       </p>
//       <APITester />
//     </div>
//   );
// }

export default App;
