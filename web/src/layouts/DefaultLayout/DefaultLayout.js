import MobileNav from 'src/components/MobileNav'

import { Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'

const DefaultLayout = ({ children }) => {
  const { logIn } = useAuth()

  const onClick = (e) => {
    if (e.target.id === 'login') logIn()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster
        position="bottom-right"
        toastOptions={{ success: { duration: 3000 } }}
      />
      <header className="relative mb-8">
        <MobileNav onClick={onClick} />
      </header>
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:max-w-screen">
          {children}
        </div>
      </div>
      <>{/*Footer*/}</>
    </div>
  )
}

export default DefaultLayout
