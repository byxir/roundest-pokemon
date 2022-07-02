import { withTRPC } from '@trpc/next'
import { AppType } from 'next/dist/shared/lib/utils'
import type { AppRouter } from '../server/routers/index'
import 'tailwindcss/tailwind.css'
import '../../styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

// const getBaseUrl = () => {
//   if (process.browser) return ''
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
//   return `http://localhost:${process.env.PORT ?? 3000}`
// }

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `/api/trpc`

    return {
      url,
    }
  },
  ssr: false,
})(MyApp)
