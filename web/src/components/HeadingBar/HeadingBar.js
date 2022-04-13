import { useCallback } from 'react'

const HeadingBar = ({ children, justifyChildren = 'left', text, type }) => {
  const getJustifyClass = useCallback(() => {
    switch (justifyChildren) {
      case 'center':
        return 'justify-center'
      case 'right':
        return 'justify-end'
      default:
        return 'justify-start'
    }
  }, [justifyChildren])

  const getTextClasses = useCallback(() => {
    if (type === 'small') {
      return 'text-sm'
    }

    return 'text-2xl font-bold'
  }, [type])

  const wrapperClasses = `flex items-start md:items-center flex-col md:flex-row pt-4 pb-4 w-full`

  const textClasses = `${getTextClasses()} mr-4`

  const childClasses = `flex flex-1 items-center ${getJustifyClass()}`

  return (
    <div className={wrapperClasses}>
      <div className={textClasses}>{text}</div>
      {children ? <div className={childClasses}>{children}</div> : null}
    </div>
  )
}

export default HeadingBar
