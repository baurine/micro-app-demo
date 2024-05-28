import { createContext, useContext } from 'react'

interface ISlowQuery {
}

export type AppConfig = {
  title?: string
}

export type AppCtxValue = {
  // api
  api: {
    getSlowQueries(params: { term: string }): Promise<ISlowQuery[]>
    getSlowQuery(params: { id: string }): Promise<ISlowQuery>
  }

  // cfg
  cfg: AppConfig
}

export const AppContext = createContext<AppCtxValue | null>(
  null
)

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('SlowQuery AppContext must be used within a provider')
  }

  return context
}
