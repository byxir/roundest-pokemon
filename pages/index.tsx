import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className='h-screen w-screen text-white grid justify-items-center items-center'>
      <div className='border-primary border-2 rounded-lg grid grid-cols-3 p-8'>
        <div className='bg-secondary w-16 h-16 rounded-md'></div>
        <h1 className='grid justify-items-center items-center'>VS</h1>
        <div className='bg-secondary w-16 h-16 rounded-md'></div>
      </div>
    </div>
  )
}

export default Home
