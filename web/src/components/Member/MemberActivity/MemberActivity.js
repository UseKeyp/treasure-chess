// import MiniButton from 'src/components/MiniButton'
import Table from 'src/components/Table/Table'
import { formatDate } from 'src/utils/helpers'
import TreasureLink from 'src/components/TreasureLink'
import { useMinting } from 'src/providers/minting'
import { P } from 'src/components/Typography'
import LoadingDots from 'src/components/LoadingDots'
import { trimString } from 'src/utils/helpers'

const TITLE = 'Activity'

import { MINT_STATUS_SUCCESS } from 'src/providers/minting/constants'

const MemberActivity = ({ member, isLoading, refetch }) => {
  const { pendingMintPurchases, mintStatus } = useMinting()
  React.useEffect(() => {
    if (mintStatus === MINT_STATUS_SUCCESS) return refetch()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [mintStatus, refetch])

  const list = []
  if (!member || isLoading)
    return <Table title={TITLE} isLoading height={250} />
  member?.treasuresMinted?.map((treasure) => {
    list.push([
      formatDate(treasure.createdAt),
      'Minted',
      <TreasureLink key={treasure.id} treasure={treasure} />,
      treasure.createdAt,
    ])
  })
  member?.treasuresWon?.map((treasure) => {
    treasure.marketSales?.map((marketSale) => {
      if (
        marketSale.status === 'SOLD' &&
        marketSale.buyer?.username === member.username
      )
        list.push([
          formatDate(marketSale.updatedAt),
          'Bought',
          <TreasureLink key={marketSale.updatedAt} treasure={treasure} />,
          marketSale.updatedAt,
        ])
    })
  })

  const sorted = list.sort((a, b) => a[3] < b[3])

  if (pendingMintPurchases) {
    pendingMintPurchases.map((purchase) => {
      list.unshift([
        'Now',
        <div
          key={purchase.id}
          className="flex space-x-2 font-bold align-center items-center w-32"
        >
          <LoadingDots />
          <div>Minting</div>
        </div>,
        <P key={purchase.id} fontWeight={700} fontSize={16}>
          {trimString(purchase.title, 10)}
        </P>,
      ])
    })
  }

  const parsed = sorted.map((item) => item.slice(0, 3))

  return (
    <div>
      <Table
        title={TITLE}
        data={parsed}
        colProportions={[4, 1, 1]}
        height={250}
      />
    </div>
  )
}

export default MemberActivity
