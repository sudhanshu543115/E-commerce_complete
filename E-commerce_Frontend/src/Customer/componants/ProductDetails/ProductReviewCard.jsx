import React from 'react'
import {  Box ,Avatar, Grid  } from "@mui/material";
import Rating from '@mui/material/Rating';

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3} className="mt-5">
              <Grid item xs={1}>
                <Box>
                    <Avatar className="bg-blue-500 text-white" sx={{ width: 56, height: 56 }}>
                        R
                    </Avatar>
                </Box>
                 
              </Grid>
              <Grid item xs={11}>
                <Box>
                    <h2 className="font-semibold">Jay RAj </h2>
                    <p className="text-sm text-gray-600">15 April, 2025</p>
                    <p className="mt-2">Awesome Products ......</p>
                </Box>
                <Rating value={4} readOnly />
              </Grid>
               
      </Grid>
    </div>
  )
}

export default ProductReviewCard
