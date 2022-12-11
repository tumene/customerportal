import React from 'react'
import PaymentMethod from '../../../components/modules/quote/PaymentMethod'
import PrivateLayout from '../../../components/ui/organisms/layout/PrivateLayout'

export default function index() {
  return (
    <PrivateLayout title="Payment methods" onBack={() => {}}><PaymentMethod/></PrivateLayout>
  )
}
