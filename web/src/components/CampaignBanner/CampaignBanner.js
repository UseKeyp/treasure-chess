import campaignConfig from 'src/bannerCampaign.config'
import Icon from 'src/components/Icon/Icon'
import { useEffect, useState } from 'react'
import Button from 'src/components/Button/Button'

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
      <div className="bg-chessBlack-200">
        <header className="flex justify-between items-center py-2 mb-2 max-w-7xl mx-auto">
          <div className="flex flex-row items-center space-x-4 sm:space-x-4">
            <div className="ml-7">
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
          <div className="flex flex-row items-center ml-2 lg:mr-4 md:mr-4 mr-5">
            <Button className="bg-greenLight text-white sm:text-sm text-xs font-bold my-4 sm:py-2 py-1 px-4 mr-2 rounded">
              {campaignConfig.buttonText}
            </Button>
            <Button
              onClick={closeBanner}
              className="bg-blue-500 hover:bg-greyDark text-white text-sm font-bold my-4 px-4 sm:py-2 py-1 rounded"
            >
              X
            </Button>
          </div>
        </header>
      </div>
    )
  } else {
    return <></>
  }
}

export default CampaignBanner
