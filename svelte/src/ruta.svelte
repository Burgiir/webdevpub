<script>
    export let value;
    export let handleClick;
  </script>
  
  <style>
    .square {
      flex: 1 0 25%;
      width: 120px;
      height: 120px;
      background-color: whitesmoke;
      border: 2px solid rgb(0, 0, 0);
      margin: 5px;
      padding: 5px;
      font-size: 55px;
      text-align: center;
      border-radius: 8px;
    }
    .square:hover {
      border: 2px solid red;
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }
  </style>
  
  <button class="square" on:click={handleClick}>{value || ''}</button>