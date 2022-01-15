import Icon from 'src/components/Icon/Icon'

const LandingPageBoxes = () => {
  return (
    <div className="pageBoxes">
      <div className="pageBox">
        <Icon
          name="play"
          size={{ width: '100%', height: 'auto' }}
          className="my-3 mx-auto"
        />
        <h2 className="text-center capitalize">play</h2>
        <h4 className="text-center">
          Have fun playing games with your friends on Chess.com, or watching
          your favorite Chess.com streamers.
        </h4>
      </div>
      <div className="pageBox">
        <Icon
          name="create"
          className="my-3 mx-auto"
          size={{ width: '100%', height: 'auto' }}
        />
        <h2 className="text-center capitalize">create</h2>
        <h4 className="text-center">
          Turn your own games into a one-of-a-kind collectible Treasure.
        </h4>
      </div>
      <div className="pageBox">
        <Icon
          name="collect"
          className="my-3 mx-auto"
          size={{ width: '100%', height: 'auto' }}
        />
        <h2 className="text-center capitalize">collect</h2>
        <h4 className="text-center">
          Find interesting and unique Treasures to collect and share.
        </h4>
      </div>
    </div>
  )
}

export default LandingPageBoxes
