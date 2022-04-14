import { MetaTags } from '@redwoodjs/web'

const FeedbackPage = () => {
  return (
    <>
      <MetaTags title="Feedback" description="Feedback page" />
      <div className="flex flex-col mx-auto h-full w-full md:max-w-[85%]">
        <h2 className="font-black text-4xl py-6">Feedback</h2>
        {/* Pending iframe supplied by Airtable */}
        <iframe
          title="Treasure Chess feedback form"
          className="my-4 h-[80vh]"
          src="https://airtable.com/shrWkB9MS13NXoM46"
        ></iframe>
      </div>
    </>
  )
}

export default FeedbackPage
