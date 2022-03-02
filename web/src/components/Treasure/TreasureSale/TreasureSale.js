import Table from 'src/components/Table/Table'

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

  if (sales.length === 0) return null

  return (
    <div>
      <Table
        title="Transaction History"
        isLoading={isLoading}
        height={150}
        data={sales}
      />
    </div>
  )
}

export default TreasureSale
