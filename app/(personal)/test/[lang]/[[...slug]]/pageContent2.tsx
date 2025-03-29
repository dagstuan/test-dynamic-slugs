import {sanityFetch} from '@/sanity/lib/live'
import {pagesBySlugQuery} from '@/sanity/lib/queries'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'

type PageContent2Props = {
  params: Promise<{slug: string[]; lang: string}>
  searchParams: Promise<{[key: string]: string}>
}

export const PageContent2 = async (props: PageContent2Props) => {
  const {params} = props
  const slug = (await params).slug[0]
  const searchParams = (await props.searchParams) || {}

  const {data} = await sanityFetch({query: pagesBySlugQuery, params: {slug}})

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a page on this slug, and live reload won't work on the 404 route
  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }

  const {title} = data ?? {}

  return (
    <>
      {title} {JSON.stringify(searchParams)}
    </>
  )
}
