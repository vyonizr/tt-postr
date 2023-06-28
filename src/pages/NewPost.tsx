import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { DUMMY_URL, MAX_CHARACTERS, TOAST_OPTIONS } from '../constants'
import { feedState } from '../recoil/atoms/feedAtom'

import TextArea from '../components/TextArea'

export default function NewPost() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [feed, setFeed] = useRecoilState(feedState)

  const [body, setBody] = useState('')

  const randomUsername = useMemo(() => {
    return faker.internet.userName()
  }, [])

  const handleSubmit = async () => {
    try {
      if (!isButtonDisabled) {
        const updatedFeed = [
          ...feed,
          {
            id: faker.string.uuid(),
            body,
            created_at: new Date().getTime(),
            username: randomUsername,
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
            replies: [],
          },
        ]

        await fetch(DUMMY_URL)

        setFeed(updatedFeed)
        toast.success('Post created successfully!', TOAST_OPTIONS)
        setBody('')
        navigate('/')
      }
    } catch (error) {
      toast.error('Something went wrong!', TOAST_OPTIONS)
    }
  }

  const isButtonDisabled = useMemo(() => {
    return body.length === 0 || body.length > MAX_CHARACTERS
  }, [body])

  return (
    <>
      <Link to='/'>← {t('backToHome')}</Link>

      <h2 className='text-xl'>{t('createNewPost')}</h2>

      <div className='w-[300px] mt-4'>
        <TextArea
          onChange={(e) => setBody(e.target.value.replace(/\n/g, ''))}
          value={body}
          placeholder={t('placeholder.createNewPost')}
        />
        <p className='text-right opacity-75 text-sm'>
          {MAX_CHARACTERS - body.length}/{MAX_CHARACTERS}
        </p>
        <button
          onClick={handleSubmit}
          className='mt-2 w-full py-2 bg-blue-500 text-white rounded disabled:bg-slate-200 disabled:text-gray-400'
          disabled={isButtonDisabled}
        >
          {t('button.reply')}
        </button>
      </div>
    </>
  )
}
