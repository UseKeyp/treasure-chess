// This page will be rendered when an error makes it all the way to the top of the
// application without being handled by a Javascript catch statement or React error
// boundary.
//
// You can modify this page as you wish, but it is important to keep things simple to
// avoid the possibility that it will cause its own error. If it does, Redwood will
// still render a generic error page, but your users will prefer something a bit more
// thoughtful. =)

export default () => (
  <main>
    <style
      dangerouslySetInnerHTML={{
        __html: `
              html, body {
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
                  margin: 0 auto;
                  height: 66px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
                  padding: 2.5ex 2ex;
                  background: #272522;
                  border-radius: 12px;
                }
                .header-search-bar-container {
                  margin-left: 1rem;
                }
                .header-search-bar {
                  font-size: 1rem;
                  padding: 12px 24px;
                  background-color: #4f4f4f;
                  border-radius: 20px;
                  border: 1px solid #4f4f4f;
                  outline: none;
                }
                .header-search-bar:focus {
                  border: 1px solid #aaa;
                }
                .header-search-bar::placeholder {
                  color: white;
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
                .header-mobile {
                  display: none;
                }
              }

              @media all and (max-width:800px) {
                .header-container {
                  max-width: 80rem;
                  margin: 0 auto;
                  height: 66px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
                  padding: 2.5ex 2ex;
                  background: #272522;
                  border-radius: 12px;
                }
                .header-mobile {
                  font-weight: bold;
                }
                .header-container div {
                  display: none;
                }
              }

              .error-container {
                  position: relative;
                  top: 25vh;
                  max-width: 50rem;
                  margin: 0 auto;
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

                .footer-container {
                  margin: 75vh auto;
                  max-width: 80rem;
                  display: flex;
                  flex-wrap: wrap;
                  flex-direction: row;
                  font-size: 13px;
                  justify-content: space-around;
                  text-align: center;
                }
                .footer-container img {
                  margin-right: 1rem
                }
                .footer-container div {
                  display: inline-flex;
                  align-items: center;
                }
                .footer-info {
                  position: relative;
                  margin-left: 8rem;

                }
                .footer-info a {
                  margin-right: 1rem;
                }

            `,
      }}
    />
    <div className="fatal-error-container">
      <div className="header-container">
        <img src="TreasureChessLogo.png" alt="TreasureChess.com" />
        <h3 className="header-mobile">Menu</h3>
        <div className="header-search-bar-container">
          <input className="header-search-bar" placeholder="Search Treasures" />
        </div>
        <div className="header-buttons-container">
          <button className="header-buttons">
            <img src="/icons/TreasureChessChest.svg" alt="" />
            Treasures
          </button>
          <button className="header-buttons">
            <img src="/icons/TreasureChessHelpIcon.png" alt="" />
            About
          </button>
        </div>
      </div>
      <div className="error-container">
        <h1 className="error-title">Oops!</h1>
        <div className="error-content">
          <h4>Something went wrong</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            ultricies, nulla et tempus egestas, lacus nisi congue nisl, ac
            euismod dolor mi nec dui. Aliquam.
          </p>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-socials">
          <img src="/icons/discord.svg" alt="" />
          <a href>Blog</a>
        </div>
        <div className="footer-info">
          <a href>Terms of Service</a>
          <a href>Privacy Policy</a>
          <a href>Support</a>
        </div>
        <div className="footer-branding">
          <img src="/icons/chess_com.svg" alt="" />
          <a href>@ Nifty Chess, Inc.2021</a>
        </div>
      </div>
    </div>
  </main>
)
