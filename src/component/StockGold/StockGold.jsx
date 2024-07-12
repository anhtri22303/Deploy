import React, { useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../State/Gold Price/Action";

const StockGold = () => {
  const dispatch = useDispatch();
  const { components, loading, error } = useSelector((state) => state.gold_price);
  
  useEffect(() => {
    const componentIds = "1, 2"; // Replace with the list of component IDs you want to fetch
    dispatch(fetchComponents(componentIds));
  }, [dispatch]);

  // Get the current time in Vietnam (UTC+7)
  const vietnamTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });

  // Placeholder function to handle screen casting
  const handleCastToScreen = () => {
    // This is where you would implement the logic to cast the screen to a TV
    // For example, integrating with Google Cast API or another screen mirroring solution
    alert("Casting to TV is not implemented in this example.");
  };

  return (
    <Box
      className="p-5"
      sx={{
        maxWidth: 1200, // Increase the max width of the container
        margin: "0 auto",
        marginTop: "120px", // Khoảng cách với Navbar
        marginBottom: "180px" // Khoảng cách với Footer
      }}
    >
      <Typography
        variant="h4"
        className="text-blue-1000 py-5"
        sx={{ textAlign: "center", fontWeight: 'bold', fontSize: '3rem' }} // Increase font size
      >
        Stock Gold Prices
      </Typography>
      <Typography
        variant="subtitle1"
        className="py-3"
        sx={{ textAlign: "center", fontWeight: 'bold', fontSize: '2rem' }} // Increase font size
      >
        Current Time in Vietnam: {vietnamTime}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: '#f0f0f0',
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                  fontWeight: 'bold',
                  fontSize: '1.75rem' // Increase font size
                }}
              >
                Component Name
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: '#f0f0f0',
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                  fontWeight: 'bold',
                  fontSize: '1.75rem' // Increase font size
                }}
              >
                Current Price (USD)
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: '#f0f0f0',
                  fontWeight: 'bold',
                  fontSize: '1.75rem' // Increase font size
                }}
              >
                Purchase Price (USD)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography>Loading...</Typography>
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography>Error: {error}</Typography>
                </TableCell>
              </TableRow>
            )}
            {components.map((component) => (
              <TableRow key={component.id}>
                <TableCell
                  sx={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    fontSize: '1.75rem' // Increase font size
                  }}
                >
                  {component.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    fontSize: '1.75rem' // Increase font size
                  }}
                >
                  ${component.price.toFixed(2)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: '1.75rem' }} // Increase font size
                >
                  ${component.pricebuyback.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCastToScreen}
          sx={{
            mt: 2,
            bgcolor: 'orange',
            color: 'white',
            fontWeight: 'bold',
            height: '40px', // Adjust height as needed
            padding: '8px',
            '&:hover': {
              bgcolor: 'darkorange',
            },
            '&:focus': {
              bgcolor: 'black',
            },
          }}
        >
          Cast to TV
        </Button>
      </Box>
    </Box>
  );
};

export default StockGold;
