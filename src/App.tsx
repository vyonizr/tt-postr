import { useEffect, lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { ToastContainer } from 'react-toastify'
import { useGeolocation, useNetworkState } from 'react-use'
import { useTranslation } from 'react-i18next'
import 'react-toastify/dist/ReactToastify.css'

import { userLocationState, onlineAtomState } from './recoil/atoms/feedAtom'

const Home = lazy(() => import('./pages/Home'))
const PostDetail = lazy(() => import('./pages/PostDetail'))
const NewPost = lazy(() => import('./pages/NewPost'))

// Configure i18n Provider: https://stackoverflow.com/a/68509726
// i18next automatically set localeStorage

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/new',
    element: <NewPost />,
  },
  {
    path: '/:postId',
    element: <PostDetail />,
  },
])

function App() {
  const { t } = useTranslation()
  const location = useGeolocation()
  const onlineState = useNetworkState()
  const [online, setOnline] = useRecoilState(onlineAtomState)
  const setLocation = useSetRecoilState(userLocationState)

  useEffect(() => {
    if (
      location.error !== null &&
      location.latitude !== null &&
      location.longitude !== null
    ) {
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      })
    }
  }, [location, setLocation])

  useEffect(() => {
    setOnline({
      online: onlineState?.online || false,
      previous:
        onlineState?.previous !== undefined ? onlineState?.previous : undefined,
    })
  }, [onlineState, setOnline])

  return (
    <Suspense fallback={<div />}>
      <main className='flex min-h-screen w-full flex-col items-center p-4'>
        <RouterProvider router={router} />
      </main>
      <div
        className={`bg-red-500 transition-opacity text-white text-center fixed bottom-0 left-0 w-full h-12 flex items-center justify-center ${
          online.online ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p>{t('offline')}</p>
      </div>
      <ToastContainer />
    </Suspense>
  )
}

export default App
