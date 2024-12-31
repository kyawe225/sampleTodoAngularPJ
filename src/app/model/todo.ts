export interface Todo {
    id: number,
    task: string,
    description: string,
    created_at: Date,
    updated_at: Date
}


export interface TodoCreate{
    task: string,
    description: string
}