import { useCallback } from 'react'
import { QueryKey, useQueryClient } from '@tanstack/react-query'

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient()

  return useCallback(
    (...queryKeys: QueryKey[]) => {
      return Promise.all(
        queryKeys.map((queryKey) => {
          console.log(`Invalidating a query: `, queryKey)
          return queryClient.invalidateQueries({ queryKey })
        }),
      )
    },
    [queryClient],
  )
}
