import Table from './Table'

const data = [
  [
    'April 20, 2020',
    'You’ve placed a bid of $7 on item 123456789',
    { text: 'View', url: 'testUrl1' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $23 on item 987654321',
    { text: 'View', url: 'testUrl2' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $32 on item 987654321',
    { text: 'View', url: 'testUrl3' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $112 on item 987654321',
    { text: 'View', url: 'testUrl4' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $876 on item 987654321',
    { text: 'View', url: 'testUrl5' },
  ],
  [
    'April 21, 2020',
    'You’ve placed a bid of $1353 on item 987654321',
    { text: 'View', url: 'testUrl6' },
  ],
]

const saleData = [
  ['April 20, 2020', '$123', { text: '4wheeledbike', url: 'testUrl1' }],
  ['April 21, 2020', '$321', { text: 'jschiarizzi', url: 'testUrl2' }],
  ['April 21, 2020', '$1234', { text: 'asianjacksparrow', url: 'testUrl3' }],
  ['April 21, 2020', '$4321', { text: 'busybeebobby', url: 'testUrl4' }],
  ['April 21, 2020', '$12345', { text: 'iScareChildren312#', url: 'testUrl5' }],
  ['April 21, 2020', '$54321', { text: 'bob', url: 'testUrl6' }],
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
        title="Transaction History"
        rowWidth={484}
        rowHeight={31}
        height={193}
        width={532}
      />
      <p>.................</p>
      <Table
        title="Transaction History"
        data={data}
        height={193}
        width={532}
        rowWidth={484}
        rowHeight={31}
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
        title="Sale History"
        rowWidth={484}
        rowHeight={31}
        height={156}
        width={396}
      />
      <p>.................</p>
      <Table
        title="Sale History"
        data={saleData}
        height={156}
        width={396}
        rowWidth={484}
        rowHeight={31}
      />
    </div>
  )
}

export default { title: 'Components/Table' }
