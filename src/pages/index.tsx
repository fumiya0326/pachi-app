import { Inter } from '@next/font/google'
import { HomeView } from '../components/home-view'
import { Provider } from 'react-redux'
import { store } from '../reducers/store'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Provider store={store}>
      <meta name="description" content="ジャグラー設定判別　シュミレート　ジャグラー子役カウンター ジャグラー獲得枚数"></meta>
      <HomeView />
      <Analytics />
    </Provider>
  )
}
