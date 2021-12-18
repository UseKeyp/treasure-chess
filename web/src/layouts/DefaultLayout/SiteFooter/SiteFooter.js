const SiteFooter = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className="footer-container">
      <div>
        <a href="/" className="footer-link">
          Terms of Service
        </a>
        <a href="/" className="footer-link">
          Privacy Policy
        </a>
        <a href="/" className="footer-link">
          Support
        </a>
      </div>
      <p className="text-base font-light">
        Copyright <span className="copyright-logo">©</span> {currentYear}{' '}
        Treasure Chess, All Rights Reserved.
      </p>
    </div>
  )
}

export default SiteFooter
