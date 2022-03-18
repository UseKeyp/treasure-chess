import MemberDetails from './MemberDetails'

import members from '../../../../../scripts/seed/member'

export const memberTwitchConnected = () => {
  mockCurrentUser({
    twitchUsername: 'example_twitch_username',
  })

  return <MemberDetails member={members[2]} />
}

export const memberTwitchNotConnected = () => {
  mockCurrentUser({
    twitchUsername: 'example_twitch_username',
  })

  return <MemberDetails member={members[3]} />
}

export const profileTwitchConnected = () => {
  mockCurrentUser({
    twitchUsername: 'example_twitch_username',
  })

  return <MemberDetails member={members[2]} isProfile />
}

export const profileTwitchNotConnected = () => {
  mockCurrentUser({
    twitchUsername: 'example_twitch_username',
  })

  return <MemberDetails member={members[3]} isProfile />
}

export default { title: 'Components/MemberDetails' }
