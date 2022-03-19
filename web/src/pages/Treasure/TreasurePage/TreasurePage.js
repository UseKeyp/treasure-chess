import { MetaTags } from '@redwoodjs/web'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import { useState, useEffect } from 'react'
import TreasureCell from 'src/components/Treasure/TreasureCell/TreasureCell'
import { gql, useQuery } from '@apollo/client'

const GET_PLAYERS = gql`
  query GetPlayersFromTreasure($tokenId: String!) {
    treasure: treasure(tokenId: $tokenId) {
      black {
        username
      }
      white {
        username
      }
    }
  }
`

const TreasurePage = ({ tokenId }) => {
  const { data } = useQuery(GET_PLAYERS, {
    variables: { tokenId },
  })

  const [players, setPlayers] = useState({ white: '', black: '' })

  const getUsernames = (players) => Object.values(players).toString()
  useEffect(() => {
    setPlayers({
      white: data?.treasure.white.username,
      black: data?.treasure.black.username,
    })
  }, [data])

  return (
    <div className="item-page max-width-container">
      <MetaTags
        title="Treasure"
        // description="About the awesome team"
        // ogUrl="https://awesomeredwoodapp.com/start"
        // ogContentUrl="https://awesomeredwoodapp.com/static/og.png"
        // robots={['nofollow']}
      />
      <TreasureCell tokenId={tokenId} />
      <h1 className="mt-8">More by these users</h1>
      <div className="flex mt-4">
        <TreasuresFetcher
          username={getUsernames(players)}
          sort="Price: Low to High"
        />
      </div>
    </div>
  )
}

export default TreasurePage
