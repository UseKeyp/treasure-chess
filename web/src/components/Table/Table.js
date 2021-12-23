import { Link } from '@redwoodjs/router'
import { RowsSkeleton } from 'src/components/LoadingSkeleton/LoadingSkeleton'

const Cell = ({ children, style }) => {
  return (
    <div
      className="flex items-center justify-start p-2 m-2"
      style={style}
      role="cell"
    >
      {children}
    </div>
  )
}

const Table = ({ height, width, rowHeight, rowWidth, title, data }) => {
  const rows = data?.map((row, i) => {
    const cells = row.map((item) => {
      return typeof item === 'string' ? (
        <Cell style={{ marginRight: '-2rem' }}>{item}</Cell>
      ) : item.to ? (
        <Link className="row-button" to={item.to}>
          {item.text}
        </Link>
      ) : (
        <a href={item.href} className="row-button">
          {item.text}
        </a>
      )
    })

    return (
      <div
        className="table-row"
        style={{ maxWidth: rowWidth, maxHeight: rowHeight }}
        key={i}
      >
        {cells}
      </div>
    )
  })

  return (
    <div className="table-wrapper" style={{ height, width }}>
      <h1 className="table-header">{title}</h1>
      <div className="table-component flex-col">
        {rows ? (
          rows
        ) : (
          <RowsSkeleton
            rowCount={6}
            maxWidth={rowWidth}
            maxHeight={rowHeight}
          />
        )}
      </div>
    </div>
  )
}

Table.defaultProps = {
  rowHeight: 31,
  rowWidth: 484,
}

export default Table
