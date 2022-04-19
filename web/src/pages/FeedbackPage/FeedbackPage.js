import { useEffect } from 'react'
import { MetaTags } from '@redwoodjs/web'

import { useTheme } from 'src/providers/theme'

const FeedbackPage = () => {
  const { toggleHomeTheme } = useTheme()

  useEffect(() => {
    toggleHomeTheme(true)
    return () => toggleHomeTheme(false)
  })

  return (
    <>
      <MetaTags title="Feedback" />
      <div className="flex flex-col mx-auto my-14 space-y-10 h-full w-full md:max-w-2xl">
        <h2 className="leading-[56px] font-black text-4xl">Feedback</h2>
        <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
        <iframe
          title="Treasure Chess feedback form"
          className="airtable-embed airtable-dynamic-height bg-greyLight border border-chessBlack-100 rounded"
          src="https://airtable.com/embed/shrWkB9MS13NXoM46?backgroundColor=pink"
          frameBorder="0"
          onmousewheel=""
          width="100%"
          height="1340"
        ></iframe>
      </div>
    </>
  )
}

export default FeedbackPage
