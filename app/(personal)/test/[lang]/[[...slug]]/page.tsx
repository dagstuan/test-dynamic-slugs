import {StaticPageContent} from './staticPageContent'
import {DynamicPageContent} from './dynamicPageContent'
import { Suspense } from 'react';

type Props = {
  params: Promise<{lang: string; slug: string[]}>
  searchParams: Promise<{[key: string]: string}>
}

export default async function Page(props: Props) {
  const params = await props.params

  if (params.slug[0] === 'dynamic') {
    return (
      <Suspense>
        <DynamicPageContent params={props.params} searchParams={props.searchParams} />
      </Suspense>
    )
  }

  return <StaticPageContent params={props.params} />
}
