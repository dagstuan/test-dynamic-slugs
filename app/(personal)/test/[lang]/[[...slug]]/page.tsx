import {sanityFetch} from '@/sanity/lib/live'
import {pagesBySlugQuery, slugsByTypeQuery} from '@/sanity/lib/queries'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'

const langs = ['en', 'no']

type Props = {
  params: Promise<{lang: string; slug: string[]}>
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
  const {params} = props
  const {lang, slug} = await params

  const {data} = await sanityFetch({query: pagesBySlugQuery, params: {slug: slug[0]}})

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a page on this slug, and live reload won't work on the 404 route
  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }

  const {title} = data ?? {}

  return (
    <>
      {title} {lang} {slug}
    </>
  )
}
