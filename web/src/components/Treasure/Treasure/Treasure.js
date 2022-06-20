import GameCard from 'src/components/Game/GameCard/GameCard'
import TreasureSocial from 'src/components/Treasure/TreasureSocial/TreasureSocial'
import TreasureMoves from 'src/components/Treasure/TreasureMoves/TreasureMoves'
import TreasureMarketInteraction from 'src/components/Treasure/TreasureMarketInteraction'
import TreasureActivity from 'src/components/Treasure/TreasureActivity/TreasureActivity'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import { MetaTags } from '@redwoodjs/web'
import { trimString } from 'src/utils/helpers'

const Treasure = ({ treasure, isLoading }) => {
  const players = [treasure?.white.username, treasure?.black.username]
  const getUsernames = (players) => Object.values(players).toString()
  // const currentMarketSale = treasure.marketSales ? treasure.marketSales[0] : {}
  // <ItemSaleInteraction tokenId={tokenId} />
  return (
    <div>
      {treasure && (
        <MetaTags
          title={`${trimString(treasure.title, 20)} - ${treasure.rarity}`}
        />
      )}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div className="flex items-start justify-center">
          <GameCard game={treasure} isLoading={isLoading} showGif />
        </div>
        <div className="flex flex-col gap-4">
          <TreasureMarketInteraction
            tokenId={treasure?.tokenId}
            isLoading={isLoading}
          />
          <TreasureActivity treasure={treasure} isLoading={isLoading} />
          <TreasureSocial treasure={treasure} isLoading={isLoading} />
        </div>
        <TreasureMoves treasure={treasure} isLoading={isLoading} />
      </div>
      {/*<div className="how-to-mint justify-center mt-16 p-4 bg-chessBlack-200">
        <div className="mb-2">
          <div className="text-lg">🎁</div>
          <div className="flex justify-between">
            <h3 className="text-base font-bold color-grey-light">
              {t('How to use the Marketplace')}
            </h3>
          </div>
        </div>
        <p className="answer-container text-sm font-normal color-grey-light tracking-tight">
          <Trans i18nKey="web:treasure">
            Once a Treasure is listed for sale by its owner, it can be purchased
            using your wallet balance. You can add funds to your wallet using a
            debit card, and funds can be cashed-out to your bank via your
            <Link to={routes.profile()} className="underline">
              Profile
            </Link>
            Transactions in the Marketplace can take up to 3 minutes to process.
            Learn more over at
            <Link to={routes.about()} className="underline">
              About
            </Link>
            .
          </Trans>
        </p>
      </div>*/}
      <h1 className="mt-16">{t('More by these users')}</h1>
      <div className="w-full mt-4">
        <TreasuresFetcher
          username={getUsernames(players)}
          sort="Price: Low to High"
        />
      </div>
    </div>
  )
}

export default Treasure
