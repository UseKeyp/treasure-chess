export const onRamps = [
  {
    // iconName: 'ramp_network',
    type: 'RAMP_NETWORK',
    iconName: 'ramp_network',
    name: 'Ramp Network',
    description: (
      <p className="mt-4">
        Regions: Most places (
        <a
          href="https://support.ramp.network/en/articles/433-supported-countries-and-territories"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          list
        </a>
        )
        <br />
        Limits: €100/day
        <br />
        Fees: 2.9% (
        <a
          href="https://support.ramp.network/en/articles/431-transaction-fees"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          details
        </a>
        )
      </p>
    ),
  },
  {
    type: 'WYRE',
    iconName: 'wyre',
    name: 'Wyre',
    helperText: (
      <p>
        Tip: Do not use auto-complete, a password manager, or copy/paste. Try
        using a different email if your first attempt fails.
      </p>
    ),
    description: (
      <p className="mt-4">
        Regions: Most places (
        <a
          href="https://docs.sendwyre.com/reference/hosted-checkout#supported-states-and-countries"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          list
        </a>
        )
        <br />
        Limits: $100/day
        <br />
        Fees: 2.9% + $0.30 (
        <a
          href="https://support.sendwyre.com/hc/en-us/articles/360059565013-Wyre-card-processing-fees"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          details
        </a>
        )
      </p>
    ),
  },
  {
    iconName: 'mt_pelerin',
    name: 'Mt Pelerin',
    type: 'MT_PELERIN',
    description: (
      <p className="mt-4">
        Regions: Most places excluding the US (
        <a
          href="https://developers.mtpelerin.com/service-information/supported-countries"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          list
        </a>
        )
        <br />
        Limits: CHF 200/purchase
        <br />
        Fees: 1.5% + CHF 1.2 (
        <a
          href="https://www.mtpelerin.com/pricing"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          details
        </a>
        )
      </p>
    ),
  },
  {
    iconName: 'metamask',
    name: 'Manual',
    type: 'WALLET_DEPOSIT',
    description: (
      <p className="mt-4">Send funds directly from another crypto wallet.</p>
    ),
  },
]

export const feedbackSuggestionCta = {
  name: 'Your favorite provider',
  disabled: true,
  highlight: false,
  hideButton: true,
  description: (
    <p className="mt-4">
      Have a suggestion?{' '}
      <a
        href="https://treasure.chess.com/feedback"
        target="_blank"
        className="underline"
        rel="noreferrer"
      >
        Let us know!
      </a>
    </p>
  ),
}
