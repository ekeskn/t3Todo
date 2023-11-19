import type { Todo } from "~/types"

type TodoProps = {
    todo: Todo;
}

export default function Todo({todo}:TodoProps){
    const {id,text,done} = todo
    return(
        <>
        {text} 
        </>
    )
}