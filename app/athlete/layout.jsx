// import AthleteNavbar from '@/components/AthleteNavbar'
import Navbar from '@/components/AthleteNavbar'
import {Space} from '@mantine/core'

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      
    <section className='flex flex-col'>
      <Navbar/>



      {children}
    </section>
    </>
  )
}