import { getLoginUrl, CHESS, handleOauthCodeGrant } from 'src/lib/oAuth'

// Could be optimized to be more general-purpose
export const loginUrl = () => getLoginUrl(CHESS)

export const oauthCodeGrant = handleOauthCodeGrant
