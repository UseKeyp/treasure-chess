import ChainData from 'src/components/ChainData/ChainData'

export const QUERY = gql`
  query ChainDataQuery {
    chainData {
      networkName
      treasureAddress
      marketAddress
      totalSupply
    }
  }
`

export const Loading = () => <ChainData isLoading />

export const Empty = () => <ChainData isError />

export const Failure = () => <ChainData isError />

export const Success = ({ chainData }) => {
  return <ChainData chainData={chainData} />
}
