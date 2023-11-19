import { api } from "~/utils/api"
import Todo from "./Todo"
export default function Todos(){
    const {data:todos, isLoading, isError}=api.todo.all.useQuery()
    if (isLoading) return <div>Loading Todos ⌛</div>
    if (isError) return <div>Error ❌ </div>
    return(
        <>{ todos.length ? todos.map(todo=>{
            return <Todo key={todo.id} todo={todo} />
        }):"create first component"

        }
        <div>Todos component 👌</div>
        </>

    )
}

