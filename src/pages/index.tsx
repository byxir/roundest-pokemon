import { trpc } from '../utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getOptionsForVote } from '../utils/getRandomPokemon'
import { useState } from 'react'

const Home: NextPage = () => {
  const [ids, setIds] = useState(getOptionsForVote())
  const [first, second] = ids
  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }])
  const voteMutation = trpc.useMutation(['cast-vote'])

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null

  const voteForRoundest = (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({
        votedFor: first,
        votedAgainst: second,
      })
    } else if (selected === second) {
      voteMutation.mutate({
        votedFor: second,
        votedAgainst: first,
      })
    }
    setIds(getOptionsForVote())
  }

  return (
    <div className='grid items-center w-screen h-screen text-white justify-items-center'>
      <div className='grid grid-cols-3 p-8 border-2 rounded-lg max-h-96 border-primary'>
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <div className='w-64 text-xl text-center rounded-md'>
                <Image
                  width={256}
                  height={256}
                  src={`${firstPokemon.data?.spriteUrl}`}
                />
                <div className='capitalize'>{firstPokemon.data?.name}</div>
                <div className='p-2'></div>
                <button
                  type='button'
                  onClick={() => voteForRoundest(firstPokemon.data.id)}
                  className='inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  Rounder
                </button>
              </div>
              <h1 className='grid items-center justify-items-center'>VS</h1>
              <div className='w-64 text-xl text-center rounded-md '>
                <Image
                  width={256}
                  height={256}
                  src={`${secondPokemon.data?.spriteUrl}`}
                />
                <div className='capitalize'>{secondPokemon.data?.name}</div>
                <div className='p-2'></div>
                <button
                  type='button'
                  onClick={() => voteForRoundest(secondPokemon.data.id)}
                  className='inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  Rounder
                </button>
              </div>
            </>
          )}
      </div>
    </div>
  )
}

export default Home

// export async function getServerSideProps() {
//   const [first, second] = getOptionsForVote()

//   return { props: { first, second } }
// }
