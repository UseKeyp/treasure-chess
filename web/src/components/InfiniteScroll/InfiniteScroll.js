import ReactInfiniteScrollComponent from 'react-infinite-scroll-component'

const InfiniteScroll = ({
  children,
  onLoadMore,
  count,
  page,
  perPage,
  loader,
  dataLength,
}) => {
  console.log(perPage * (page + 1), count)
  const hasMore = perPage * (page + 1) < count
  return (
    <ReactInfiniteScrollComponent
      dataLength={dataLength}
      next={() => {
        console.log('load more dummy')
        onLoadMore()
      }}
      hasMore={hasMore}
      loader={loader || <h4>Loading...</h4>}
      endMessage={
        <div className="mt-8 rw-text-center">
          <h3>You&apos;ve reached the end</h3>
        </div>
      }
    >
      {children}
    </ReactInfiniteScrollComponent>
  )
}

export default InfiniteScroll
