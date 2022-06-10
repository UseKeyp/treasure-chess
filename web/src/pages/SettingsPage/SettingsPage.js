import { MetaTags } from '@redwoodjs/web'
import Settings from 'src/components/Settings/Settings'
const SettingsPage = () => {
  return (
    <>
      <MetaTags title="Settings" description="Settings page" />
      <Settings />
    </>
  )
}

export default SettingsPage
