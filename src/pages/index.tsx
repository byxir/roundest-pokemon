import { trpc } from '../utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getOptionsForVote } from '../utils/getRandomPokemon'

const Home: NextPage<{ first: number; second: number }> = ({
  first,
  second,
}) => {
  return (
    <div className='grid items-center w-screen h-screen text-white justify-items-center'>
      <div className='grid grid-cols-3 p-8 border-2 rounded-lg border-primary'>
        <div className='w-16 h-16 rounded-md bg-secondary'>{first}</div>
        <h1 className='grid items-center justify-items-center'>VS</h1>
        <div className='w-16 h-16 rounded-md bg-secondary'>{second}</div>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const [first, second] = getOptionsForVote()

  return { props: { first, second } }
}
