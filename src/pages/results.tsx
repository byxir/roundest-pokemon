import { appRouter } from '../server/routers'
import { trpc } from '../utils/trpc'
import { createSSGHelpers } from '@trpc/react/ssg'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'

export async function getStaticProps() {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: {},
  })

  await ssg.fetchQuery('get-all-formatted-pokemon')

  return { props: { trpcState: ssg.dehydrate() }, revalidate: 10 }
}

const Results = () => {
  const allPokemon = trpc.useQuery(['get-all-formatted-pokemon'])
  console.log(allPokemon)

  if (!allPokemon.isSuccess) return null

  return (
    <div className='grid w-screen h-full p-10 text-white justify-items-center'>
      <div className='max-w-6xl border'>
        {allPokemon.data.map((currentPokemon: any) => {
          const percentage =
            (currentPokemon._count.votesFor /
              (currentPokemon._count.votesFor +
                currentPokemon._count.votesAgainst)) *
            100
          return (
            <div
              key={currentPokemon.id}
              className='grid grid-cols-[max-content_1fr_1fr] p-4 border-b items-center gap-4'>
              <Image width={64} height={64} src={currentPokemon.spriteUrl} />
              <p>{currentPokemon.name}</p>
              <div className=''>
                votesFor: {(percentage ? percentage : 0).toFixed(2)} %
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Results
