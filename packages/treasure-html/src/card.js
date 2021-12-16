const card = `<html>
	<head>
    <title id="page-title">Treasure</title>
    <meta content="Treasure Chess" property="og:title" />
    <meta name="description" content="A collectible game of chess">
    <meta name="keywords" content="treasure, chess, NFT, collectibe, chess.com">
    <meta name="author" content="Treasure Chess">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background-color:#4F4F4F; display: flex; align-items: center;" >
  	<div id="container" style="color:black; width: 266px; min-width: 266px; border-radius: 12px; background-color: #FFF8EE; display: flex; flex-direction: column; padding: 4px;">
			<div id="banner" style="width: 100%; background-color: #ABB6B9; border-radius: 8px 8px 2px 2px; display: grid; grid-template-columns: 2fr 1fr; align-items: center; min-height: 39px; box-sizing: border-box; padding: 0 8px">
  			<div style="display: flex;align-items: center; min-height: 39px;">
  				<div style="padding-right: 8px;">
            <svg height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.41798 17.3539C5.56512 17.7428 5.93751 18 6.35326 18H17.6475C18.0632 18 18.4356 17.7427 18.5828 17.3539L21.9878 8.35386C22.2353 7.69967 21.7519 7 21.0525 7H2.94761C2.24813 7 1.76478 7.69971 2.01233 8.35391L5.41798 17.3539Z" fill="#312E2B"/>
              <path d="M3.5 21C3.5 20.4477 3.94772 20 4.5 20H19.5C20.0523 20 20.5 20.4477 20.5 21V23C20.5 23.5523 20.0523 24 19.5 24H4.5C3.94772 24 3.5 23.5523 3.5 23V21Z" fill="#312E2B"/>
              <path d="M10.5 1C10.5 0.447715 10.9477 0 11.5 0H12.5C13.0523 0 13.5 0.447715 13.5 1V7C13.5 7.55228 13.0523 8 12.5 8H11.5C10.9477 8 10.5 7.55228 10.5 7V1Z" fill="#312E2B"/>
              <path d="M8.5 3C8.5 2.44772 8.94772 2 9.5 2H14.5C15.0523 2 15.5 2.44772 15.5 3V4C15.5 4.55228 15.0523 5 14.5 5H9.5C8.94772 5 8.5 4.55228 8.5 4V3Z" fill="#312E2B"/>
            </svg>
  				</div>
  				<div style="max-width: 124px; overflow-x:hidden; white-space: nowrap;">
  					<p id="title" style="color:black; margin: 0;font-weight: bold; font-size: 11px;">My fun game</p>
  					<p id="termination" style="color:black; margin: 0; font-size: 10px;" >White won by checkmate</p>
  				</div>
        </div>
        <a href="https://treasure.chess.com" target="_blank" rel="noopener">
          <img id="banner-image" src="" style="height:32px;" alt="Treasure Chess"/>
        </a>
			</div>
      <div style="margin: 0 4px">
  			<div style="width: 100%; display: flex; align-items: center; min-height: 40px; margin-top: 6px;">
  				<div style="height: 40px; width: 40px;  margin-right: 8px;">
  					<img id="top-avatar" src="https://picsum.photos/40/40?grayscale" style="width: 100%; border-radius: 4px;" alt="Avatar image from chess.com"/>
  				</div>
          <div>
  					<a id="top-username-anchor" href="" target="_blank" rel="noopener" style="text-decoration: none;">
              <p id="top-username" style=" color:black; font-weight: bold;font-size: 16px; margin: 0; max-width: 193px; overflow: hidden;">asahi001</p>
            </a>
						<div style="height:14px; margin-top: 2px; display: flex; align-items: center; font-size: 10px;">
              <p id="top-ratingDelta" style="margin-right: 1ex; color: inherit;">+6</p>
              <img id="top-flagImage" alt="" style="margin-right: 1ex; height:14px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABTVBMVEUAAAD///8AAQEAAQEAAQEAAQEAAQEmJiYmJiYmJiYmJiYmJiYmJiYmJiZ9fX10dHR8fHyDg4OIiIiKioqMjIyOjo6QkJACAgJoaGhWVlZXV1dXV1dXV1cCAgJcXFxPT09QUFBQUFBQUFACAgJHR0dGRkZGRkZGRkZGRkbAAgLtPT31PDz3PDz4PDz5PDy/AgLrMzPyMjL1MjL2MjL2MTG9AgLoKCjwJyfzJyf0Jyf0Jye7AgLmJSXuJyfwJyfxJyfyJia6AgLhFRXqFRXtFRXuFRXvFRW4lALgthHovRHqvxHrvxDswBC2kgLdsw3lugzovAzqvQ21kgLZsAjjtwjmuQnnugnouwizkALXrQXfswXjtwXkuAXluAWzkAXVrAfbsQjhtxDjuhbmvRvlvRzmvh/mvyDmvyG4lgy5lxC9mxHAnRHCnxHDoBHEoBH4ads7AAAAB3RSTlMAAAQMECQwISWBWgAAAFhJREFUKFPVjUEOgCAMBHcrcOD/f+WgsdqkJZDgxcSDc5zJtsD3UDJodKMG9sTCIKxxJNZ54LEllGXAPwNGPOR3pyJqcIfa7TBQcJP5s9eTwmXQpTbkweMC/zxfoVRzFjQAAAAASUVORK5CYII="/>
              <p id="top-rating" style="margin-right: 1ex; font-size: 10px; color:black;">2568</p>
              <p id="top-masterTitle" style="display: flex; justify-content: center; width: 15px; line-height: 10px; height: 11px; align-items: center; background-color: #B23330; font-size: 7px; font-weight: bold; color: white; border-radius:2px;"></p>
            </div>
  				</div>
  			</div>
        <div id="game" style="height: 258px; margin-top: 6px; background-image: url('/images/is-it-there.png');">
    			<a id="game-anchor" href="chess.com" target="_blank" rel="noopener" style="display:inline-block;">
    				<img id="game-image" src="" style="width: 100%; border-radius: 4px;" alt="Video of the game"/>
    			</a>
        </div>
  			<div style="width: 100%; display: flex; align-items: center; min-height: 40px; margin-top:6px;">
  				<div style="height: 40px; width: 40px; margin-right: 8px;">
  					<img id="bottom-avatar" src="https://picsum.photos/40/40?grayscale" style="width: 100%; border-radius: 4px;" alt="Avatar image from chess.com"/>
  				</div>
  				<div>
            <a id="bottom-username-anchor" href="" target="_blank" rel="noopener" style="text-decoration: none;">
              <p id="bottom-username" style=" color:black; font-weight: bold;font-size: 16px; margin: 0; max-width: 193px; overflow: hidden;">jschiarizzi</p>
            </a>
						<div style="height: 14px; margin-top: 2px; display: flex; align-items: center; font-size: 10px;">
              <p id="bottom-ratingDelta" style="margin-right: 1ex; color: inherit; bold;font-size: 10px;">-6</p>
              <img id="bottom-flagImage" alt="" style="margin-right: 1ex; height:14px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABTVBMVEUAAAD///8AAQEAAQEAAQEAAQEAAQEmJiYmJiYmJiYmJiYmJiYmJiYmJiZ9fX10dHR8fHyDg4OIiIiKioqMjIyOjo6QkJACAgJoaGhWVlZXV1dXV1dXV1cCAgJcXFxPT09QUFBQUFBQUFACAgJHR0dGRkZGRkZGRkZGRkbAAgLtPT31PDz3PDz4PDz5PDy/AgLrMzPyMjL1MjL2MjL2MTG9AgLoKCjwJyfzJyf0Jyf0Jye7AgLmJSXuJyfwJyfxJyfyJia6AgLhFRXqFRXtFRXuFRXvFRW4lALgthHovRHqvxHrvxDswBC2kgLdsw3lugzovAzqvQ21kgLZsAjjtwjmuQnnugnouwizkALXrQXfswXjtwXkuAXluAWzkAXVrAfbsQjhtxDjuhbmvRvlvRzmvh/mvyDmvyG4lgy5lxC9mxHAnRHCnxHDoBHEoBH4ads7AAAAB3RSTlMAAAQMECQwISWBWgAAAFhJREFUKFPVjUEOgCAMBHcrcOD/f+WgsdqkJZDgxcSDc5zJtsD3UDJodKMG9sTCIKxxJNZ54LEllGXAPwNGPOR3pyJqcIfa7TBQcJP5s9eTwmXQpTbkweMC/zxfoVRzFjQAAAAASUVORK5CYII="/>
              <p id="bottom-rating" style="margin-right: 1ex; font-size: 10px; color:black;">9999</p>
              <p id="bottom-masterTitle" style="display: flex; justify-content: center; width: 15px; line-height: 10px; height: 11px; align-items: center; background-color: #B23330; font-size: 7px; font-weight: bold; color: white; border-radius:2px;"></p>
            </div>
  				</div>
  			</div>
  			<div id="achievements" style="width: 100%; margin-top: 10px; display: grid; grid-template-columns: 2fr 1fr; align-items: center;">
  				<div style="width: 100%; display: flex; align-items: center; font-size: 13px;">
  					<div id="achievement-1-icon">
              <svg width="6px" height="10px" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
              </svg>
  					</div>
  					<div id="achievement-1" style="margin:0 0 0 2px">
  						Play A Game Against
  					</div>
  				</div>
  				<div style="width: 100%; display: flex; align-items: center; height: 12px;">
            <div id="metadata-1-icon">
              <svg width="6px" height="10px" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
              </svg>
            </div>
  					<div id="metadata-rarity" style="margin-left:6; font-size: 10px; color:#ABB6B9;">
  						2 Common
  					</div>
  				</div>
  				<div style="width: 100%; display: flex; align-items: center; font-size: 13px;  margin-top:6px;">
  					<div id="achievement-2-icon" >
              <svg width="6px" height="10px" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
              </svg>
  					</div>
  					<div id="achievement-2" style="margin:0 0 0 2px">
  						Pawn Checkmate
  					</div>
  				</div>
  				<div style="width: 100%; display: flex; align-items: center;">
            <div id="metadata-2-icon">
              <svg width="6px" height="10px" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
              </svg>
            </div>
  					<div id="metadata-ruleVariant" style="font-size: 10px; margin-left:6">
  						Standard
  					</div>
  				</div>
  				<div style="width: 100%; display: flex; align-items: center; font-size: 13px; margin-top:6px;">
            <div id="achievement-3-icon">
              <svg width="6px" height="10px" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
              </svg>
            </div>
  					<div id="achievement-3" style="margin:0 0 0 2px">
  						Play 2100+ game
  					</div>
  				</div>
  				<div style="width: 100%; display: flex; align-items: center;">
            <div id="metadata-3-icon">
              <svg width="6px" height="10px" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
              </svg>
            </div>
  					<div id="metadata-timeControl" style="font-size: 10px; margin-left:6px">
  						10 Min
  					</div>
  				</div>
  			</div>
  			<div id="footer" style="max-width: 100%; display: flex; justify-content: space-between; margin-top: 4px; align-items: center;">
  				<a id="match-anchor" href="" target="_blank" rel="noopener" style="margin: 0; text-decoration: none; color:black;  opacity: 0.70;  font-size: 8px; ">Match #000000</a>
  				<p id="edition" style="color: black;  opacity: 0.70;  font-size: 8px;">Single Edition</p>
  				<p id="date" style="color: black;  opacity: 0.70;  font-size: 8px;">Jan 1 1900</p>
  			</div>
  		</div>
		</div>
	</body>
</html>`

const maskedAchievements = `<div style="display:flex; height:64px; width:250px; align-items: center; justify-content: center; background:rgba(220, 220, 220, 0.9); border-radius:4px; color:#147DDD; font-size: 10px; font-weight: bold;">Mint to Generate Game Stats</div>`

module.exports = { card, maskedAchievements }
