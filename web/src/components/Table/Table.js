import { Link } from '@redwoodjs/router'
import { RowsSkeleton } from 'src/components/LoadingSkeleton/LoadingSkeleton'

const Cell = ({ children }) => {
  return <div className="">{children}</div>
}

const Table = ({
  isLoading,
  error,
  height,
  width,
  rowHeight,
  rowWidth,
  title,
  data,
}) => {
  const rows = data?.map((row, i) => {
    if (React.isValidElement(row)) return row
    const cells = row.map((item, j) => {
      if (item?.to) {
        return (
          <Link className="row-button" to={item.to}>
            {item.text}
          </Link>
        )
      } else if (item?.href) {
        return (
          <a href={item.href} className="row-button">
            {item.text}
          </a>
        )
      }
      return <Cell key={j}>{item}</Cell>
    })
    return (
      <div className="flex table-row justify-between p-3" key={i}>
        {cells}
      </div>
    )
  })
  let contents
  if (error) contents = <p className="text-orange">{error}</p>
  else if (rows?.length === 0) contents = <p className="text-grey">Empty</p>
  else if (!isLoading) contents = rows
  else
    contents = (
      <RowsSkeleton rowCount={6} maxWidth={rowWidth} maxHeight={rowHeight} />
    )

  return (
    <div className="table-wrapper" style={{ height, width }}>
      <h1 className="table-header">{title}</h1>
      <div className="table-component flex-col ">{contents}</div>
    </div>
  )
}

Table.defaultProps = {
  rowHeight: 31,
  rowWidth: 484,
}

export default Table
