<script>
    import Square from "./ruta.svelte";
    let winner = null;
    let squares = [null, null, null, null, null, null, null, null, null];
    let xIsNext = true;
    $: status = "Spelare " + (xIsNext ? "X " : "0 ") + "tur";
    function restartGame() {
      squares = [null, null, null, null, null, null, null, null, null];
      xIsNext = true;
      winner = null;
    }
    function handleClick(i) {
      if (!squares[i]) {
        squares[i] = xIsNext ? "X" : "0";
        xIsNext = !xIsNext;
        winner = calculateWinner(squares);
      }
    }
    function calculateWinner(squares) {
      const winningCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < winningCombo.length; i++) {
        const [a, b, c] = winningCombo[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
          return `Spelare ${squares[a]} vann`;
      }
      const isDraw = squares.every(square => square !== null);
      return isDraw ? "Oavgjort" : null;
    }
  </script>
  
  <style>
    h3 {
        font-size: 30px;
        margin-top: 150px;
        color: rgb(255, 0, 0);
    }
    
    .board {
      display: flex;
      flex-wrap: wrap;
      width: 400px;
      margin-top: 100px;
    }
    .restart {
      margin-top: 40px
    }
    .skugga:hover {
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }
    .button-48 {
    appearance: none;
    background-color: #FFFFFF;
    border-width: 0;
    box-sizing: border-box;
    color: #000000;
    cursor: pointer;
    display: inline-block;
    font-family: Clarkson,Helvetica,sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1em;
    opacity: 1;
    outline: 0;
    padding: 1.5em 2.2em;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-rendering: geometricprecision;
    text-transform: uppercase;
    transition: opacity 300ms cubic-bezier(.694, 0, 0.335, 1),background-color 100ms cubic-bezier(.694, 0, 0.335, 1),color 100ms cubic-bezier(.694, 0, 0.335, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    white-space: nowrap;
}

.button-48:before {
  animation: opacityFallbackOut .5s step-end forwards;
  backface-visibility: hidden;
  background-color: #EBEBEB;
  clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: translateZ(0);
  transition: clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1), -webkit-clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1);
  width: 100%;
}

.button-48:hover:before {
  animation: opacityFallbackIn 0s step-start forwards;
  clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
}

.button-48:after {
  background-color: #FFFFFF;
}

.button-48 span {
  z-index: 1;
  position: relative;
}
@media only screen and (max-width: 400px) {
      .board {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      }
      h3 {
        font-size: 30px;
        margin-top: 90px;
        color: rgb(255, 0, 0);
      }
      .board {
      display: flex;
      flex-wrap: wrap;
      width: 375px;
      height: 375px;
      margin-top: 30px;
      }
    }
  </style>
  
  {#if winner}
    <h3>{winner}</h3>
  {:else}
    <h3>{status}</h3>
  {/if}
  
  <div class="board">
    {#each squares as square, i}
      <Square value={square} handleClick={() => handleClick(i)} />
    {/each}
  </div>
  
  {#if winner}
    <button class="restart skugga button-48" on:click={restartGame}><span class="text">Ny match</span></button>
  {/if}