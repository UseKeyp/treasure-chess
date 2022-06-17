import { useEffect, useState } from 'react'

import { routes, navigate } from '@redwoodjs/router'

import campaignConfig from 'src/bannerCampaign.config'
import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'

const CampaignBanner = () => {
  const [show, setShow] = useState(false)
  const { iconName, icon, id, buttonText, text, route, href } = campaignConfig
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('campaign-name')) == id) {
      setShow(false)
    } else {
      setShow(true)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [id])

  const closeBanner = () => {
    localStorage.setItem('campaign-name', JSON.stringify(id))
    setShow(false)
  }
  const onClick = () => {
    if (route) return navigate(routes[route]())
    window.open(href, '_blank')
    closeBanner()
  }
  if (show) {
    return (
      <div className="bg-chessBlack-200">
        <header className="flex justify-between items-center  mb-2 max-w-7xl mx-auto">
          <div className="flex ml-7 flex-row items-center space-x-2 sm:space-x-4">
            <div className="">
              {iconName ? (
                <Icon name={iconName} color="#ffffff" height="16px" />
              ) : (
                icon
              )}
            </div>
            <div className="font-bold text-left break-normal sm:text-sm text-xs">
              {text}
            </div>
          </div>
          <div className="flex flex-row items-center ml-2 lg:mr-4 md:mr-4 mr-5">
            <Button
              onClick={onClick}
              className="bg-greenLight text-white sm:text-sm text-xs font-bold my-4 sm:py-2 py-1 px-4 mr-2 rounded"
            >
              {buttonText}
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
