import {sanityFetch} from '@/sanity/lib/live'
import {pagesBySlugQuery} from '@/sanity/lib/queries'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'

type PageContentProps = {
  params: Promise<{slug: string[]; lang: string}>
}

export const PageContent = async (props: PageContentProps) => {
  const {params} = props
  const slug = (await params).slug[0]

  const {data} = await sanityFetch({query: pagesBySlugQuery, params: {slug}})

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a page on this slug, and live reload won't work on the 404 route
  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }

  const {title} = data ?? {}

  return <>{title}</>
}
