import styles from './MembersLayout.module.scss'

const MembersLayout = (props) => {
  return <main className={styles['members-layout']}>{props.children}</main>
}

export default MembersLayout
