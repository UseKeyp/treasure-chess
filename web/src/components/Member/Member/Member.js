import MemberDetails from 'src/components/Member/MemberDetails'
import MemberActivityCell from 'src/components/Member/MemberActivityCell'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import { routes } from '@redwoodjs/router'
import { useFilter } from 'src/providers/filters'
import SortingDropdown from 'src/components/SortingDropdown/SortingDropdown'
import { MetaTags } from '@redwoodjs/web'

import FilterBar from 'src/components/FilterBar/FilterBar'

const Member = ({ member, isLoading }) => {
  const { filter, sort, defaultParams } = useFilter()
  //const twitchSrc = `https://player.twitch.tv/?channel=${member.twitchUsername}&parent=${process.env.APP_DOMAIN}&muted=true&autoplay=true`
  // To test locally, uncomment and use domain "localhost"
  // const twitchSrc = `https://player.twitch.tv/?channel=jpegjames&parent=localhost&muted=true&autoplay=true`
  return (
    <div className="max-width-container">
      {member && <MetaTags title={member?.username} />}
      <div className="grid grid-rows-1 gap-10">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <MemberDetails member={member} isLoading={isLoading} />
          <MemberActivityCell usernameOrAddress={member.username} />
        </div>
      </div>
      {/*member.twitchUsername && (
        <div className="mt-10 px-2 w-full flex justify-center bg-black rounded-xl border-4 border-[#5A3E85]">
          <iframe
            title={`Twitch stream for ${member.twitchUsername}`}
            src={twitchSrc}
            allowFullScreen
            width={400}
            height={300}
          ></iframe>
        </div>
      )*/}

      <h1 className="mt-10">{t('Treasures Played')}</h1>
      <div className="flex mt-4">
        <TreasuresFetcher
          limit
          seeMore={routes.treasures({ username: member.username })}
          username={member.username}
          sort="Highest Level"
        />
      </div>
      <h1 className="mt-10">{t('Treasures Owned')}</h1>
      <div className="flex mt-4">
        <div className="md:mr-4 w-full">
          <div className="flex w-full justify-end relative mb-4">
            <SortingDropdown />
          </div>
          <TreasuresFetcher
            owner={member.username}
            filter={new URLSearchParams(filter).toString()}
            sort={sort}
          />
        </div>
        <FilterBar defaultParams={defaultParams} hideOnMobile disableUsername />
      </div>
    </div>
  )
}

export default Member
