import Button from 'src/components/Button'
import LoadingDots from 'src/components/LoadingDots'

const Pagination = ({ page, count, perPage, onChangePage, isLoading }) => {
  const totalPages = Math.ceil(count / perPage)

  return (
    <div className="text-lg font-semibold flex align-center">
      <Button
        key={'<<' + 1}
        onClick={() => onChangePage(page - 5)}
        disabled={isLoading || page < 5}
      >
        {'<<'}
      </Button>
      <Button
        key={'<' + page - 1}
        onClick={() => onChangePage(page - 1)}
        disabled={isLoading || page < 2}
      >
        {'<'}
      </Button>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <h3 key={page} className="mx-2 x-3 self-center">
          {page} of {totalPages}
        </h3>
      )}
      <Button
        key={'>' + page + 1}
        onClick={() => onChangePage(page + 1)}
        disabled={isLoading || page >= totalPages}
      >
        {'>'}
      </Button>{' '}
      <Button
        key={'>>' + page + 5}
        onClick={() => onChangePage(page + 5)}
        disabled={isLoading || page >= totalPages - 5}
      >
        {'>>'}
      </Button>
    </div>
  )
}

export default Pagination
