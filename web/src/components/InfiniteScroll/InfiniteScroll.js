import If from 'react-infinite-scroll-component'

const InfiniteScroll = ({ children, onChangePage, count, page, perPage }) => {
  const hasMore = perPage * page < count

  return (
    <If
      children={children}
      dataLength={count}
      next={() => onChangePage(page + 1)}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You've reached the end</b>
        </p>
      }
    />
  )
}

export default InfiniteScroll
