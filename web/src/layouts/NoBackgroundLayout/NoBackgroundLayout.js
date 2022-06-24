import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'

const NoBackgroundLayout = ({ children }) => {
  return <DefaultLayout background="no-background"> {children} </DefaultLayout>
}

export default NoBackgroundLayout
