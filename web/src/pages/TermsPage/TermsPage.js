import { MetaTags } from '@redwoodjs/web'

const TermsPage = () => {
  return (
    <div className="">
      <MetaTags
        title="Terms of Service"
        description="Terms of service for Treasure Chess."
      />
      <h1>{'Terms of Service'}</h1>
      <div className="flex justify-center w-full mt-4">
        <iframe
          title="Treasure Chess Terms of Service"
          className="w-full sm:w-[70%] h-screen mt-4 "
          src="https://docs.google.com/document/d/e/2PACX-1vTaNocDgRIq7unWr3b6G6rmMs9vzt0_k1NG9n0AcJRYvNTlkXvwOPGwpwk31n-O4FuTsxiLIXDPbXSm/pub?embedded=true"
        ></iframe>
      </div>
    </div>
  )
}

export default TermsPage
