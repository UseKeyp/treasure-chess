const htmlString = `<html>
	<head>

	</head>
	<body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
		<div style="width: 258px; border-radius: 12px; background-color: #272522; display: flex; flex-direction: column; padding: 4px;">
			<div id="banner" style="width: 100%; background-color: #ABB6B9; border-radius: 8px 8px 2px 2px; display: flex;align-items: center; min-height: 39px; box-sizing: border-box;">
				<div id="icon-container" style="min-width: 19px; padding-right: 8px;">

				</div>
				<div id="rarity-data">
					<p id="title" style="margin: 0;font-weight: bold; font-size: 11px">Common</p>
					<p id="termination" style="margin: 0; font-size: 10px;" >White won by checkmate</p>
				</div>
			</div>
			<div id="player-one" style="width: 100%; display: flex; align-items: center; min-height: 55px; margin: 2pt 0 1pt 0;">
				<div id="player-one-icon" style="height: 40px; width: 40px;  margin-right: 8px;">
					<img id="top-avatar" src="https://picsum.photos/40/40?grayscale" style="width: 100%; border-radius: 2px;" alt="placeholder"/>
				</div>
				<div id="player-one-data" style="display: flex; flex-direction: column;">
					<p id="top-username" style="color: white; font-weight: bold;font-size: 13px; margin: 0;">asahi001</p>
					<div id="player-one-subdata" style="margin: 0;">
							<p style="margin: 0; color: white; display: flex; align-items: center; font-size: 10px;"><span style="margin-right: 1ex;">+6</span><span id="top-flag" src="" style="margin-right: 1ex;">🇺🇸</span><span id="top-rating" style="margin-right: 1ex;">2568</span><span id="top-masterTitle" style="margin-right: 1ex; background-color: red; font-size: 8px; font-weight: bold; padding: 1pt 2pt;">GM</span></p>
					</div>
				</div>
			</div>
      <div id="game" style="min-height: 258px; margin: 1pt 0; background-image: url('/images/is-it-there.png');">
  			<a id="game-anchor" href="chess.com">
  				<img id="game-image" src="https://picsum.photos/200/200?grayscale" style="width: 100%; border-radius: 2px;" alt="placeholder"/>
  			</a>
      </div>
			<div id="player-two" style="width: 100%; display: flex; align-items: center; min-height: 55px; margin: 2pt 0 1pt 0;">
				<div id="player-two-icon" style="height: 40px; width: 40px; margin-right: 8px;">
					<img id="bottom-avatar" src="https://picsum.photos/40/40?grayscale" style="width: 100%; border-radius: 2px;" alt="placeholder"/>
				</div>
				<div id="player-two-data" style="display: flex; flex-direction: column;">
					<p id="bottom-username" style="color: white; font-weight: bold;font-size: 13px; margin: 0;">jschiarizzi</p>
					<div id="player-two-subdata" style="margin: 0;">
							<p style="margin: 0; color: white; display: flex; align-items: center; justify-content: flex-start; font-size: 10px;"><span style="margin-right: 1ex;">-6</span><span id="bottom-flag" style="margin-right: 1ex;">🇺🇸</span><span id="bottom-rating" style="margin-right: 1ex;">9999</span><span id="bottom-masterTitle" style="margin-right: 1ex; background-color: red; font-size: 8px; font-weight: bold; padding: 1pt 2pt;">GM</span></p>
					</div>
				</div>
			</div>
			<div id="achievements-and-data" style="width: 100%; display: grid; grid-template-columns: 2fr 1fr; color: white; align-items: center;">
				<div id="achievement-one" style="width: 100%; display: flex; align-items: center; font-size: 13px;">
					<div id="achievement-icon" style="width: 6pt; height: 10pt;">
						<img src="https://picsum.photos/6/10?grayscale" alt="placeholder">
					</div>
					<div id="achievement-label">
						Play A Game Against ...
					</div>
				</div>
				<div id="data-one" style="width: 100%; display: flex; align-items: center; height: 12px;">
					<div id="data-icon" style="width: 6pt; height: 10pt;">
						<img src="https://picsum.photos/6/10?grayscale" alt="placeholder">
					</div>
					<div id="data-label" style="font-size: 10px;">
						2 Common
					</div>
				</div>
				<div id="achievement-two" style="width: 100%; display: flex; align-items: center; font-size: 13px;">
					<div id="achievement-icon" style="width: 6pt; height: 10pt;">
						<img src="https://picsum.photos/6/10?grayscale" alt="placeholder">
					</div>
					<div id="achievement-label">
						Pawn Checkmate
					</div>
				</div>
				<div id="data-two" style="width: 100%; display: flex; align-items: center;">
					<div id="data-icon" style="width: 6pt; height: 10pt;">
						<img src="https://picsum.photos/6/10?grayscale" alt="placeholder">
					</div>
					<div id="data-label" style="font-size: 10px;">
						Standard
					</div>
				</div>
				<div id="achievement-three" style="width: 100%; display: flex; align-items: center; font-size: 13px;">
					<div id="achievement-icon" style="width: 6pt; height: 10pt;">
						<img src="https://picsum.photos/6/10?grayscale" alt="placeholder">
					</div>
					<div id="achievement-label">
						Play 2100+ game
					</div>
				</div>
				<div id="data-three" style="width: 100%; display: flex; align-items: center;">
					<div id="data-icon" style="width: 6pt; height: 10pt;">
						<img src="https://picsum.photos/6/10?grayscale" alt="placeholder">
					</div>
					<div id="data-label" style="font-size: 10px;">
						10 Min
					</div>
				</div>
			</div>
			<div id="metadata" style="max-width: 100%; display: flex; justify-content: space-between; margin: 0 12px; opacity: 0.75; color: white; font-size: 8px; height: 28px; align-items: center;">
				<a id="match-anchor" href="" target="_blank" style="margin: 0; text-decoration: none; color: white;">Match #000000</a>
				<p id="edition" style="margin: 0;">Single Edition</p>
				<p id="date" style="margin: 0;">Jan 1 1900</p>
			</div>
		</div>
	</body>
</html>`

module.exports = htmlString
