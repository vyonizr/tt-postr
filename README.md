# Postr

## Tech Stack & Libraries
- [React JS](https://react.dev/) for handling UI
- [Typescript](https://www.typescriptlang.org/) for type safety
- [Vite](https://vitejs.dev/) as build tool
- [Vite PWA](https://vite-pwa-org.netlify.app/) for offline capabilities
- [@vite-pwa/assets-generator](https://vite-pwa-org.netlify.app/assets-generator/) to generate PWA assets
- [Dexie.js](https://dexie.org/) as IndexedDB wrapper for storing data locally
- [date-fns](https://date-fns.org/) to parse and format dates
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [recoil](https://recoiljs.org/) for state management
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction/) for toast notifications
- [react-i18next](https://react.i18next.com/) for internationalization
- [@faker-js/faker](https://fakerjs.dev/) for generating dummy data
- [@uidotdev/usehooks](https://usehooks.com/) for custom hooks to handle network state (useNetworkState) and geolocation (useGeolocation)
- [react-router-dom](https://reactrouter.com/) for handling client-side routing

## Assumptions
- Incoming posts not posted by the user are not real-time. The user has to refresh the page to see new posts
- Single Page Application (SPA)
- Every auto-generated dummy post has a character length greater than 0, but none of them have exactly 100 characters
- The timestamp of a post by current user is generated client-side
- The user can reply to their own post
- All posts initially have no replies
- Replies are not nested
- Timestamps are integer in epoch format
- The data structure is based on this schema:
```dbml
Table posts {
  id string [pk]
  username string
  body string
  location_lat float
  location_lng float
  created_at integer
}

Table replies {
  id string [pk]
  username string
  body string
  location_lat float
  location_lng float
  post_id string [ref: > posts.id]
  created_at integer
}
```

## Scopes
- The URL [https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1) is used to simulate an API call, but the data is generated locally
- A unique and random handler is generated using Faker, utilizing the method `faker.internet.userName()`. While it is highly unlikely, there is a small possibility that a duplicate username **might** appear, which is beyond the scope of my implementation.
- The post does not support new lines. The user can only type a single line of text.
- Data stored in IndexedDB is not automatically deleted, so it will be increasing in size as the user uses the app. This is beyond the scope of my implementation.
- Deutsch translations are straight from Google Translate, so they might not be accurate. This is beyond the scope of my implementation.