import styles from './LandingPageBoxes.module.css'
import {ReactComponent as Play} from 'src/assets/images/play.svg'
import { ReactComponent as Create } from 'src/assets/images/create.svg'
import { ReactComponent as Collect }  from 'src/assets/images/collect.svg'

const LandingPageBoxes = () => {
  return (
    <div className={styles.page_boxes_container}>
      <div className={styles.page_box}>
        <Play className={styles.page_box_img} />
        <h3>play</h3>
        <p>
          Have fun playing games with your friends on Chess.com, or watching
          your favorite Chess.com streamers.
        </p>
      </div>
      <div className={styles.page_box}>
        <Create className={styles.page_box_img} />
        <h3>create</h3>
        <p>Turn your own games into a one-of-a-kind collectible Treasure.</p>
      </div>
      <div className={styles.page_box}>
        <Collect className={styles.page_box_img} />
        <h3>collect</h3>
        <p>Find interesting and unique Treasures to collect and share.</p>
      </div>
    </div>
  )
}

export default LandingPageBoxes
