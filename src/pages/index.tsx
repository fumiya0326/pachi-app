import { Inter } from '@next/font/google'
import { HomeView } from '../components/home-view'
import { Provider } from 'react-redux'
import { store } from '../reducers/store'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Provider store={store}>
      <HomeView/>
      <Analytics/>
    </Provider>
  )
}
