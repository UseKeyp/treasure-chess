import { MetaTags } from '@redwoodjs/web'

const PrivacyPage = () => {
  return (
    <div style={{ maxWidth: '85%', margin: 'auto' }}>
      <MetaTags
        title="Privacy Policy"
        description="Treasure Chess Privacy Policy"
      />
      <iframe
        title="Treasure Chess Privacy Policy"
        style={{
          width: '100%',
          height: '75vh',
          border: 'none',
        }}
        src="https://docs.google.com/document/d/e/2PACX-1vTwyxqybC4zc0_H7EEALljt1JwcqUJOLeye5fD6gGY2jvPc22km_MLjJTwqfnda4c7UiErGcH1syQsb/pub?embedded=true"
      ></iframe>
    </div>
  )
}

export default PrivacyPage
