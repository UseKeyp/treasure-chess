import ReactInfiniteScrollComponent from 'react-infinite-scroll-component'
import ScrollToTop from 'react-scroll-to-top'
import Icon from 'src/components/Icon'

const InfiniteScroll = ({
  children,
  onLoadMore,
  count,
  page,
  perPage,
  loader,
  dataLength,
}) => {
  const hasMore = perPage * (page + 1) < count
  return (
    <>
      <ScrollToTop
        smooth
        top={60}
        component={<Icon name="chess_com" size="60" />}
      />
      <ReactInfiniteScrollComponent
        dataLength={dataLength}
        next={onLoadMore}
        hasMore={hasMore}
        scrollThreshold="1500px"
        loader={loader || <h4>Loading...</h4>}
        endMessage={
          <div className="mt-8 rw-text-center">
            <h3>That&apos;s everything</h3>
          </div>
        }
      >
        {children}
      </ReactInfiniteScrollComponent>
    </>
  )
}

export default InfiniteScroll
