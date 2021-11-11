const htmlString = `<html>
	<head>

	</head>
	<body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background-color:#4F4F4F; display: flex; justify-content: center;  align-items: center;" >
  	<div id="container" style="color:black; width: 258px; border-radius: 12px; background-color: #FFF8EE; display: flex; flex-direction: column; padding: 4px;">
			<div id="banner" style="width: 100%; background-color: #ABB6B9; border-radius: 8px 8px 2px 2px; display: grid; grid-template-columns: 2fr 1fr; align-items: center; min-height: 39px; box-sizing: border-box; padding: 0 5px 0 5px">
  			<div style="display: flex;align-items: center; min-height: 39px;">
  				<div style="min-width: 19px; padding-right: 8px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.41798 17.3539C5.56512 17.7428 5.93751 18 6.35326 18H17.6475C18.0632 18 18.4356 17.7427 18.5828 17.3539L21.9878 8.35386C22.2353 7.69967 21.7519 7 21.0525 7H2.94761C2.24813 7 1.76478 7.69971 2.01233 8.35391L5.41798 17.3539Z" fill="#312E2B"/>
              <path d="M3.5 21C3.5 20.4477 3.94772 20 4.5 20H19.5C20.0523 20 20.5 20.4477 20.5 21V23C20.5 23.5523 20.0523 24 19.5 24H4.5C3.94772 24 3.5 23.5523 3.5 23V21Z" fill="#312E2B"/>
              <path d="M10.5 1C10.5 0.447715 10.9477 0 11.5 0H12.5C13.0523 0 13.5 0.447715 13.5 1V7C13.5 7.55228 13.0523 8 12.5 8H11.5C10.9477 8 10.5 7.55228 10.5 7V1Z" fill="#312E2B"/>
              <path d="M8.5 3C8.5 2.44772 8.94772 2 9.5 2H14.5C15.0523 2 15.5 2.44772 15.5 3V4C15.5 4.55228 15.0523 5 14.5 5H9.5C8.94772 5 8.5 4.55228 8.5 4V3Z" fill="#312E2B"/>
            </svg>
  				</div>
  				<div style="color:black;">
  					<p id="title" style="margin: 0;font-weight: bold; font-size: 11px">My fun game</p>
  					<p id="termination" style="margin: 0; font-size: 10px;" >White won by checkmate</p>
  				</div>
        </div>
        <img id="banner-image" src="" style="height:32;" alt="Treasure Chess"/>
			</div>
			<div style="width: 100%; display: flex; align-items: center; min-height: 55px; margin: 2pt 0 1pt 0;">
				<div style="height: 40px; width: 40px;  margin-right: 8px;">
					<img id="top-avatar" src="https://picsum.photos/40/40?grayscale" style="width: 100%; border-radius: 2px;" alt="placeholder"/>
				</div>
				<div style="display: flex; flex-direction: column;">
					<a id="top-username-anchor" href="" target="_blank" style="text-decoration: none; color:black;"><p id="top-username" style="font-weight: bold;font-size: 13px; margin: 0;">asahi001</p></a>
					<div style="margin: 0;">
							<p style="margin: 0; display: flex; align-items: center; font-size: 10px;"><span id="top-ratingDelta" style="margin-right: 1ex; color: inherit;">+6</span><span id="top-flag" src="" style="margin-right: 1ex;">🇺🇸</span><span id="top-rating" style="margin-right: 1ex;">2568</span><span id="top-masterTitle" style="background-color: red; font-size: 8px; font-weight: bold; padding: 1pt 2pt; color: white; border-radius:2px;">GM</span></p>
					</div>
				</div>
			</div>
      <div id="game" style="min-height: 258px; margin: 1pt 0; background-image: url('/images/is-it-there.png');">
  			<a id="game-anchor" href="chess.com">
  				<img id="game-image" src="" style="width: 100%; border-radius: 2px;" alt="placeholder"/>
  			</a>
      </div>
			<div style="width: 100%; display: flex; align-items: center; min-height: 55px; margin: 2pt 0 1pt 0;">
				<div style="height: 40px; width: 40px; margin-right: 8px;">
					<img id="bottom-avatar" src="https://picsum.photos/40/40?grayscale" style="width: 100%; border-radius: 2px;" alt="placeholder"/>
				</div>
				<div style="display: flex; flex-direction: column;">
          <a id="bottom-username-anchor" href="" target="_blank" style="text-decoration: none; color:black;"><p id="bottom-username" style="font-weight: bold;font-size: 13px; margin: 0;">jschiarizzi</p></a>
					<div style="margin: 0;">
							<p style="margin: 0; display: flex; align-items: center; justify-content: flex-start; font-size: 10px;"><span id="bottom-ratingDelta" style="margin-right: 1ex; color: inherit;">-6</span><span id="bottom-flag" style="margin-right: 1ex;">🇺🇸</span><span id="bottom-rating" style="margin-right: 1ex;">9999</span><span id="top-masterTitle" style="background-color: red; font-size: 8px; font-weight: bold; padding: 1pt 2pt; color: white; border-radius:2px;">GM</span></p>
					</div>
				</div>
			</div>
			<div style="width: 100%; display: grid; grid-template-columns: 2fr 1fr; align-items: center;">
				<div style="width: 100%; display: flex; align-items: center; font-size: 13px;">
					<div id="achievement-1-icon">
            <svg width="6" height="10" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
            </svg>
					</div>
					<div id="achievement-1">
						Play A Game Against
					</div>
				</div>
				<div style="width: 100%; display: flex; align-items: center; height: 12px;">
          <div id="metadata-1-icon">
            <svg width="6" height="10" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
            </svg>
          </div>
					<div id="metadata-rarity" style="margin-left:6; font-size: 10px; color:#ABB6B9;">
						2 Common
					</div>
				</div>
				<div style="width: 100%; display: flex; align-items: center; font-size: 13px;">
					<div id="achievement-2-icon" >
            <svg width="6" height="10" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
            </svg>
					</div>
					<div id="achievement-2">
						Pawn Checkmate
					</div>
				</div>
				<div style="width: 100%; display: flex; align-items: center;">
          <div id="metadata-2-icon">
            <svg width="6" height="10" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
            </svg>
          </div>
					<div id="metadata-ruleVariant" style="font-size: 10px; margin-left:6">
						Standard
					</div>
				</div>
				<div style="width: 100%; display: flex; align-items: center; font-size: 13px;">
          <div id="achievement-3-icon">
            <svg width="6" height="10" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
            </svg>
          </div>
					<div id="achievement-3">
						Play 2100+ game
					</div>
				</div>
				<div style="width: 100%; display: flex; align-items: center;">
          <div id="metadata-3-icon">
            <svg width="6" height="10" viewBox="0 0 16 28" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 24V22H12C11.056 20.112 11.878 18.084 11.332 16H4.67C4.124 18.082 4.944 20.11 4 22H2V24C1.46957 24 0.960859 24.2107 0.585786 24.5858C0.210714 24.9609 0 25.4696 0 26V28H16V26C16 25.4696 15.7893 24.9609 15.4142 24.5858C15.0391 24.2107 14.5304 24 14 24ZM14 12H11V11.168C11.9098 10.6458 12.666 9.89325 13.1926 8.98605C13.7192 8.07885 13.9977 7.04897 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 8.216 3.214 10.128 5 11.168V12H2V14H14V12Z" fill="black"/>
            </svg>
          </div>
					<div id="metadata-timeControl" style="font-size: 10px; margin-left:6">
						10 Min
					</div>
				</div>
			</div>
			<div style="max-width: 100%; display: flex; justify-content: space-between; margin: 0 12px; opacity: 0.75;  font-size: 8px; height: 28px; align-items: center;">
				<a id="match-anchor" href="" target="_blank" style="margin: 0; text-decoration: none; color:black;">Match #000000</a>
				<p id="edition" style="margin: 0;">Single Edition</p>
				<p id="date" style="margin: 0;">Jan 1 1900</p>
			</div>
		</div>
	</body>
</html>`

module.exports = htmlString
