import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

import MemberDetails from 'src/components/Member/MemberDetails'
import MemberActivityCell from 'src/components/Member/MemberActivityCell'
import GameExplorer from 'src/components/Game/GameExplorer'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import SortingDropdown from 'src/components/SortingDropdown/SortingDropdown'
import FilterBar from 'src/components/FilterBar/FilterBar'
import { useFilter } from 'src/providers/filters'

const Profile = () => {
  const { currentUser } = useAuth()
  const { filter, sort, defaultParams } = useFilter()

  if (!currentUser) {
    return <></>
  }
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <MemberDetails member={currentUser} isProfile />
          <MemberActivityCell usernameOrAddress={currentUser?.username} />
        </div>
      </div>
      <h1 className="mt-10">{t('Treasures Played')}</h1>
      <div className="flex mt-4 h-[476px]">
        <TreasuresFetcher
          limit
          username={currentUser?.username}
          seeMore={routes.treasures({ username: currentUser?.username })}
          sort="Highest Level"
        />
      </div>
      <h1 className="mt-10">{t('Mint new Treasures')}</h1>
      <div className="mt-4">
        <GameExplorer />
      </div>
      <h1 className="mt-10">{t('Treasures Owned')}</h1>
      <div className="flex mt-4">
        <div className="md:mr-4 w-full">
          <div className="flex w-full justify-end relative mb-4">
            <SortingDropdown />
          </div>
          <TreasuresFetcher
            owner={currentUser?.username}
            filter={new URLSearchParams(filter).toString()}
            sort={sort}
          />
        </div>
        <FilterBar defaultParams={defaultParams} hideOnMobile disableUsername />
      </div>
    </div>
  )
}

export default Profile
