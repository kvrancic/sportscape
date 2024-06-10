import { Loader } from '@mantine/core';

export default function Loading() {

  return(
    <div className="flex items-center justify-center h-screen">
      <Loader color="orange" size="xl" type="bars" />
    </div>  

  )
    
  
}