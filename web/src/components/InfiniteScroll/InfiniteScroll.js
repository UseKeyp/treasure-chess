import ReactInfiniteScrollComponent from 'react-infinite-scroll-component'

const InfiniteScroll = ({
  children,
  onChangePage,
  count,
  page,
  perPage,
  loader,
}) => {
  const hasMore = perPage * page < count

  return (
    <ReactInfiniteScrollComponent
      dataLength={count}
      next={() => onChangePage(page + 1)}
      hasMore={hasMore}
      loader={loader || <h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You&apos;ve reached the end</b>
        </p>
      }
    >
      {children}
    </ReactInfiniteScrollComponent>
  )
}

export default InfiniteScroll
