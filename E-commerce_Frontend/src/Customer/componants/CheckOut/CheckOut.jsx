import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import DeliveryAdressFrom from "./DeliveryAdressFrom.";
import OrderSummary from './OrderSummary';    

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = React.useState(null);

  const querySearch = new URLSearchParams(location.search);
  const stepFromQuery = parseInt(querySearch.get("step") || "1", 10) - 1;

  // Clamp value so invalid steps don't break UI
  const safeStep =
    stepFromQuery >= 0 && stepFromQuery < steps.length ? stepFromQuery : 0;

  const [activeStep, setActiveStep] = React.useState(safeStep);

  // keep state in sync with query
  React.useEffect(() => {
    setActiveStep(safeStep);
  }, [safeStep]);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    if (nextStep < steps.length) {
      setActiveStep(nextStep);
      navigate(`?step=${nextStep + 1}`);
    }
  };

  const handleAddressSubmit = (address) => {
    setDeliveryAddress(address);
    handleNext();
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    if (prevStep >= 0) {
      setActiveStep(prevStep);
      navigate(`?step=${prevStep + 1}`);
    }
  };

  return (
    <div className="px-10 mt-10 lg:px-20">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>


            
            
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>

            <div className="mt-10">
                {activeStep === 1 && <DeliveryAdressFrom onAddressSubmit={handleAddressSubmit} />}
                {activeStep === 2 && <OrderSummary deliveryAddress={deliveryAddress} />}
            </div>





          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
