'use client'

import Link from 'next/link';
import HeroSection from '../components/HeroSection';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-xl font-bold">Welcome to My Tailwind CSS Project</p>
      <Link href="/test-tailwind" className="mt-50 text-red-500">Test Tailwind CSS</Link>
      {/* <HeroSection /> */}
    </div>
  );
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