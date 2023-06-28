import Dexie, { Table } from 'dexie'
import { PostFeed, Reply } from './types'

export class MySubClassedDexie extends Dexie {
  posts!: Table<PostFeed>
  replies!: Table<Reply>
  postDrafts!: Table<PostFeed>
  replyDrafts!: Table<Reply>

  constructor() {
    super('postr')
    this.version(1).stores({
      posts: 'id, username, content, location_lat, location_lng, created_at',
      replies: 'id, username, content, post_id, created_at',
      postDrafts:
        'id, username, content, location_lat, location_lng, created_at',
      replyDrafts: 'id, username, content, post_id, created_at',
    })
  }
}

export const db = new MySubClassedDexie()
