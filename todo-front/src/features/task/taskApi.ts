import { apiSlice } from "../../app/apiSlice";

interface Task{
    id:number,
    title:string,
    completed:boolean
}


export const taskAPi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getTasks: builder.query<Task[],void>({
            query: ()=>({
                url:"/task/",
                methos:"GET"
            })
        }),
        addTask : builder.mutation<Task,{title:string}>({
            query: (body)=>({
                url:'/task/',
                method:'POST',
                body:body
            })
        }),
        deleteTask: builder.mutation<Task,{id:number}>({
            query:({id})=>({
                url:`/task/${id}`,
                method:'DELETE',
            })
        }),
        completeTask:builder.mutation<Task,{id:number}>({
            query:({id})=>({
                url:`/task/${id}`,
                method:'PUT',
                body:{completed:true}
            })
        })

       
    })
})

export const{
    useGetTasksQuery,
    useAddTaskMutation,
    useDeleteTaskMutation,
    useCompleteTaskMutation
}=taskAPi