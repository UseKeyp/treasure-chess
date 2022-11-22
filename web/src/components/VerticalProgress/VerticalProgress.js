import { Spring } from 'react-spring'
import { useState, useEffect } from 'react'

const VerticalProgress = () => {
  const [interval, setInt] = useState(null)
  const [progress, setMintingProgress] = React.useState(0)

  useEffect(() => {
    setInt(
      setInterval(() => {
        setMintingProgress((progress) => progress + 0.6)
      }, 600)
    )

    return clearInterval(interval)
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  return (
    <Spring from={{ percent: 0 }} to={{ percent: Math.floor(progress) }}>
      {() => (
        <div className="progress vertical">
          <div
            style={{ height: `${Math.floor(progress)}%` }}
            className="progress-bar"
          >
            <span className="sr-only">{`${Math.floor(progress)}%`}</span>
          </div>
        </div>
      )}
    </Spring>
  )
}

export default VerticalProgress
