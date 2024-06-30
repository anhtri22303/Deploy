import React from "react";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { store } from "../State/store";
const JewelryCard = ({item}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)

  const handleNavigateToArea=()=>{
      navigate(`/area/${item.name}/${item.id}`)
    
  }


  return (
    <Card className="m-5 w-[18rem]">
      <div className={`${true ? "cursor-pointer" : "cursor-not-allowed"}
       relative`}>
        <img
          className="w-full h-[10rem] rounded-t-md object-cover "
          src=  {item.images[0]}
          alt=""
        />
        <Chip
         size="small"
         className="absolute top-2 left-2"
         color={item.open?"success":"error"}
         label={item.open?"open":"closed"}
         />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
            <p onClick={handleNavigateToArea}className="font-semibold text-lg
            cursor-pointer">{item.name}</p>
            <p className="text-gray-500 text-sm">{item.desciption}</p>
        </div>
        <div>
            <IconButton>{false?<FavoriteIcon/>:<FavoriteBorderIcon/>}</IconButton>
        </div>
      </div>
    </Card>
  );
};

export default JewelryCard;
