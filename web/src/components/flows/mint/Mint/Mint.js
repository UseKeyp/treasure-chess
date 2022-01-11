import { navigate, routes } from '@redwoodjs/router'

import ModalContainer from 'src/components/ModalContainer'

import MintSetTitle from '../MintSetTitle'
import MintPay from '../MintPay'
import MintProcessing from '../MintProcessing'
import MintComplete from '../MintComplete'

const Mint = ({ game, onClose }) => {
  const [step, setStep] = React.useState(1)
  const [error] = React.useState()
  const [_name, setName] = React.useState('')

  const onSubmit = (data) => {
    if (step === 1) setName(data.name)
    // Create transaction with game details and name

    // startMintFlow

    // TODO: handle success of stripe payments

    if (step === 4) return navigate(routes.treasure({ id: game.id }))

    return setStep(step + 1)
  }

  let stepContent = <></>

  // TODO: Add an error step with option to restart
  switch (step) {
    case 1:
      stepContent = <MintSetTitle onSubmit={onSubmit} error={error} />
      break
    case 2:
      stepContent = <MintPay onClick={onSubmit} cash={3} />
      break
    case 3:
      stepContent = <MintProcessing onClick={onSubmit} />
      break
    case 4:
      stepContent = <MintComplete onClick={onSubmit} />
      break
  }

  const setStatusText = React.useMemo(() => {
    let statusText = ''

    switch (step) {
      case 1:
        statusText = 'Step 1 of 2'
        break
      case 2:
        statusText = 'Step 2 of 2'
        break
      case 3:
        statusText = 'Processing'
        break
      case 4:
        statusText = 'Complete'
        break
    }

    return statusText
  }, [step])

  return (
    <div>
      <ModalContainer
        title="Mint Game"
        onClose={onClose}
        statusText={setStatusText}
        stepNum={step}
        totalNumSteps={4}
      >
        {stepContent}
      </ModalContainer>
    </div>
  )
}

export default Mint
