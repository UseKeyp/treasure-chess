import HeadingBar from '../HeadingBar/HeadingBar'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import AllTreasuresButton from '../AllTreasuresButton/AllTreasuresButton'

const RecentlyListed = () => {
  return (
    <>
      <div className="mx-auto max-w-[1080px] mt-16">
        <HeadingBar text="Newest Treasures">
          <AllTreasuresButton />
        </HeadingBar>
        <TreasuresFetcher sort="Newest First" />
      </div>
    </>
  )
}

export default RecentlyListed
