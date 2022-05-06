import { useLocale } from 'src/providers/locale'

const FaqItem = ({ icon, question, answer, feature }) => {
  const { t } = useLocale()

  return (
    <div className="question-wrapper" has-piece={feature ? 'true' : 'false'}>
      <div className="piece" />
      <div className="mb-2">
        {icon ? <div className="text-lg">{icon}</div> : <></>}
        <div className="flex justify-between">
          <h3 className="text-base font-bold color-grey-light">
            {t(question)}
          </h3>
        </div>
      </div>
      <p className="answer-container text-sm font-normal color-grey-light tracking-tight">
        {answer}
      </p>
    </div>
  )
}

const FaqSection = ({ title, questionList, columns }) => {
  const { t } = useLocale()

  return (
    <div className="flex justify-center">
      <div>
        {title && (
          <h2 className="faq-header font-black text-4xl py-5">{t(title)}</h2>
        )}
        <div
          className="faq-container max-w-2xl"
          columns={columns ? 'true' : 'false'}
        >
          {questionList?.map((item, idx) => (
            <FaqItem
              key={idx}
              icon={t(item[2])}
              question={t(item[0])}
              answer={t(item[1])}
              feature={t(item[3])}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FaqSection
