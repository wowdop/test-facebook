import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import href from './test.css'

import styled from 'styled-components'
import { useContext } from 'react'
import { CTX } from './entry.server'
import { useGetContext } from './context'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href,
  },
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

const Layout = styled.div`
  border: 10px dashed rebeccapurple;
`

export default function App() {
  const styles = useGetContext()
  console.log('styles', styles)

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {/* {styles} */}
        {styles !== null && (
          <style
            dangerouslySetInnerHTML={{ __html: `</style>${styles}<style>` }}
          />
        )}
        {/* {typeof document === 'undefined' ? '__WOW_JOB_DEV_STYLE__' : ''} */}
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
