import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { I18nextProvider } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import i18n from './i18n'

import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import NewPost from './pages/NewPost'

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
  return (
    <RecoilRoot>
      <I18nextProvider i18n={i18n}>
        <main className='flex min-h-screen w-full flex-col items-center p-4'>
          <RouterProvider router={router} />
        </main>
        <ToastContainer />
      </I18nextProvider>
    </RecoilRoot>
  )
}

export default App
