import { Navbar } from '@/components/shared/navbar';
import React from 'react'

const PublicGroupLayout = async (
    {
        children,
    }: {
        children: React.ReactNode
    }
) => {
    // const user = await getMe();
  return (
      <div>
          <Navbar user={{ success: true, data: { profile: { name: "John Doe", email: "john@example.com", role: "CUSTOMER" } } }} />
          {children}
      </div>
  )
}

export default PublicGroupLayout