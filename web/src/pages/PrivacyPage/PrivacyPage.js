import { MetaTags } from '@redwoodjs/web'

const PrivacyPage = () => {
  return (
    <div className="">
      <MetaTags
        title="Privacy Policy"
        description="Treasure Chess Privacy Policy"
      />
      <h1>{'Privacy Policy'}</h1>
      <div className="flex justify-center w-full mt-4">
        <iframe
          title="Treasure Chess Privacy Policy"
          className="w-full sm:w-[70%] h-screen mt-4 "
          src="https://docs.google.com/document/d/e/2PACX-1vTwyxqybC4zc0_H7EEALljt1JwcqUJOLeye5fD6gGY2jvPc22km_MLjJTwqfnda4c7UiErGcH1syQsb/pub?embedded=true"
        ></iframe>
      </div>
    </div>
  )
}

export default PrivacyPage
