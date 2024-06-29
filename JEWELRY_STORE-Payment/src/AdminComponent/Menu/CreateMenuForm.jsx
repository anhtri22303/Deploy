import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Chip, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../component/State/Categories/Action';
import { fetchComponents } from '../../component/State/Gold Price/Action';
import { createMenuItem } from '../../component/State/Menu/Action';

const initialValues = {
    name: "",
    description: "",
    code: "",
    category: "",
    selectedComponents: [], // Đổi tên thành selectedComponents
    selectedComponents2: [], // Thêm selectedComponents2
    goldWeight: "",
    diamondWeight: "",
    images: []
};

const CreateMenuForm = () => {
    const [uploadImage, setUploadImage] = useState(false);
    const { components, } = useSelector((state) => state.gold_price);
    const { category } = useSelector(store => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            const selectedCategory = category.categories.find(cat => cat.id === formik.values.category);
            const jewelryCategoryName = selectedCategory ? selectedCategory.name : '';
            const data = {
                name: values.name,
                description: values.description,
                code: values.code,
                jewelryCategory: jewelryCategoryName,
                components: [values.selectedComponents, values.selectedComponents2],
                goldWeight: values.goldWeight,
                diamondWeight: values.diamondWeight,
                images: values.images,
            };
            console.log("jwt", jwt);
            console.log("data ---", data);
        
            dispatch(createMenuItem({ data, jwt }));
        },
        
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setUploadImage(true);
        const image = await uploadImageToCloudinary(file);
        console.log("image ---", image);
        formik.setFieldValue("images", [...formik.values.images, image]);
        setUploadImage(false);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...formik.values.images];
        updatedImages.splice(index, 1);
        formik.setFieldValue("images", updatedImages);
    };

    useEffect(() => {
        dispatch(getAllCategory({ jwt }));
    }, []);

    useEffect(() => {
    const componentIds = "1, 4"; // Replace with the list of component IDs you want to fetch
    dispatch(fetchComponents(componentIds));
  }, [dispatch]);

    const handleChangeComponents = (event) => {
        const { value } = event.target;
        formik.setFieldValue("selectedComponents", value);
    };

    const handleChangeComponents2 = (event) => {
        const { value } = event.target;
        formik.setFieldValue("selectedComponents2", value);
    };

    return (
        <div className='py-10 lg:flex px-5 items-center justify-center min-h-screen'>
            <div className="lg:max-w-4xl">
                <h1 className='font-bold text-2xl text-center py-2'>
                    Add New Jewelry
                </h1>
                <form onSubmit={formik.handleSubmit} className='space-y-4'>
                    <Grid container spacing={2}>
                        <Grid className='flex flex-wrap gap-5' item xs={12}>
                            <input
                                accept='image/*'
                                id='fileInput'
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                type='file' />

                            <label className='relative' htmlFor='fileInput'>
                                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                                    <AddPhotoAlternateIcon className="text-white" />
                                </span>
                                {uploadImage && (
                                    <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                                        <CircularProgress />
                                    </div>
                                )}
                            </label>
                            <div className='flex flex-wrap gap-2'>
                                {formik.values.images.map((image, index) => (
                                    <div className="relative" key={index}>
                                        <img
                                            className='w-24 h-24 object-cover'
                                            src={image}
                                            alt="" />
                                        <IconButton
                                            size='small'
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                outline: "none"
                                            }}
                                            onClick={() => handleRemoveImage(index)}>
                                            <CloseIcon sx={{ fontSize: "1rem" }} />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.name}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="description"
                                name="description"
                                label="Description"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.description}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id="code"
                                name="code"
                                label="Jewelry Code"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.code}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="category"
                                value={formik.values.category} // Nên là id của category
                                onChange={formik.handleChange}
                                name="category"
                            >
                                {category.categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="components-label">Components 1</InputLabel>
                                <Select
                                labelId="components-label"
                                id="components"
                                name="selectedComponents"
                                value={formik.values.selectedComponents}
                                onChange={handleChangeComponents}
                                input={<OutlinedInput id="select-single-chip" label="Components 1" />}
                                label="Components 1"
                            >
                                {components.map((component) => (
                                    <MenuItem key={component.id} value={component.name}>
                                        {component.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="components-label-2">Components 2</InputLabel>
                            <Select
                            labelId="components-label-2"
                            id="components-2"
                            name="selectedComponents2"
                            value={formik.values.selectedComponents2}
                            onChange={handleChangeComponents2}
                            input={<OutlinedInput id="select-single-chip-2" label="Components 2" />}
                            label="Components 2"
                        >
                            {["Natural Diamond", "Artificial Diamond"].map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                        <TextField
                            fullWidth
                            id="goldWeight"
                            name="goldWeight"
                            label="Gold Weight"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.goldWeight}>
                        </TextField>
                    </Grid>                       
                         <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id="diamondWeight"
                                name="diamondWeight"
                                label="Diamond Weight"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.diamondWeight}>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit">
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateMenuForm;
