import React from 'react';
import { Button, Box } from '@mui/material';
import { useRouter } from 'next/router';

const CallToActionButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/search');
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          borderRadius: '8px', // Rounded corners
          padding: '10px 12px', // Adjust padding
          textTransform: 'none', // Prevents uppercase text
          fontWeight: 'bold', // Bold text
          fontSize: '18px', // Font size
          fontFamily: 'serif',
        }}
        onClick={handleClick}
      >
        Get Quote On Them
      </Button>
    </Box>
  );
};

export default CallToActionButton;
