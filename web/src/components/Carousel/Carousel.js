import { useEffect, useState } from 'react'
import { useSpringCarousel } from 'react-spring-carousel'

import Button from 'src/components/Button'

// --

const ITEMS_PER_SLIDE = 4

const AUTO_SLIDE_TIMEOUT = 5000 // 10 seconds

const AUTO_SLIDING_STATE = {
  INITIAL: 'initial',
  STOPPED: 'stopped',
}

// --

const Carousel = ({ enableAutoSlide, items }) => {
  //
  const [autoSliding, setAutoSliding] = useState(
    enableAutoSlide ? AUTO_SLIDING_STATE.INITIAL : AUTO_SLIDING_STATE.STOPPED
  )

  // --

  const hasItems = Array.isArray(items) && items.length > 0

  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    useListenToCustomEvent,
    getCurrentActiveItem,
  } = useSpringCarousel({
    itemsPerSlide: !hasItems
      ? 1
      : items.length <= ITEMS_PER_SLIDE
      ? items.length
      : ITEMS_PER_SLIDE,
    items: !hasItems
      ? [{ id: '1', renderItem: null }]
      : cleanItems(items).map((renderItem, id) => ({
          id,
          renderItem: <div className="min-w-[304px] mx-auto">{renderItem}</div>,
        })),
  })

  /**
   * Ensures that the carousel will not pass empty items into the div surrounding {renderItem}
   * @param itemsList - list of items to clean
   */
  function cleanItems(itemsList) {
    if (itemsList[0] !== false && itemsList?.length > 2) {
      return itemsList.filter((item) => item !== false)
    } else {
      return itemsList
    }
  }

  // --

  useListenToCustomEvent((event) => {
    //
    switch (event.eventName) {
      //
      case 'onDrag': {
        setAutoSliding(AUTO_SLIDING_STATE.STOPPED)
        break
      }

      // --

      default: {
        return
      }
    }
  })

  // --

  useEffect(() => {
    //
    let interval

    // --

    if (
      autoSliding === AUTO_SLIDING_STATE.INITIAL &&
      items.length > ITEMS_PER_SLIDE
    ) {
      //
      interval = setInterval(() => slideToNextItem(), AUTO_SLIDE_TIMEOUT, true)
    }

    // --

    if (autoSliding === AUTO_SLIDING_STATE.STOPPED && interval) {
      //
      clearInterval(interval)
    }

    // --

    return () => clearInterval(interval)
  }, [autoSliding, getCurrentActiveItem, items.length, slideToNextItem])

  // --

  return (
    <div className="relative">
      <div className="absolute hidden md:flex -top-12 right-0 flex-row space-x-4 text-sm">
        <Button
          disabled={!hasItems}
          variant="black"
          onClick={() => {
            setAutoSliding('false')
            slideToPrevItem()
          }}
        >
          Previous
        </Button>
        <Button
          disabled={!hasItems}
          variant="black"
          onClick={() => {
            setAutoSliding('false')
            slideToNextItem()
          }}
        >
          Next
        </Button>
      </div>
      {carouselFragment}
    </div>
  )
}

export default Carousel
