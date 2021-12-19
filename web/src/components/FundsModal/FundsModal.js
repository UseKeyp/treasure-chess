import styles from './FundsModal.module.scss'

const FundsModal = ({ children }) => {
  return (
    <div className={styles['modal-container']}>
      <div className="max-w-6xl w-full flex items-center justify-center h-full">
        <div className={styles['modal-content']}>{children}</div>
      </div>
    </div>
  )
}

export default FundsModal
