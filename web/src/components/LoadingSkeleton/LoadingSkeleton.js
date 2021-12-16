import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './__styles.scss'

export const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#272522" highlightColor="#21201D">
      <Skeleton className="skeleton-card" count={1} />
    </SkeletonTheme>
  )
}

export const RowsSkeleton = ({ rowCount }) => {
  return (
    <SkeletonTheme baseColor="#312E2B" highlightColor="#272522">
      <Skeleton className="skeleton-rows" count={rowCount} />
    </SkeletonTheme>
  )
}
