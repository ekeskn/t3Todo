import type { inferRouterOutputs } from '@trpc/server'
import {z} from 'zod'
import type { AppRouter } from './server/api/root'

type RouterOutpus = inferRouterOutputs<AppRouter>
type allTodosOutput = RouterOutpus["todo"]["all"]

export type Todo = allTodosOutput[number]

export const todoInput = z.string({required_error:'Describe your todo',}).min(1).max(50)