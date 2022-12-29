import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { HomeView } from '../components/home-view'
import { Provider } from 'react-redux'
import { store } from '../reducers/store'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Provider store={store}>
      <HomeView/>
    </Provider>
  )
}
