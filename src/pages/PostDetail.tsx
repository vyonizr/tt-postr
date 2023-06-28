import { useState, useMemo } from 'react'
import { faker } from '@faker-js/faker'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { formatDistanceToNow } from 'date-fns'

import { useParams, Link } from 'react-router-dom'
import { feedState } from '../recoil/atoms/feedAtom'
import { PostFeed } from '../types'
import { handleDateFnLocale } from '../utils'

import { MAX_CHARACTERS } from '../constants'
import TextArea from '../components/TextArea'

export default function PostDetail() {
  const { t, i18n } = useTranslation()

  const { postId } = useParams()
  const [feed, setFeed] = useRecoilState(feedState)
  const [body, setBody] = useState('')

  const randomUsername = useMemo(() => {
    return faker.internet.userName()
  }, [])

  const postDetail = useMemo(() => {
    if (!postId) return undefined

    return feed.find((post) => post.id === postId)
  }, [feed, postId])

  const handleSubmit = () => {
    if (postDetail) {
      const updatedFeed = feed.map((post: PostFeed) => {
        if (post.id === postId && post.replies !== undefined) {
          return {
            ...post,
            replies: [
              {
                id: faker.string.uuid(),
                body,
                created_at: new Date().getTime(),
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude(),
                post_id: post.id,
                username: randomUsername,
              },
              ...post.replies,
            ],
          }
        } else {
          return post
        }
      })

      setFeed(updatedFeed)
      setBody('')
    }
  }

  const isButtonDisabled = useMemo(() => {
    return body.length === 0 || body.length > MAX_CHARACTERS
  }, [body])

  return (
    <>
      <Link to='/'>← {t('backToHome')}</Link>

      {postDetail !== undefined ? (
        <div className='w-[300px] mt-4'>
          <small className='text-sm opacity-75'>@{postDetail.username}</small>
          <p className='break-all'>{postDetail.body}</p>
          <div className='flex justify-between mt-2'>
            <small className='opacity-75'>
              {formatDistanceToNow(postDetail.created_at, {
                locale: handleDateFnLocale(i18n.resolvedLanguage),
                addSuffix: true,
              })}
            </small>
          </div>
          <div className='mt-4'>
            <TextArea
              onChange={(e) => setBody(e.target.value.replace(/\n/g, ''))}
              value={body}
              placeholder={t('placeholder.writeReply')}
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
          <ul className='mt-4'>
            {postDetail?.replies?.map((reply) => (
              <li key={reply.id} className='mt-2'>
                <small className='text-sm opacity-75'>
                  @{reply.username} •{' '}
                  {formatDistanceToNow(reply.created_at, {
                    locale: handleDateFnLocale(i18n.resolvedLanguage),
                    addSuffix: true,
                  })}
                </small>
                <p>{reply.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Cannot get post</div>
      )}
    </>
  )
}
