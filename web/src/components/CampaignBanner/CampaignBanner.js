import campaignConfig from 'src/bannerCampaign.config'
import Icon from 'src/components/Icon/Icon'
import { useEffect, useState } from 'react'

const CampaignBanner = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem('campaign-name')) == campaignConfig.title
    ) {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [])

  const closeBanner = () => {
    localStorage.setItem('campaign-name', JSON.stringify(campaignConfig.title))
    setShow(false)
  }

  if (show) {
    return (
      <header className="flex justify-between items-center px-4 py-2 bg-chessBlack-200 w-full relative">
        <div className="flex flex-row items-center space-x-4 sm:space-x-4 ml-6 mr-4">
          <div>
            <Icon
              name={campaignConfig.iconName}
              color="#ffffff"
              height="16px"
            />
          </div>
          <div className="font-bold text-left break-normal sm:text-sm text-xs">
            {campaignConfig.text}
          </div>
        </div>
        <div className="flex flex-row items-center ml-2">
          <button className="bg-greenLight text-white sm:text-sm text-xs font-bold my-4 sm:py-2 py-1 px-4 rounded">
            {campaignConfig.buttonText}
          </button>
          <button
            onClick={closeBanner}
            className="bg-blue-500 hover:bg-greyDark hover:-translate-y-1 text-white text-sm font-bold my-4 px-4 sm:py-2 py-1 rounded"
          >
            X
          </button>
        </div>
      </header>
    )
  } else {
    return <></>
  }
}

export default CampaignBanner
