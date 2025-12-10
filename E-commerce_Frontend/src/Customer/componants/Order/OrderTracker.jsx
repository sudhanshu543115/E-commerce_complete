import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Order Placed',
  'Order Confirmed',
  'Out for Delivery',
  'Delivered'
];

const OrderTracker = ({activeStep}) => {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{color:"#9155FD"}}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default OrderTracker
