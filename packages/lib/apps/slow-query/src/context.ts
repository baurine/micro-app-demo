import { createContext, useContext } from 'react'

interface ISlowQuery {
}

export type AppConfig = {
  title?: string
}

export type AppCtxValue = {
  // api
  api: {
    getDatabaseList(params: { start: number; end: number }): Promise<string[]>

    getSlowQueries(params: {
      start: number
      end: number
      order: string
      dbs: string[]
    }): Promise<ISlowQuery[]>
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
