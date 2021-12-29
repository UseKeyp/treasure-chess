import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#272522" highlightColor="#21201D">
      <Skeleton className="skeleton-card" count={1} />
    </SkeletonTheme>
  )
}

export const RowsSkeleton = ({ rowCount, maxHeight, maxWidth }) => {
  return (
    <SkeletonTheme baseColor="#312E2B" highlightColor="#272522">
      <Skeleton
        className="skeleton-rows"
        style={{ maxHeight, maxWidth }}
        count={rowCount}
      />
    </SkeletonTheme>
  )
}
