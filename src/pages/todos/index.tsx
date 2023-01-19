import { GetStaticProps } from "next"
import Link from "next/link";

import styles from './todos.module.css'

export interface Todo {
   userId: number;
   id: number;
   title: string;
   completed: boolean;
}

export const getStaticProps: GetStaticProps = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
   const todos: Array<Todo> = await res.json()

   return {
      props: {
         todos
      }
   }
}

export default function Todos({ todos }: { todos: Array<Todo> }) {
   return (
      <div className={styles.container}>
         <h1>TODOs</h1>
         <div>
            {todos && todos.length > 0 && todos.map(todo => (
               <Link href={`/todos/${todo.id}`} key={todo.id} className={styles.todo}>
                  {todo.title}
               </Link>
            ))}
         </div>
         <Link className={styles.goBack} href="/">Go back</Link>
      </div>
   )
}
