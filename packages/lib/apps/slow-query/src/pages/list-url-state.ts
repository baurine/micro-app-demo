import useUrlState from '@ahooksjs/use-url-state'
import { useCallback } from 'react'

type ListUrlState = Partial<
  Record<'term', string>
>

export function useListUrlState() {
  const [queryParams, setQueryParams] = useUrlState<ListUrlState>()

  // term
  const term = queryParams.term ?? ''
  const setTerm = useCallback(
    (v: string) => {
      setQueryParams({ term: v })
    },
    [setQueryParams]
  )

  return {
    term,
    setTerm,

    queryParams,
    setQueryParams
  }
}
