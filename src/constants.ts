import { ToastOptions } from 'react-toastify'

const DUMMY_URL = 'https://jsonplaceholder.typicode.com/posts/1'

const LANGUAGES: { [key: string]: { nativeName: string } } = {
  en: { nativeName: 'English' },
  id: { nativeName: 'Indonesia' },
  de: { nativeName: 'Deutsch' },
}

const MAX_CHARACTERS = 100

const TOAST_OPTIONS: ToastOptions = {
  position: 'bottom-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}

export { DUMMY_URL, LANGUAGES, MAX_CHARACTERS, TOAST_OPTIONS }
