import { Toaster, ToastBar, toast, useToasterStore } from '@redwoodjs/web/toast'

const ToastContext = React.createContext({
  mintStatus: null,
  mintError: null,
})

// https://react-hot-toast.com/docs/toaster

const ToastProvider = ({ children }) => {
  const { toasts } = useToasterStore()
  // const { toasts } = useToaster();
  // toast() - Text only, no icon shown
  // toast.success() - Checkmark icon with text
  // toast.error() - X icon with text
  // toast.loading() - Spinner icon, will show for 30 seconds by default, or until dismissed via toast.dismiss(toastId)
  // toast.promise() - Spinner icon, displays until the Promise resolves

  return (
    <ToastContext.Provider
      value={{
        toast,
        toasts,
      }}
    >
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            fontSize: '12px',
          },
          success: { duration: 3000 },
          loading: { duration: 3000 },
        }}
      />
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button onClick={() => toast.dismiss(t.id)}>X</button>
              )}
            </>
          )}
        </ToastBar>
      )}
      {children}
    </ToastContext.Provider>
  )
}

const useToast = () => React.useContext(ToastContext)

export { ToastProvider, useToast }
