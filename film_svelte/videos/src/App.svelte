<script>
  import { video_player_is_active } from "./stores.js";
  import { Button, Overlay } from "svelte-materialify";
  import { videos,videos2 } from "./videos.js";
  import Player from "./Player.svelte";
  import Thumbnail from "./Thumbnail.svelte";

  let is_fullscreen = false;
</script>
<h1 id="title">Not a pirate site</h1>

<main>
  <h2 id="Genre2">Trending</h2>
  <div class="grid">
    {#each Array(5) as _, i}
        <!-- Probably here you want to show different videos than I have selected -->
        <Thumbnail video={videos[i%5]}> </Thumbnail>
    {/each}
  </div>
  <h3 id="Genre">Mine imator</h3>
  <div class="grid2">
    {#each Array(5) as _, i}
        <!-- Probably here you want to show different videos than I have selected -->
        <Thumbnail video={videos2[i%5]}> </Thumbnail>
    {/each}
  </div>
  <h4 id="Genre">Meme</h4>
  <div class="grid3">
    {#each Array(5) as _, i}
        <!-- Probably here you want to show different videos than I have selected -->
        <Thumbnail video={videos2[i%5]}> </Thumbnail>
    {/each}
  </div>
  <Overlay
    opacity={is_fullscreen ? 1 : 0.7}
    color="black"
    active={$video_player_is_active}
    on:click={() => {
      $video_player_is_active = false;
    }}
  >
    <div
      id="video"
      class:fullscreen={is_fullscreen == true}
      on:click={(e) => {
        e.stopPropagation();
      }}
    >
      <div id="close">
        <Button
          class="error-color"
          size="small"
          on:click={() => {
            $video_player_is_active = false;
          }}
        >
          Close
        </Button>
      </div>
      <div id="fullscreen">
        <Button
          size="small"
          class="primary-color"
          on:click={() => {
            is_fullscreen = !is_fullscreen;
            // do not focus the fullscreenbutton if clicked
            // this is because otherwise clicking space will cause
            // the video player to maximize/minimize instead of pause/play
            // when space is clicked
            if (document.activeElement != document.body)
              document.activeElement.blur();
          }}
        >
          {is_fullscreen ? "Minimize" : "Theatre Mode"}
        </Button>
      </div>

      {#if is_fullscreen}
        <div id="gigascreen">
          <Button
            size="small"
            class="secondary-color"
            on:click={() => {
              // do not focus the fullscreenbutton if clicked
              // this is because otherwise clicking space will cause
              // the video player to maximize/minimize instead of pause/play
              // when space is clicked
              if (document.activeElement != document.body)
                document.activeElement.blur();

              let div = document.getElementById("vid");
              if (div.requestFullscreen) div.requestFullscreen();
              else if (div.webkitRequestFullscreen)
                div.webkitRequestFullscreen();
              else if (div.msRequestFullScreen) div.msRequestFullScreen();
            }}
          >
            {"Fullscreen"}
          </Button>
        </div>
      {/if}

      <Player />
    </div>
  </Overlay>

  <src />
</main>

<style>
  :global(:root) {
    --netflix-red: #ffa31a;
    --netflix-red-opacity: rgba(229, 9, 20, 0.3);
  }

  :global(body) {
    padding: 0;
    margin: 0;
    background-color: #1b1b1b;
    overflow-x:hidden;
  }

  main {
    min-height: 100vh;
    width: 100vw;;
    padding-left: 5%;
    padding-right: 5%;
    box-sizing: border-box;
  }

  #video {
    position: fixed;
    transition: all 0.3s ease-out;
    left: 15%;
    right: 15%;
    top: 15%;
    bottom: 15%;
  }

  #video.fullscreen {
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
  }

  #video.fullscreen #gigascreen {
    position: absolute;
    top: 10px; /* position the top  edge of the element at the middle of the parent */
    left: 50%; /* position the left edge of the element at the middle of the parent */

    transform: translate(-50%, 0);
    z-index: 100;
  }
  #video #close {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 100;
  }

  #video #fullscreen {
    position: absolute;
    top: -10px;
    left: -10px;
    z-index: 100;
  }

  #video.fullscreen #close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
  }

  #video.fullscreen #fullscreen {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100;
  }

  .grid {
    margin-top: 30px;
    display: grid;
    grid-row-gap: 50px;
    grid-column-gap: 50px;
    grid-template-columns: auto auto auto auto auto;
    padding: 10px;
    overflow:auto;
  }
  .grid2 {
    margin-top: 30px;
    display: grid;
    grid-row-gap: 50px;
    grid-column-gap: 50px;
    grid-template-columns: auto auto auto auto auto;
    padding: 10px;
    overflow:auto;
  }
  .grid3 {
    margin-top: 30px;
    display: grid;
    grid-row-gap: 50px;
    grid-column-gap: 50px;
    grid-template-columns: auto auto auto auto auto;
    padding: 10px;
    overflow:auto;
  }

  #Genre {
    color: #ffa31a;
    font-size: 42px;
    top: 0;
    left: 0;
    right: 0;;
    height: 100px;
    margin-top: 5%;
    font-weight: 100;
  }
  #Genre2 {
    color: #ffa31a;
    font-size: 42px;
    top: 0;
    left: 0;
    right: 0;;
    height: 100px;
    margin-top: 10%;
    font-weight: 100;
  }

  #title {
    color: var(--netflix-red);
    font-size: 62px;
    line-height: 100px;
    position: fixed;
    background-color:	#292929;
    left: 0;
    right: 0;;
    height: 110px;
    padding-left: calc(5% + 5px);
    font-weight: 400;
  }
  @media only screen and (max-width: 375px) {
    #title {
    color: var(--netflix-red);
    font-size: 40px;
    line-height: 100px;
    position: fixed;
    background-color:	#292929;
    top: 0;
    left: 0;
    right: 0;;
    height: 100px;
    padding-left: calc(5% + 5px);
    }
    #Genre2 {
    color: #ffa31a;
    font-size: 42px;
    top: 0;
    left: 0;
    right: 0;;
    height: 100px;
    margin-top: 35%;
    }
    .grid {
    margin-top: 10px;
    display: grid;
    grid-row-gap: 50px;
    grid-column-gap: 50px;
    grid-template-columns: auto auto auto auto auto;
    padding: 10px;
    overflow:auto;
    }
    .grid2 {
    margin-top: 10px;
    display: grid;
    grid-row-gap: 50px;
    grid-column-gap: 50px;
    grid-template-columns: auto auto auto auto auto;
    padding: 10px;
    overflow:auto;
    }
  }
</style>
