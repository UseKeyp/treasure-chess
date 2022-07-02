import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'

const HomepageLayout = ({ children }) => {
  return (
    <DefaultLayout background="homepage-background"> {children} </DefaultLayout>
  )
}

export default HomepageLayout
