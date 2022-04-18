import ModalContainer from './ModalContainer'

import Icon from 'src/components/Icon'
import { ConfettiExplosion } from 'src/providers/minting/modals'
import GameCard from 'src/components/Game/GameCard'

const game = {
  __typename: 'Game',
  id: '30756476687',
  endTime: '2021-11-15T23:08:48.000Z',
  white: { __typename: 'Member', imageSrc: null, country: 'US' },
  black: {
    __typename: 'Member',
    imageSrc:
      'https://images.chesscomfiles-4.com/uploads/v1/user/41479298.3d21e1ba.200x200o.7b825295a3d5.jpeg',
    country: 'US',
  },
  moveCount: 12,
  outcome: 'black',
  termination: 'treasure_joseph won by resignation',
  externalUrl: 'https://www.chess-6.com/game/live/30756476687',
  achievements: null,
  cardColor: 'white',
  ruleVariant: 'Standard',
  whiteRating: 179,
  blackRating: 621,
  timeControl: '60',
  winnerUsername: 'treasure_joseph',
  winnerId: '41479298',
  blackUsername: 'treasure_joseph',
  blackId: '41479298',
  blackMasterTitle: null,
  whiteUsername: 'treasure_patrick',
  whiteId: '41494122',
  whiteMasterTitle: null,
  tokenId: null,
  title: null,
}

const bodyWyreDeposit =
  'Fund your wallet using Wyre. Funds are typically added in less than 3 minutes, and can be withdrawn anytime according to the limits set by Wyre.'

const bodyStyle = { fontSize: '16px' }

const bodyDeposit = (
  <div>
    <p className="pb-2" style={bodyStyle}>
      WARNING: At this time you can only deposit USDC on the Polygon Network
      (Matic).
    </p>
    <p className="pb-2" style={bodyStyle}>
      Do not send anything else to this address, or use other networks. You will
      not be able to recover other assets, and they may be lost forever. We
      cannot guarantee support will be added for other networks or assets.
    </p>
    <p className="pb-2" style={bodyStyle}>
      By continuing you agree you’ve read this and understand these risks.
    </p>
  </div>
)

const bigBodyText =
  'Trees. It was something about the trees. The way they swayed with the wind in unison. The way they shaded the area around them. The sounds of their leaves in the wind and the creaks from the branches as they sway, The trees were making a statement that I just couldnt understand. The answer was within her reach. It was hidden in a box and now that box sat directly in front of her. She had spent years searching for it and could hardly believe she had finally managed to find it. She turned the key to unlock the box and then gently lifted the top. She held her breath in anticipation of finally knowing the answer she had spent so much of her time in search of. As the lid came off she could see that the box was empty. It seemed like it should have been so simple. There was nothing inherently difficult with getting the project done. It was simple and straightforward enough that even a child should have been able to complete it on time, but that was not the case. The deadline had arrived and the project remained unfinished. The lone lamp post of the one-street town flickered, not quite dead but definitely on its way out. Suitcase by her side, she paid no heed to the light, the street or the town. A car was coming down the street and with her arm outstretched and thumb in the air, she had a plan. His parents continued to question him. He didnt know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden. Of course it didnt help that grandpa was roaring with laughter in the chair next to him as he tried to explain once again how he had found it.'

const backgroundText = []
for (let i = 0; i < 50; i++) {
  backgroundText.push(<div id={i}>blah blah blah home content</div>)
}

export const wyreDeposit = () => {
  return (
    <div>
      <ModalContainer
        headerText="Deposit Funds"
        content={bodyWyreDeposit}
        submitText="Deposit with Wyre"
        icon={<Icon name="wyre" size="29" />}
        isVisible={true}
        hideModal={() => {
          /* eslint-disable-next-line no-console */
          console.log('CLOSED MODAL')
        }}
        onSubmit={() => {
          /* eslint-disable-next-line no-console */
          console.log('ONSUBMIT MODAL')
        }}
      />
      {backgroundText}
    </div>
  )
}

export const usdcDeposit = () => {
  return (
    <div>
      <ModalContainer
        headerText="Deposit USDC"
        content={bodyDeposit}
        submitText="Copy Wallet Address"
        isVisible={true}
        hideModal={() => {
          /* eslint-disable-next-line no-console */
          console.log('CLOSED MODAL')
        }}
        onSubmit={() => {
          /* eslint-disable-next-line no-console */
          console.log('ONSUBMIT MODAL')
        }}
      />
      {backgroundText}
    </div>
  )
}

export const bigBody = () => {
  return (
    <div>
      <ModalContainer
        headerText="Big Body Example"
        content={bigBodyText}
        submitText="Copy Wallet Address"
        isVisible={true}
        hideModal={() => {
          /* eslint-disable-next-line no-console */
          console.log('CLOSED MODAL')
        }}
        onSubmit={() => {
          /* eslint-disable-next-line no-console */
          console.log('ONSUBMIT MODAL')
        }}
      />
      {backgroundText}
    </div>
  )
}

export const mintSuccess = () => {
  return (
    <ModalContainer
      headerText="New Treasure Minted!"
      isVisible={true}
      hideModal={() => {
        /* eslint-disable-next-line no-console */
        console.log('CLOSED MODAL')
      }}
      onSubmit={() => {
        /* eslint-disable-next-line no-console */
        console.log('ONSUBMIT MODAL')
      }}
      submitText="View"
      cancelText="Back"
      content={
        <div className="flex justify-center align-center h-full w-full">
          <GameCard game={game} showGif={true} />
          <ConfettiExplosion />
        </div>
      }
    />
  )
}

// to demonstrate scrolling is enabled when isVisible = false

export const noModal = () => {
  return (
    <div>
      <ModalContainer isVisible={false} />
      {backgroundText}
    </div>
  )
}

export default { title: 'Components/ModalContainer' }
