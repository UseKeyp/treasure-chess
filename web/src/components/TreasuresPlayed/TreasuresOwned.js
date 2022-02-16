import { getCardHtml } from '@treasure-chess/treasure-html'

const TreasuresOwned = ({ game, gameAmount }) => {
  const [card, setCard] = React.useState()
  const update = async () => {
    const raw = await getCardHtml({
      treasure: { ...game, title: 'Lucky Timeout' },
      gifUrl:
        'https://images.chesscomfiles.com/uploads/game-gifs/90px/brown/neo/0/cc/0/0/bUNaSkNKN0psQiFUYnNKR2NsWVFzQ0dZQ1QyVGd2NkVmbTBLQktFdm12VEtlZzlSdk41WmR2ODZ2MTc5MVM2NWxzWklTQUtDZ2g5THM_TE5BIVk2ITY1Nm93Q3VudVJ3aG93UnB4SUNhZE5Nb3ZNTA,,.gif',
    })
    setCard(raw)
  }
  React.useEffect(() => {
    update()
  }, [])
  return (
    <div className="card">
      <div
        className="w-[100%] mt-2 mx-auto lg:mx-0 md:mt-0"
        dangerouslySetInnerHTML={{ __html: card }}
      />
      {gameAmount && (
        <div className="cardText mt-2">
          <p>$ {gameAmount}</p>
        </div>
      )}
    </div>
  )
}

export default TreasuresOwned
