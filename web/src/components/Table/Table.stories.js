import Table from './Table'

const data = [
  [
    'April 20, 2020',
    'You’ve placed a bid of $7 on item 123456789',
    { text: 'View', href: 'https://github.com/' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $23 on item 987654321',
    { text: 'View', href: 'https://github.com/' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $32 on item 987654321',
    { text: 'View', href: 'https://github.com/' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $112 on item 987654321',
    { text: 'View', href: 'https://github.com/' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $876 on item 987654321',
    { text: 'View', href: 'https://github.com/' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $1353 on item 987654321',
    { text: 'View', href: 'https://github.com/' },
  ],
]

const saleData = [
  ['April 20, 2020', '$123', { text: '4wheeledbike', to: '/poop' }],
  ['April 21, 2020', '$321', { text: 'jschiarizzi', to: '/hello' }],
  ['April 21, 2020', '$1234', { text: 'asianjacksparrow', to: '/test' }],
  ['April 21, 2020', '$4321', { text: 'busybeebobby', to: '/hi' }],
  ['April 21, 2020', '$12345', { text: 'iScareChildren312#', to: '/123asd' }],
  ['April 21, 2020', '$54321', { text: 'bob', to: '/qwerty' }],
]

export const transactionHistory = () => {
  return (
    <div
      style={{
        position: 'relative',
        justifyContent: 'center',
        display: 'flex',
        top: '200px',
      }}
    >
      <Table
        title={t('Transaction History')}
        isLoading={true}
        height={193}
        width={532}
      />
      <p>.................</p>
      <Table
        title={t('Transaction History')}
        data={data}
        height={193}
        width={532}
      />
    </div>
  )
}

export const saleHistory = () => {
  return (
    <div
      style={{
        position: 'relative',
        justifyContent: 'center',
        display: 'flex',
        top: '200px',
      }}
    >
      <Table
        title={t('Sale History')}
        isLoading={true}
        height={156}
        width={396}
        rowWidth={346}
      />
      <p>.................</p>
      <Table
        title={t('Sale History')}
        data={saleData}
        height={156}
        width={396}
        rowWidth={346}
      />
    </div>
  )
}

export default { title: 'Components/Table' }
