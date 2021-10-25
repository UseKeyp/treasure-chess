import FaqSection from 'src/components/FaqSection/FaqSection'
import about from './aboutUs.json'
import faq from './faq.json'

const FaqPage = () => {
  return (
    <>
      <FaqSection title="About" questionList={about.ABOUT_US} />
      <FaqSection title="FAQ's" questionList={faq.FAQ_CONFIG} />
    </>
  )
}

export default FaqPage
