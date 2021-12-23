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
    const cells = row
      .filter((item) => typeof item === 'string' && row.indexOf(item) % 2 === 0)
      .map((item, i) => (
        <Cell style={{ marginRight: '-2rem' }} key={i}>
          {item}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{row[1]}
        </Cell>
      ))

    const buttons = row
      .filter((item) => typeof item === 'object')
      .map((item) => (
        <Link className="row-button" onClick={() => alert(item.url)} key={i}>
          {item.text}
        </Link>
      ))

    return (
      <div
        className="table-row"
        style={{ maxWidth: rowWidth, maxHeight: rowHeight }}
        key={i}
      >
        {cells}
        {buttons}
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
  maxHeight: 600,
  showId: false,
  onRowClick: () => {},
}

export default Table
