import FaqSection from 'src/components/FaqSection/FaqSection'
import about from './about'
import faq from './faq'

const FaqPage = () => {
  return (
    <>
      <FaqSection title="About" questionList={about} />
      <FaqSection title="FAQ's" questionList={faq} />
    </>
  )
}

export default FaqPage
