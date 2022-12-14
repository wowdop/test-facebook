import { createContext, useContext } from 'react'

export const CTX = createContext<null | string>(null)
export const useGetContext = () => useContext(CTX)
