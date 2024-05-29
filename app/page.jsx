import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/dashboard')
  }
  else{
    redirect('/welcome')
  }

  return <p>Hello {data.user.email}</p>
}


/* 'use client'

import { useState, useEffect } from 'react'
import supabase from '../utils/supabase'
import NewTodo from '../components/NewTodo'
import { useRouter } from 'next/navigation' 

export default function Home() {
  const router = useRouter()

  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const { data } = await supabase.from('todos').select('*');

    if (data) {
      setTodos(data);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  return (
    <div>
      <button className="border px-4 py-4" onClick={() => router.push("login")}>Login</button>
      <NewTodo reload={fetchTodos} />
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  )
} */