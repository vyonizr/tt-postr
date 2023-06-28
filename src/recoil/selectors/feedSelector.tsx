import { selector } from 'recoil'
import { feedState } from '../atoms/feedAtom'

export const sortedFeedState = selector({
  key: 'SortedFeedState',
  get: ({ get }) => {
    const feed = get(feedState)

    const sortedFeedByNewest = [...feed].sort((a, b) => {
      return b.created_at - a.created_at
    })

    return sortedFeedByNewest
  },
})
