import type { EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'

import { ServerStyleSheet } from 'styled-components'
import { createContext } from 'react'
import { CTX } from './context'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const zaSheet = new ServerStyleSheet()

  let markup = renderToString(
    zaSheet.collectStyles(
      <CTX.Provider value={null}>
        <RemixServer context={remixContext} url={request.url} />
      </CTX.Provider>
    )
  )

  const styleList = zaSheet.getStyleTags()
  zaSheet.seal()

  try {
    // markup = markup.replace('__WOW_JOB_DEV_STYLE__', styleList)
    markup = renderToString(
      <CTX.Provider value={styleList}>
        <RemixServer context={remixContext} url={request.url} />
      </CTX.Provider>
    )
  } catch (error: any) {
    console.error('entry server', error.message)
  }
  // console.log('styleList', styleList)

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(`<!DOCTYPE html>` + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
