import { Head } from '@redwoodjs/web'
import { routes } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'

export default () => (
  <>
    <Head>
      <title>Treasure Chess | Page Not Found!</title>
    </Head>
    <main className="not-found">
      <section className="not-found--container">
        <div className="not-found--img">
          <img src="/no-go.png" className="h-auto w-full block" alt="" />
        </div>
        <div className="not-found--content">
          <h1>Oops! Something is clearly wrong here...</h1>
          {/* eslint-disable-next-line */}
          <p>The page you are looking for doesn't exist. (404)</p>
          <div className="not-found--content--go-home">
            <Button to={routes.home()}>
              <img src="/TreasureChessLogo.png" alt="TreasureChess.com" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  </>
)
