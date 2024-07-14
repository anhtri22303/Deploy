import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategoryAction } from "../../component/State/Categories/Action";
const CreateCategoryForm = () => {
  // const {jewelry}=useSelector(store=>store);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.categoryName = formData.categoryName ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        name: formData.categoryName,
      };
      dispatch(createCategoryAction({ reqData: data, jwt: localStorage.getItem("jwt") }));
      console.log(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="">
      <div className="p-5 ">
        <h1 className="text-black-400 text-center text-xl pb-10" style={{}}>
          Create Jewelry Category
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Jewelry Category"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
            error={!!errors.categoryName}
            helperText={errors.categoryName}
            InputProps={{ style: { width: "100%" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "gray",
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              mt: 2,
              bgcolor: "#0B4CBB",
              color: "white",
              fontWeight: "bold",
              height: "40px", // Adjust height as needed
              padding: "8px",
              "&:hover": {
                bgcolor: "darkorange",
              },
              "&:focus": {
                bgcolor: "black",
              },
            }}
          >
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
