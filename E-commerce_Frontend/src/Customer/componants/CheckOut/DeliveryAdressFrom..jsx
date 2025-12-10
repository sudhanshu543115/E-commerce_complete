import React from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import AddressCard from "../AdressCard/AddressCard";

const DeliveryAddressForm = ({ onAddressSubmit }) => {
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const address = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      street: formData.get("street"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
      state: formData.get("state"),
      phone: formData.get("phone"),
    };
    
    // Save address to localStorage for persistence
    localStorage.setItem('deliveryAddress', JSON.stringify(address));
    
    if (onAddressSubmit) {
      onAddressSubmit(address);
    }
  };
  
  const handleDeliverHere = () => {
    // Use existing address from AddressCard
    const existingAddress = {
      firstName: "John",
      lastName: "Doe",
      street: "123 Main Street",
      city: "New York",
      postalCode: "10001",
      state: "NY",
      phone: "+1 234-567-8900"
    };
    
    localStorage.setItem('deliveryAddress', JSON.stringify(existingAddress));
    
    if (onAddressSubmit) {
      onAddressSubmit(existingAddress);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        {/* Left Panel */}
        <div style={{
          flex: 1,
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
          height: '32rem',
          minHeight: '20rem',
          overflowY: 'auto',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <Typography variant="subtitle1" gutterBottom>
            AdresCard
          </Typography>
          <AddressCard />
          <Button
            onClick={handleDeliverHere}
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "purple",
              color: "white",
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              fontSize: "1rem",
              boxShadow: 1,
              '&:hover': {
                backgroundColor: "#6a1b9a",
              },
            }}
          >
            Deliver Here
          </Button>
        </div>
        {/* Right Panel FORM */}
        <div style={{
          flex: 1,
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Add New Address
            </Typography>
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '16px',
            }}>
              <TextField required fullWidth label="First Name" name="firstName" />
              <TextField required fullWidth label="Last Name" name="lastName" />
            </div>
            <TextField
              required
              fullWidth
              label="Address"
              name="street"
              multiline
              minRows={3}
              sx={{ marginBottom: '16px' }}
            />
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '16px',
            }}>
              <TextField required fullWidth label="City" name="city" />
              <TextField required fullWidth label="State/Province/Region" name="state" />
            </div>
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '16px',
            }}>
              <TextField required fullWidth label="Zip / Postal code" name="postalCode" />
              <TextField required fullWidth label="Phone Number" name="phone" />
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "purple",
                color: "white",
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                fontSize: "1rem",
                boxShadow: 1,
                '&:hover': {
                  backgroundColor: "#6a1b9a",
                },
                mt: 1,
              }}
            >
              Add & Deliver Here
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default DeliveryAddressForm;
