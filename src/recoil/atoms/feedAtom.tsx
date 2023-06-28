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

export const userLocationState = atom({
  key: 'UserLocation',
  default: {
    latitude: null as number | null,
    longitude: null as number | null,
  },
})

export const onlineAtomState = atom({
  key: 'Online',
  default: {
    online: navigator.onLine,
    previous: undefined as boolean | undefined,
  },
})
