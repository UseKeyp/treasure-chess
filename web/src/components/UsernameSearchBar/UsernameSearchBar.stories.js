import useState from 'storybook-addon-state'

import UsernameSearchBar from './UsernameSearchBar'

export const Generated = () => {
  const [username] = useState('username', '')

  return (
    <UsernameSearchBar
      value={username}
      // eslint-disable-next-line no-console
      setValue={(value) => console.log(value)}
    />
  )
}

export default { title: 'Components/UsernameSearchBar' }
