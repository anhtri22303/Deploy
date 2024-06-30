import React, { useEffect } from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import JewelryCard from '../Jewelry/JewelryCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAreaAction } from "../State/Area/Action";

const Home = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { area } = useSelector(store => store);

    useEffect(() => {
        if (jwt) {
            dispatch(getAllAreaAction(jwt));
        }
    }, [dispatch, jwt]);

    return (
        <div className="pb-10">
            <section className="banner -z-50 relative flex flex-col justify-center items-center">
                <div className="w-[50vw] z-10 text-center">
                    <p className="text-7xl lg:text-9xl font-bold z-10 py-5 text-yellow-400">Jewelry</p>
                    <p className="z-10 text-white text-xl lg:text-4xl">
                        Giving Trust to Us, I Give You Prestige
                    </p>
                </div>
                <div className="cover absolute top-0 left-0 right-0"></div>
                <div className="fadout"></div>
            </section>
            <section className="top-product-section p-10 lg:py-10 lg:px-20">
                <p className="header-blue">Top Product</p>
                <MultiItemCarousel />
            </section>
            <div className="separator"></div> {/* Đường kẻ chia */}
            <section id="order-here" className="px-5 lg:px-20 pt-5">
               
                <p className="order-here-section">Order here</p> 
              
                <div className="flex flex-wrap items-center justify-around gap-5">
                    {area?.areas?.length > 0 ? area.areas.map((item, index) => (
                        <JewelryCard key={index} item={item} />
                    )) : (
                        <p>No products available</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
