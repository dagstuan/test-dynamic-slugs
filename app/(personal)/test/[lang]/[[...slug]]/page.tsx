import {sanityFetch} from '@/sanity/lib/live'
import {slugsByTypeQuery} from '@/sanity/lib/queries'
import dynamic from 'next/dynamic'

const langs = ['en', 'no']

type Props = {
  params: Promise<{lang: string; slug: string[]}>
}

const PageContent = dynamic(() => import('./pageContent').then((mod) => mod.PageContent))

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
  const {params} = props
  return <PageContent params={params} />
}
