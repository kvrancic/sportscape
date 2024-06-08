import React from 'react'

const page = () => {
  return (
    <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
    </div>
  )
}

export default page