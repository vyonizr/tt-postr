import { atom } from 'recoil'
import { PostFeed } from '../../types'

export const feedState = atom({
  key: 'Posts',
  default: [] as PostFeed[],
})

// in seconds
export const oldestTimestampInFeed = atom({
  key: 'OldestTimestampInFeed',
  default: new Date().getTime(),
})
