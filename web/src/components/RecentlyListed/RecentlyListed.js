import HeadingBar from '../HeadingBar/HeadingBar'
import Button from 'src/components/Button/Button'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'

const RecentlyListed = () => {
  return (
    <>
      <div className="mx-auto max-w-[1080px] mt-16">
        <HeadingBar text="Recently Listed">
          <Button className="allTreasuresButton" to={'/treasures'}>
            <div className="flex flex-row items-center justify-around">
              <img src="/icons/treasure_chess_small.png" alt=""></img>
              <span>All Treasures</span>
            </div>
          </Button>
        </HeadingBar>
        <TreasuresFetcher sort="Newest First" />
      </div>
    </>
  )
}

export default RecentlyListed
