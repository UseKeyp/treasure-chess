let RedwoodDevFatalErrorPage = undefined
if (process.env.NODE_ENV === 'development') {
  RedwoodDevFatalErrorPage = require('@redwoodjs/web').DevFatalErrorPage
}

import globalConfig from 'src/global.config'

const currentYear = new Date().getFullYear()

export default RedwoodDevFatalErrorPage ||
  (() => (
    <main>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              html, body {
                position: fixed;
                margin: 0;
                height: 100%;
                width: 100%;
              }
              html * {
                box-sizing: border-box;
              }
              @media all and (min-width:800px) {
                .header-container {
                  max-width: 80rem;
                  margin: 14px auto;
                  height: 66px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
                  padding: 2.5ex 2ex;
                  background: #272522;
                  border-radius: 12px;
                }
                .header-buttons-container {
                  margin-left: auto;
                  font-size: 16px;
                }
                .header-buttons {
                  display: inline-flex;
                  font-weight: bold;
                  margin-right: 2rem;
                }

                .footer-info {
                  position: relative;
                  margin-left: 8rem;
                }

                .header-mobile {
                  display: none;
                }
              }

              @media all and (max-width:800px) {
                .header-container {
                  max-width: 80rem;
                  margin: 14px auto;
                  height: 66px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
                  padding: 2.5ex 2ex;
                  background: #272522;
                  border-radius: 12px;
                }
                .header-buttons-container {
                  margin-left: auto;
                  font-size: 16px;
                }
                .header-buttons {
                  display: inline-flex;
                  font-weight: bold;
                }

                .footer-info {
                  position: relative;
                  margin-left: 8rem;
                }

                .header-mobile {
                  display: none;
                }
              }

              .error-container {
                  position: relative;
                  top: 20vh;
                  max-width: 50rem;
                  margin: 0 auto;
                  padding: 0 10px;
                }
                .error-title {
                  margin-bottom: 1rem;
                }
                .error-content {
                  height: auto;
                  background: #272522;
                  border-radius: 12px;
                  padding: 16px;
                }
                .error-content h4 {
                  font-weight: bold;
                }
                .footer-container-fatal {
                  position: fixed;
                  background-color: #272522;
                  left: 50%;
                  transform: translateX(-50%);
                  bottom: 0;
                  width:100%;
                  display: flex;
                  flex-wrap: wrap;
                  flex-direction: row;
                  font-size: 12px;
                  justify-content: space-around;
                  text-align: center;
                  padding-top: 2rem;
                  padding-bottom: 2rem;
                }
                .footer-row {
                  display: flex;
                  align-items: center;
                  margin-right: 1rem;
                  margin: 10px 0;
                }
                .footer-row a {
                  padding-right: 10px;
                  text-decoration: underline;
                }
                .footer-container img {
                  margin-right: 1rem
                }
            `,
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: `
              <div class="fatal-error-container">
                <div class="header-container">
                  <a href="/">
                    <img src="/treasurechessfull-fatal-page.png" alt="TreasureChess.com" style="height: 35px"/>
                  </a>
                  <div class="header-mobile">
                  </div>
                  <div class="header-buttons-container">
                    <a class="header-buttons" href="/treasures">
                      <img src="/icons/treasure_chess_small.png" alt="" style="height: 16px; padding: 0 8px"/>
                      Treasures
                    </a>
                  </div>
                </div>
                <div class="error-container">
                  <h1 class="error-title">Blunder!</h1>
                  <div class="error-content">
                    <h4>Something went wrong</h4>
                    <p>
                    The developer team has been notified of this error. Thank you for your patience.
                    </p>
                  </div>
                </div>
                <div class="footer-container-fatal">
                  <div class="footer-row">
                    <a href=${globalConfig.DISCORD_URL}>
                      <img src="/icons/discord.svg" alt="Discord icon" />
                    </a>
                  </div>
                  <div class="footer-row">
                    <a href=${globalConfig.BLOG_URL}>Blog</a>
                    <a href=${globalConfig.TOC_URL}>Terms</a>
                    <a href=${globalConfig.PRIVACY_POLICY_URL}>Privacy</a>
                    <a href=${globalConfig.SUPPORT_URL}>Support</a>
                  </div>
                  <div class="footer-row">
                    <a href=${globalConfig.CHESS_COM_BASE_URL}>
                      <img src="/icons/chess_com.svg" alt="Chess.com pawn logo" />
                    </a>
                    <p>© Nifty Chess, Inc. ${currentYear}</p>
                  </div>
                </div>
              </div>
        `,
        }}
      />
    </main>
  ))
