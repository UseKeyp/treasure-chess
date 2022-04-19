import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'
import { routes } from '@redwoodjs/router'
import { getCardHtml } from '@treasure-chess/treasure-html'
import { game } from './data.js'

const HomePageHero = () => {
  const [card, setCard] = React.useState()

  const update = async () => {
    const raw = await getCardHtml({
      treasure: { ...game, title: 'Lucky Timeout' },
      gifUrl:
        'https://images.chesscomfiles.com/uploads/game-gifs/90px/brown/neo/0/cc/0/0/bUNaSkNKN0psQiFUYnNKR2NsWVFzQ0dZQ1QyVGd2NkVmbTBLQktFdm12VEtlZzlSdk41WmR2ODZ2MTc5MVM2NWxzWklTQUtDZ2g5THM_TE5BIVk2ITY1Nm93Q3VudVJ3aG93UnB4SUNhZE5Nb3ZNTA,,.gif',
    })

    const replacement =
      raw
        .match(/href=".+?(?=treasures)\S*(\S+)"/g)[0]
        .split('/')
        .slice(0, 3)
        .join('/') + '/treasures"'

    const replacedRaw = raw.replaceAll(
      /href=".+?(?=members|treasures)\S*(\S+)"/g,
      replacement
    )

    setCard(replacedRaw)
  }
  React.useEffect(() => {
    update()
  }, [])
  return (
    <div className="homePageWrapper">
      <div className="homePageContent">
        <div>
          <div className="figuresContent">
            <Icon name="bishop" />
            <Icon name="rook" />
          </div>
          <div className="leftContent ">
            <h1>Treasure your Chess Games.</h1>
            <h3>
              Every chess game is one-of-a-kind. Make yours a collectible.
            </h3>
            <p>Connect Your Chess.com Account</p>
            <Button
              size="large"
              className="bg-greenLight mt-4"
              to={routes.signin()}
            >
              Get Started!
            </Button>
          </div>
        </div>
        <div
          className="mt-6 mx-auto lg:mx-0 md:mt-0"
          dangerouslySetInnerHTML={{ __html: card }}
        />
      </div>
    </div>
  )
}

export default HomePageHero
