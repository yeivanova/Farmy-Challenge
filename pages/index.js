import React, { useState, useEffect } from "react";
import { Layout, IngredientsSection, SaladMaker } from "@/components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fillBusinessLogic, fillIngredients } from "../slices/initialDataSlice";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        Promise.all([
            axios.get("api/businessLogic"),
            axios.get("api/ingredients"),
        ])
            .then((response) => {
                dispatch(fillBusinessLogic(response[0].data));
                dispatch(fillIngredients(response[1].data));
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dispatch]);

    return (
        <Layout>
            <h1>Salad composer</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <DndProvider backend={HTML5Backend}>
                    <div className="wrapper">
                        <IngredientsSection />
                        <SaladMaker />
                    </div>
                </DndProvider>
            )}
        </Layout>
    );
};

export default Home;
