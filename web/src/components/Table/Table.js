import clsx from 'clsx'
import { Link } from '@redwoodjs/router'
import { RowsSkeleton } from 'src/components/LoadingSkeleton/LoadingSkeleton'

const Table = ({
  isLoading,
  error,
  height,
  width,
  rowHeight,
  rowWidth,
  title,
  data,
  bgColor,
  fgColor,
}) => {
  const rows = data?.map((row, i) => {
    if (React.isValidElement(row)) return row
    const cells = row.map((item, j) => {
      const isLink = item?.href || item?.to
      const Component = !isLink ? 'div' : item?.to ? Link : 'a'

      return (
        <Component
          className={clsx(
            'table-cell',
            isLink && 'row-button',
            item?.className
          )}
          key={j}
          href={item?.href}
          to={item?.to}
          style={item?.style}
        >
          {item?.text ? item.text : item}
        </Component>
      )
    })
    return (
      <div
        className="table-row p-3 mr-2"
        style={{ backgroundColor: fgColor }}
        key={i}
      >
        {cells}
      </div>
    )
  })
  let contents
  if (error) contents = <p className="text-errorYellow font-bold">{error}</p>
  else if (rows?.length === 0) contents = <p className="text-grey">Empty</p>
  else if (!isLoading) contents = rows
  else
    contents = (
      <RowsSkeleton rowCount={6} maxWidth={rowWidth} maxHeight={rowHeight} />
    )

  return (
    <div
      className="table-wrapper"
      style={{
        height,
        width,
        backgroundColor: bgColor,
      }}
    >
      <h1 className="table-header">{title}</h1>
      <div className="table-component">{contents}</div>
    </div>
  )
}

Table.defaultProps = {
  rowHeight: 31,
  rowWidth: 484,
}

export default Table
