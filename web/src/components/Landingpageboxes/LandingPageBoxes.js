import Icon from 'src/components/Icon/Icon'

const LandingPageBoxes = () => {
  return (
    <div className="pageBoxes mx-auto">
      <div className="pageBox">
        <Icon
          name="play"
          size={{ width: '100%', height: 'auto' }}
          className="my-5 py-2 mx-auto lg:my-7 lg:py-0 sm:py-2 sm:my-5"
        />
        <h2 className="text-center capitalize">play</h2>
        <h4 className="text-center mx-auto w-56">
          Have fun playing games with your friends on Chess.com, or watching
          your favorite Chess.com streamers.
        </h4>
      </div>
      <div className="pageBox">
        <Icon
          name="create"
          className="my-5 py-2 mx-auto lg:my-7 lg:py-0 sm:py-2 sm:my-5"
          size={{ width: '168px', height: '120px' }}
        />
        <h2 className="text-center capitalize">create</h2>
        <h4 className="text-center w-56 mx-auto">
          Turn your own games into a one-of-a-kind collectible Treasure.
        </h4>
      </div>
      <div className="pageBox">
        <Icon
          name="collect"
          className="my-5 py-2 mx-auto lg:my-7 lg:py-0 sm:py-2 sm:my-5"
          size={{ width: '168px', height: '120px' }}
        />
        <h2 className="text-center capitalize">collect</h2>
        <h4 className="text-center mx-auto w-56">
          Find interesting and unique Treasures to collect and share.
        </h4>
      </div>
    </div>
  )
}

export default LandingPageBoxes
