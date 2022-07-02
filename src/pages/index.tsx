import { trpc } from '../utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import { getOptionsForVote } from '../utils/getRandomPokemon'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  const [ids, setIds] = useState(getOptionsForVote())
  const [first, second] = ids
  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }])
  const voteMutation = trpc.useMutation(['cast-vote'])

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

  const firstImageUrl =
    firstPokemon.data?.spriteUrl.slice(0, 7) +
    '/' +
    firstPokemon.data?.spriteUrl.slice(7)
  const secondImageUrl =
    secondPokemon.data?.spriteUrl.slice(0, 7) +
    '/' +
    secondPokemon.data?.spriteUrl.slice(7)

  return (
    <div className='grid items-center w-screen h-screen text-white justify-items-center'>
      <div className='grid grid-cols-3 p-2 border-2 rounded-lg sm:p-6 h-186 sm:h-auto border-primary md:w-836 md:h-420'>
        <>
          <div className='w-24 text-xl text-center rounded-md sm:w-48 md:w-64 grid grid-rows-[96px_20px_16px_36px] sm:grid-rows-[256px_36px_24px_36px]'>
            <div className='w-24 sm:w-48 md:w-64'>
              {firstPokemon.isSuccess && (
                <img className='w-24 sm:w-48 md:w-64' src={firstImageUrl} />
              )}
            </div>
            <div className='text-sm capitalize sm:text-xl'>
              {firstPokemon.isSuccess && firstPokemon.data.name}
            </div>
            <div className='p-2'></div>
            <button
              type='button'
              onClick={
                firstPokemon.data
                  ? () => voteForRoundest(firstPokemon.data.id)
                  : () => {}
              }
              className='inline-flex items-center px-2 py-1 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm sm:px-4 sm:py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-max h-9 justify-self-center'>
              Rounder
            </button>
          </div>
          <h1 className='grid items-center justify-items-center'>VS</h1>
          <div className='w-24 text-xl text-center rounded-md sm:w-48 md:w-64 grid grid-rows-[96px_20px_16px_36px] sm:grid-rows-[256px_36px_24px_36px]'>
            <div className='w-24 sm:w-48 md:w-64'>
              {secondPokemon.isSuccess && (
                <img className='w-24 sm:w-48 md:w-64' src={secondImageUrl} />
              )}
            </div>
            <div className='text-sm capitalize sm:text-xl'>
              {secondPokemon.isSuccess && secondPokemon.data.name}
            </div>
            <div className='p-2'></div>
            <button
              type='button'
              onClick={
                secondPokemon.data
                  ? () => voteForRoundest(secondPokemon.data.id)
                  : () => {}
              }
              className='inline-flex items-center px-2 py-1 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm sm:px-4 sm:py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-max justify-self-center h-9'>
              Rounder
            </button>
          </div>
        </>
      </div>
      <div className='absolute grid w-full bottom-8 justify-items-center'>
        <Link href='/results'>
          <button
            type='button'
            className='inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Results
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
