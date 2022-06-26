import { withTRPC } from '@trpc/next'
import { AppType } from 'next/dist/shared/lib/utils'
import type { AppRouter } from '../server/routers/index'
import 'tailwindcss/tailwind.css'
import '../../styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `https://${process.env.VERCEL_URL}/api/trpc`

    return {
      url,
    }
  },
  ssr: false,
})(MyApp)
