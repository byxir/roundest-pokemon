import * as trpc from '@trpc/server'
import { z } from 'zod'
import { PokemonClient } from 'pokenode-ts'
import { prisma } from '../utils/prisma'

export const appRouter = trpc
  .router()
  .query('get-pokemon-by-id', {
    input: z.object({ id: z.number() }),
    async resolve({ input }) {
      const pokemon = await prisma.pokemon.findFirst({
        where: {
          id: input.id,
        },
      })

      if (!pokemon) throw new Error('no pokemon, sad :(')
      return pokemon
    },
  })
  .mutation('cast-vote', {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      })

      return { success: true, vote: voteInDb }
    },
  })
  .query('get-all-formatted-pokemon', {
    async resolve() {
      const allPokemon = await prisma.pokemon.findMany({
        orderBy: {
          votesFor: { _count: 'desc' },
        },
        select: {
          id: true,
          name: true,
          spriteUrl: true,
          _count: {
            select: {
              votesFor: true,
              votesAgainst: true,
            },
          },
        },
      })
      console.log(allPokemon)

      return allPokemon
    },
  })

// export type definition of API
export type AppRouter = typeof appRouter
