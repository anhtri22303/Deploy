import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from "@mui/material/colors";

export const PayMentSuccess = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate("/cart"); // Navigate to /cart when button is clicked
    };

    return (
        <div className="min-h-screen px-5">
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md">
                    <CheckCircleIcon sx={{ fontSize: "5rem", color: green[500] }} />
                    <h1 className="py-5 text-2xl font-semibold">SUCCESS</h1>
                    <p className="font-bold text-center">Thank You for choosing our JewelryStore!</p>
                    <Button
                        onClick={handleNavigateHome} // Navigate to /cart when button is clicked
                        variant="outlined"
                        fullWidth
                        type="submit"
                        sx={{
                            color: "green", // Text color
                            borderColor: "green", // Border color
                            fontWeight: "bold", // Bold text
                            height: "40px", // Button height
                            "&:hover": {
                                borderColor: "darkblue", // Darker border on hover
                                backgroundColor: "lightblue", // Light blue background on hover
                            },
                        }}
                    >
                        Go To Home
                    </Button>
                </div>
            </div>
        </div>
    );
};
