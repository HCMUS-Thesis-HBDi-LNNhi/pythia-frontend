import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      You are in {process.env.NEXT_PUBLIC_ENV}
    </div>
  )
}

export default Home
