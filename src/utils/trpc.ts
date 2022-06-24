import { createReactQueryHooks } from '@trpc/react'
import type { AppRouter } from '../server/routers/index'

export const trpc = createReactQueryHooks<AppRouter>()
// => { useQuery: ..., useMutation: ...}
