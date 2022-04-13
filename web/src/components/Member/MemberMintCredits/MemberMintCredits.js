import LoadingDots from 'src/components/LoadingDots'
import { useWallet } from 'src/providers/wallet'

const MemberMintCredits = () => {
  const { mintCreditBalance } = useWallet()

  return (
    <div className="memberMintCredits">
      <h4 className="memberMintCredits__title">Mint credits </h4>
      <h4 className="memberMintCredits__balance">
        {mintCreditBalance ? (
          `$${
            Number(mintCreditBalance) > 0
              ? Number(mintCreditBalance).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : 0
          }`
        ) : (
          <LoadingDots />
        )}
      </h4>
    </div>
  )
}

export default MemberMintCredits
