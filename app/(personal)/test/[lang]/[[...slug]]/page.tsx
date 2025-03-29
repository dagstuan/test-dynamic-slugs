import {sanityFetch} from '@/sanity/lib/live'
import {slugsByTypeQuery} from '@/sanity/lib/queries'
import {Suspense} from 'react'
import {PageContent} from './pageContent'
import {PageContent2} from './pageContent2'

export const experimental_ppr = true

const langs = ['en', 'no']

type Props = {
  params: Promise<{lang: string; slug: string[]}>
  searchParams: Promise<{[key: string]: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: slugsByTypeQuery,
    params: {type: 'page'},
    stega: false,
    perspective: 'published',
  })

  return langs
    .map((lang) => {
      return data.map((slug) => ({
        lang,
        slug: [slug.slug],
      }))
    })
    .flat()
}

export default async function Page(props: Props) {
  const params = await props.params

  if (params.slug[0] === 'paige') {
    return (
      <Suspense>
        <PageContent2 params={props.params} searchParams={props.searchParams} />
      </Suspense>
    )
  }

  return <PageContent params={props.params} />
}
