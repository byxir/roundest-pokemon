import { trpc } from '../utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['hello', { text: 'igor' }])

  if (isLoading) {
    return <h1>LOADING</h1>
  }

  return (
    <div className='grid items-center w-screen h-screen text-white justify-items-center'>
      {/* <div className='grid grid-cols-3 p-8 border-2 rounded-lg border-primary'>
        <div className='w-16 h-16 rounded-md bg-secondary'></div>
        <h1 className='grid items-center justify-items-center'>VS</h1>
        <div className='w-16 h-16 rounded-md bg-secondary'></div>
      </div> */}
      {data?.greeting}
    </div>
  )
}

export default Home
