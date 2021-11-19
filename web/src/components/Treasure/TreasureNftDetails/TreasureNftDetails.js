import MemberLink from 'src/components/MemberLink'
import DetailsBox from 'src/components/DetailsBox'
import { trimString } from 'src/utils/helpers'
import TreasureSocial from '../TreasureSocial/TreasureSocial'

const TreasureNftDetails = ({ treasureNftDetails }) => {
  const bidItems = treasureNftDetails.bids.map(({ price, bidder }, i) => {
    return (
      <span key={i} className={`${i === 0 ? 'text--green' : ''}`}>
        ${price} - <MemberLink id={bidder} />
      </span>
    )
  })
  const historyItems = treasureNftDetails.history.map((item, i) => {
    return (
      <span key={i} className={`${i === 0 ? 'text--green' : ''}`}>
        {trimString(JSON.stringify(item), 20)}
      </span>
    )
  })

  return (
    <div className="details-wrapper">
      <h2 className="text-center text-5xl">NFT Details</h2>
      <br />
      <DetailsBox
        heading="Owner"
        items={[<MemberLink key="0" member={treasureNftDetails.owner} />]}
      />
      <br />
      <DetailsBox
        heading="Minter"
        items={[<MemberLink key="0" member={treasureNftDetails.minter} />]}
      />
      <br />
      <DetailsBox heading="Bids" items={bidItems} />
      <br />
      <DetailsBox heading="NFT History" items={historyItems} />
      <TreasureSocial
        minter={treasureNftDetails.minter.username}
        owner={treasureNftDetails.owner.username}
        treasureId={treasureNftDetails.id}
      />
    </div>
  )
}

export default TreasureNftDetails
