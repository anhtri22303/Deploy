import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComponent } from '../../component/State/Components/Action';

const CreateIngredientsForm = () => {
    const dispath = useDispatch();
    const [formData, setFormData] = useState({
        "name" : "",
        "price" : "",
        "pricebuyback" : ""
    });
    const jwt= localStorage.getItem("jwt")

    const handleSubmit = (e) => {
        const data = {

            name: formData.name,
            price : formData.price,
            pricebuyback : formData.pricebuyback
        };

        dispath(createComponent({data,jwt}))
        console.log(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-black text-center text-xl pb-10' style={{ fontSize: '30px' }}>Create Ingredient</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.name}
                    />
                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.price}
                    />
                    <TextField
                        fullWidth
                        id="pricebuyback"
                        name="pricebuyback"
                        label="Price Buyback"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.pricebuyback}
                    />

                    

                    <Button variant="contained" type="submit">
                        Create Category
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateIngredientsForm;
