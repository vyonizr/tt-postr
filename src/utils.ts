import { faker } from '@faker-js/faker'
import { getUnixTime } from 'date-fns'
import { PostFeed } from './types'
import { enUS, id, de } from 'date-fns/locale'

export const generateRandomPostsIndexedDB = (refDate: number): PostFeed[] => {
  let currentRefDate = refDate
  const posts: PostFeed[] = []
  for (let i = 0; i < 20; i++) {
    posts.push(generateRandomPost(currentRefDate))
    currentRefDate -= 30000
  }
  return posts
}

export const generateRandomPosts = (refDate: number): PostFeed[] => {
  let currentRefDate = refDate
  const posts: PostFeed[] = []
  for (let i = 0; i < 20; i++) {
    const randomPost = generateRandomPost(currentRefDate)
    randomPost.replies = []
    posts.push(randomPost)
    currentRefDate -= 30000
  }
  return posts
}

export const generateRandomPost = (refDate: number): PostFeed => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    body: faker.lorem.sentence(getRandomInt(1, 4)),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    created_at: getUnixTime(refDate) * 1000,
  }
}

export const secondsToMilliseconds = (seconds: number): number => {
  return seconds * 1000
}

export const handleDateFnLocale = (locale = '') => {
  switch (locale) {
    case 'de':
      return de
    case 'id':
      return id
    case 'en':
    default:
      return enUS
  }
}

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
