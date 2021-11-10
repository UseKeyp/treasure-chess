const htmlString = `<html>
	<head>

	</head>
	<body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
		<div id="container" style="color:black; width: 258px; border-radius: 12px; background-color: #FFF8EE; display: flex; flex-direction: column; padding: 4px;">
			<div id="banner" style="width: 100%; background-color: #ABB6B9; border-radius: 8px 8px 2px 2px; display: flex;align-items: center; min-height: 39px; box-sizing: border-box;">
				<div id="icon-container" style="min-width: 19px; padding-right: 8px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.41798 17.3539C5.56512 17.7428 5.93751 18 6.35326 18H17.6475C18.0632 18 18.4356 17.7427 18.5828 17.3539L21.9878 8.35386C22.2353 7.69967 21.7519 7 21.0525 7H2.94761C2.24813 7 1.76478 7.69971 2.01233 8.35391L5.41798 17.3539Z" fill="#312E2B"/>
            <path d="M3.5 21C3.5 20.4477 3.94772 20 4.5 20H19.5C20.0523 20 20.5 20.4477 20.5 21V23C20.5 23.5523 20.0523 24 19.5 24H4.5C3.94772 24 3.5 23.5523 3.5 23V21Z" fill="#312E2B"/>
            <path d="M10.5 1C10.5 0.447715 10.9477 0 11.5 0H12.5C13.0523 0 13.5 0.447715 13.5 1V7C13.5 7.55228 13.0523 8 12.5 8H11.5C10.9477 8 10.5 7.55228 10.5 7V1Z" fill="#312E2B"/>
            <path d="M8.5 3C8.5 2.44772 8.94772 2 9.5 2H14.5C15.0523 2 15.5 2.44772 15.5 3V4C15.5 4.55228 15.0523 5 14.5 5H9.5C8.94772 5 8.5 4.55228 8.5 4V3Z" fill="#312E2B"/>
          </svg>
				</div>
				<div style="color:black">
					<p id="title" style="margin: 0;font-weight: bold; font-size: 11px">Common</p>
					<p id="termination" style="margin: 0; font-size: 10px;" >White won by checkmate</p>
				</div>
			</div>
			<div style="width: 100%; display: flex; align-items: center; min-height: 55px; margin: 2pt 0 1pt 0;">
				<div style="height: 40px; width: 40px;  margin-right: 8px;">
					<img id="top-avatar" src="https://picsum.photos/40/40?grayscale" style="width: 100%; border-radius: 2px;" alt="placeholder"/>
				</div>
				<div style="display: flex; flex-direction: column;">
					<a id="top-username-anchor" href="" target="_blank" style="text-decoration: none; color:black"><p id="top-username" style="font-weight: bold;font-size: 13px; margin: 0;">asahi001</p></a>
					<div style="margin: 0;">
							<p style="margin: 0; display: flex; align-items: center; font-size: 10px;"><span style="margin-right: 1ex;">+6</span><span id="top-flag" src="" style="margin-right: 1ex;">🇺🇸</span><span id="top-rating" style="margin-right: 1ex;">2568</span><span id="top-masterTitle" style="margin-right: 1ex; background-color: red; font-size: 8px; font-weight: bold; padding: 1pt 2pt;">GM</span></p>
					</div>
				</div>
			</div>
      <div id="game" style="min-height: 258px; margin: 1pt 0; background-image: url('/images/is-it-there.png');">
  			<a id="game-anchor" href="chess.com">
  				<img id="game-image" src="" style="width: 100%; border-radius: 2px;" alt="placeholder"/>
  			</a>
      </div>
			<div id="player-two" style="width: 100%; display: flex; align-items: center; min-height: 55px; margin: 2pt 0 1pt 0;">
				<div style="height: 40px; width: 40px; margin-right: 8px;">
					<img id="bottom-avatar" src="https://picsum.photos/40/40?grayscale" style="width: 100%; border-radius: 2px;" alt="placeholder"/>
				</div>
				<div style="display: flex; flex-direction: column;">
          <a id="bottom-username-anchor" href="" target="_blank" style="text-decoration: none; color:black"><p id="bottom-username" style="font-weight: bold;font-size: 13px; margin: 0;">jschiarizzi</p></a>
					<div style="margin: 0;">
							<p style="margin: 0; display: flex; align-items: center; justify-content: flex-start; font-size: 10px;"><span style="margin-right: 1ex;">-6</span><span id="bottom-flag" style="margin-right: 1ex;">🇺🇸</span><span id="bottom-rating" style="margin-right: 1ex;">9999</span><span id="bottom-masterTitle" style="margin-right: 1ex; background-color: red; font-size: 8px; font-weight: bold; padding: 1pt 2pt;">GM</span></p>
					</div>
				</div>
			</div>
			<div id="achievements-and-data" style="width: 100%; display: grid; grid-template-columns: 2fr 1fr; align-items: center;">
				<div id="achievement-one" style="width: 100%; display: flex; align-items: center; font-size: 13px;">
					<div id="achievement-icon" style="width: 6pt; height: 10pt;">
						<img src="https://picsum.photos/6/10?grayscale" alt="placeholder">
					</div>
					<div id="achievement-label">
						Play A Game Against ...
					</div>
				</div>
				<div id="data-one" style="width: 100%; display: flex; align-items: center; height: 12px;">
          <svg width="6pt" height="10pt" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 3H18.6667V1.125C18.6667 0.501562 18.2208 0 17.6667 0H6.33333C5.77917 0 5.33333 0.501562 5.33333 1.125V3H1C0.445833 3 0 3.50156 0 4.125V6.75C0 8.42344 0.9375 10.1438 2.57917 11.4703C3.89167 12.5344 5.4875 13.2094 7.1625 13.425C8.47083 15.8672 10 16.875 10 16.875V20.25H8C6.52917 20.25 5.33333 21.2203 5.33333 22.875V23.4375C5.33333 23.7469 5.55833 24 5.83333 24H18.1667C18.4417 24 18.6667 23.7469 18.6667 23.4375V22.875C18.6667 21.2203 17.4708 20.25 16 20.25H14V16.875C14 16.875 15.5292 15.8672 16.8375 13.425C18.5167 13.2094 20.1125 12.5344 21.4208 11.4703C23.0583 10.1438 24 8.42344 24 6.75V4.125C24 3.50156 23.5542 3 23 3ZM4.1375 9.0375C3.12083 8.2125 2.66667 7.29375 2.66667 6.75V6H5.34167C5.38333 7.52812 5.58333 8.86875 5.875 10.0406C5.24583 9.79688 4.65833 9.45938 4.1375 9.0375ZM21.3333 6.75C21.3333 7.50469 20.5958 8.44219 19.8625 9.0375C19.3417 9.45938 18.75 9.79688 18.1208 10.0406C18.4125 8.86875 18.6125 7.52812 18.6542 6H21.3333V6.75Z" fill="black"/>
          </svg>
					<div id="data-label" style="margin-left:6; font-size: 10px;">
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
				<div style="width: 100%; display: flex; align-items: center;">
          <svg width="6pt" height="10pt" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.74227e-08 22C3.91405e-08 23.1046 0.895431 24 2 24H22C23.1046 24 24 23.1046 24 22V2C24 0.895431 23.1046 1.00993e-06 22 9.61651e-07L2 8.74228e-08C0.895431 3.91405e-08 1.00993e-06 0.895431 9.6165e-07 2L8.74227e-08 22ZM6.50667 23V17.4933H1L1 12H6.50667V6.49333H1L1 1.98667C1 1.43438 1.44772 0.986667 2 0.986667L6.50667 0.986667L6.50667 6.49333L12 6.49333V0.986667L17.4933 0.986667V6.49333L23 6.49333V12H17.4933V17.5067H23V22C23 22.5523 22.5523 23 22 23H17.4933V17.4933H12V22.9867L6.50667 23Z" fill="black"/>
            <path d="M12 17.4933L12.0001 11.9868H6.49346V17.4934L12 17.4933Z" fill="black"/>
            <path d="M17.4933 12L17.4933 6.49333L11.9869 6.49368V12.0003L17.4933 12Z" fill="black"/>
          </svg>
					<div id="metadata-ruleVariant" style="font-size: 10px; margin-left:6">
						Standard
					</div>
				</div>
				<div id="achievement-three" style="width: 100%; display: flex; align-items: center; font-size: 13px;">
					<div id="achievement-label">
						Play 2100+ game
					</div>
				</div>
				<div style="width: 100%; display: flex; align-items: center;">
          <svg width="6pt" height="10pt" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
            <path fill="black" d="M13.8958 3.73347C13.6527 3.69004 13.47 3.48213 13.47 3.23509C13.47 2.962 13.6914 2.74062 13.9645 2.74062H14.3409C14.8219 2.74062 15.2118 2.35071 15.2118 1.86974V0.999999C15.2118 0.447714 14.764 0 14.2118 0H9.78824C9.23596 0 8.78824 0.447715 8.78824 1V1.86974C8.78824 2.35071 9.17815 2.74062 9.65912 2.74062H10.0355C10.3086 2.74062 10.53 2.962 10.53 3.23509C10.53 3.48213 10.3474 3.69004 10.1042 3.73347C7.64163 4.17328 5.41618 5.45641 3.83584 7.35785C2.16489 9.3683 1.33944 11.9205 1.5259 14.4998C1.71237 17.079 2.89688 19.4936 4.84063 21.2566C6.78438 23.0197 9.34278 24 12 24C14.6572 24 17.2156 23.0197 19.1594 21.2566C21.1031 19.4936 22.2876 17.079 22.4741 14.4998C22.6606 11.9205 21.8351 9.3683 20.1642 7.35785C18.5838 5.45641 16.3584 4.17328 13.8958 3.73347ZM12 20.6388C10.6044 20.6412 9.23949 20.2406 8.07792 19.4879C6.91635 18.7352 6.01036 17.6641 5.4746 16.4101C4.93884 15.1562 4.79739 13.7758 5.06816 12.4436C5.33892 11.1114 6.00973 9.8873 6.99569 8.92621C7.98165 7.96512 9.23844 7.31023 10.607 7.04442C11.9756 6.77862 13.3945 6.91383 14.6841 7.43297C15.9736 7.9521 17.076 8.83181 17.8516 9.96078C18.6272 11.0897 19.0412 12.4172 19.0412 13.7752C19.0412 15.5935 18.2997 17.3374 16.9796 18.6243C15.6595 19.9111 13.8686 20.6356 12 20.6388Z"/>
            <path  fill="black" d="M12.9879 9.10196C12.8126 7.97329 11.187 7.97323 11.0116 9.1019L10.2152 14.228C10.1645 14.5539 10.2779 14.8839 10.5181 15.1099L11.3144 15.859C11.6994 16.2212 12.2998 16.2212 12.6848 15.859L13.4811 15.1098C13.7213 14.8838 13.8346 14.5539 13.784 14.228L12.9879 9.10196Z"/>
          </svg>
					<div id="metadata-timeControl" style="font-size: 10px; margin-left:6">
						10 Min
					</div>
				</div>
			</div>
			<div style="max-width: 100%; display: flex; justify-content: space-between; margin: 0 12px; opacity: 0.75;  font-size: 8px; height: 28px; align-items: center;">
				<a id="match-anchor" href="" target="_blank" style="margin: 0; text-decoration: none; color:black">Match #000000</a>
				<p id="edition" style="margin: 0;">Single Edition</p>
				<p id="date" style="margin: 0;">Jan 1 1900</p>
			</div>
		</div>
	</body>
</html>`

module.exports = htmlString
