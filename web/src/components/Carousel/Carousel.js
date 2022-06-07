import { useEffect, useState } from 'react'
import { useSpringCarousel } from 'react-spring-carousel'

// --

const ITEMS_PER_SLIDE = 4

const AUTO_SLIDE_TIMEOUT = 10000 // 10 seconds

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
    slideToNextItem,
    useListenToCustomEvent,
    getCurrentActiveItem,
  } = useSpringCarousel({
    gutter: 24,
    startEndGutter: 24,
    itemsPerSlide: !hasItems
      ? 1
      : items.length <= ITEMS_PER_SLIDE
      ? items.length
      : ITEMS_PER_SLIDE,
    items: !hasItems
      ? [{ id: '1', renderItem: null }]
      : items.map((renderItem, id) => ({ id, renderItem })),
  })

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

  return <div className="overflow-x-hidden">{carouselFragment}</div>
}

export default Carousel
