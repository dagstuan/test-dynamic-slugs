import {sanityFetch} from '@/sanity/lib/live'
import {slugsByTypeQuery} from '@/sanity/lib/queries'
import {PageContent} from './pageContent'
import {PageContent2} from './pageContent2'

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
    return <PageContent2 params={props.params} searchParams={props.searchParams} />
  }

  return <PageContent params={props.params} />
}
