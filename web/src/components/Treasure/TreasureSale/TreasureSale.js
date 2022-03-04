import Table from 'src/components/Table/Table'

const TITLE = 'Transaction History'

const TreasureSale = ({ treasure, isLoading }) => {
  const sales = treasure?.marketSales.map((sale) => {
    return [
      sale.updatedAt,
      sale.amount,
      {
        text: sale.buyer.username,
        to: `/members/${sale.buyer.username}`,
      },
    ]
  })

  return (
    <div>
      <Table title={TITLE} isLoading={isLoading} height={150} data={sales} />
    </div>
  )
}

export default TreasureSale
