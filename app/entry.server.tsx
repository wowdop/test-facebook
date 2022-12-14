import type { EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'

import { ServerStyleSheet } from 'styled-components'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const zaSheet = new ServerStyleSheet()

  let markup = renderToString(
    zaSheet.collectStyles(
      <RemixServer context={remixContext} url={request.url} />
    )
  )

  const styleList = zaSheet.getStyleTags()
  zaSheet.seal()

  try {
    markup = markup.replace('__WOW_JOB_DEV_STYLE__', styleList)
  } catch (error: any) {
    console.error('message *****************')
    console.error('message *****************')
    console.error('message *****************')
    console.error('message *****************')
    console.error('message *****************')
    console.error('message *****************')
    console.error('entry server', error.message)
  }
  // console.log('styleList', styleList)

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(`<!DOCTYPE html>` + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
