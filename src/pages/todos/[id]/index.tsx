import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { Todo as TodoType } from ".."

import styles from './todo.module.css'

/*
   If you are creating a dynamic page eg: product/[slug].tsx then even if you
   don't want to create any page on build time you need to create a getStaticPaths
   method to set the fallback property and let NextJS know what to do when the
   page you are trying to get doesn't exist.

   getStaticPaths does mainly two things:

   1) Indicates which paths should be created on build time (returning a paths array)

   2) Indicate what to do when a certain page eg: "product/myProduct123" doesn't exist
   in the NextJS Cache (returning a fallback type)
*/

export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking'
   }
}

export const getStaticProps: GetStaticProps = async (context) => {
   const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${context.params?.id}`)
   const todo: TodoType = await res.json()

   return {
      props: {
         todo
      }
   }
}

export default function Todo({ todo }: { todo: TodoType }) {
   return (
      <div className={styles.container}>
         {Object.keys(todo).length > 0 ? (
            <>
               <h1>todos/{todo.id}</h1>
               <ul>
                  <li>Title: {todo.title}</li>
                  <li>Is it completed?: {todo.completed ? 'Yes' : 'No'}</li>
               </ul>
            </>
         ) : (
            <h2>Not found</h2>
         )}
         <Link href="/todos">Go back</Link>
      </div>
   )
}
