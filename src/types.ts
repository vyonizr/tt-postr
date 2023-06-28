export interface Post {
  id: string
  username: string
  body: string
  latitude: number
  longitude: number
  created_at: number
}

export interface PostFeed extends Post {
  replies?: Reply[]
}

export interface Reply extends Post {
  post_id: string
}
