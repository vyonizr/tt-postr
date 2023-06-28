import { useState, useEffect, useRef, useCallback } from 'react'
// import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { formatDistanceToNow } from 'date-fns'
import {
  useTranslation,
//  Trans
  } from 'react-i18next'

// import { db } from '../db'
import { DUMMY_URL, LANGUAGES } from '../constants'
import { PostFeed } from '../types'
import { generateRandomPosts, handleDateFnLocale } from '../utils'

import { feedState, oldestTimestampInFeed,onlineAtomState } from '../recoil/atoms/feedAtom'
import { sortedFeedState } from '../recoil/selectors/feedSelector'

import useIntersectionObserver from '../hooks/useIntersectionObserver'

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { t, i18n } = useTranslation()
  // async function getPosts() {
  //   const posts: PostFeed[] = await db.posts.toArray()

  //   await Promise.all(
  //     posts.map(async (post) => {
  //       post.replies = await db.replies
  //         .where('post_id')
  //         .equals(post.id)
  //         .toArray()
  //     })
  //   )

  //   return posts
  // }

  // const postsz = useLiveQuery(() => getPosts())

  const feed = useRecoilValue(sortedFeedState)
  const online = useRecoilValue(onlineAtomState)
  const setFeed = useSetRecoilState(feedState)
  const [oldestPostTime, setOldestPostTime] = useRecoilState(
    oldestTimestampInFeed
  )

  // const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      // setIsLoading(true)
      if (online.online) {
        await fetch(DUMMY_URL)
        const posts: PostFeed[] = generateRandomPosts(oldestPostTime)
        setOldestPostTime(posts[posts.length - 1].created_at)
        setFeed((prev) => [...prev, ...posts])
      }
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      // setIsLoading(false)
    }
  }, [setFeed, oldestPostTime, setOldestPostTime, online.online])

  useEffect(() => {
    async function addNewPosts() {
      // const posts = generateRandomPosts(new Date().getTime())
      // await db.posts.bulkAdd(posts)
    }

    addNewPosts()
  })

  const { isIntersecting } = useIntersectionObserver(targetRef, {
    threshold: 1,
  })

  useEffect(() => {
    if (isIntersecting) {
      fetchData()
    }
  }, [targetRef, fetchData, isIntersecting])

  // useEffect(() => {
  //   if (online.online && online.previous === false) {
  //     toast.success(t('backOnline'))
  //   } else if (!online.online && online.previous) {
  //     toast.error(t('offline'), {
  //     ...TOAST_OPTIONS,
  //     autoClose: false,
  //     })
  //   }
  // }, [t, online.online, online.previous])

  return (
    <>
      <h1 className='text-3xl font-bold'>Postr</h1>
      <h2>{t('subheading')}</h2>
      <div className='w-[300px]'>
        <div className='grid grid-cols-3 rounded overflow-hidden mt-6'>
          {Object.keys(LANGUAGES).map((lng) => (
            <button
              key={lng}
              type='submit'
              onClick={() => i18n.changeLanguage(lng)}
              className={`p-2 ${
                i18n.resolvedLanguage === lng
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-slate-100'
              }`}
            >
              {LANGUAGES[lng].nativeName}
            </button>
          ))}
        </div>
        {isError ? (
          <p>An error occured</p>
        ) : (
          <ul>
            {feed.map((post: PostFeed) => (
              <li
                key={post.id}
                className='py-2 border-t-2 border-slate-300 hover:bg-slate-100 hover:cursor-pointer'
              >
                <Link to={post.id} className='no-underline'>
                  <small className='text-sm opacity-75'>@{post.username}</small>
                  <p className='break-all'>{post.body}</p>
                  <div className='flex justify-between mt-2'>
                    <small>
                      🕒
                      {formatDistanceToNow(post.created_at, {
                        locale: handleDateFnLocale(i18n.resolvedLanguage),
                        addSuffix: true,
                      })}
                    </small>
                    <small>💬{post.replies?.length}</small>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={targetRef}></div>
      <Link to='new'>
        <button className='bg-blue-500 text-white h-12 w-12 fixed bottom-8 right-8 rounded-full text-2xl'>
          ＋
        </button>
      </Link>
    </>
  )
}
