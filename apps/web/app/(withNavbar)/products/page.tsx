"use client";

import CardProduct from "@/app/components/CardProduct";
import '../../styles/productsPage.css';
import { useEffect, useState } from "react";
import { apiURL, getApiCall } from "@/app/service/api_calls";
import api_routes from "@/app/service/api_routes";
import "../../styles/card.css"
import { BiAddToQueue } from "react-icons/bi";
import { useModal } from "@/app/hooks/useModal";
import Modal from "@/app/components/Modal";
import Card from "@/app/components/Card";
import { generateObjectConfigForInputs } from "@/app/lib/utils.clients";
import Input from "@/app/components/Input";
import { createProduct } from "./productsActions";
import { propsInputTypes } from "@/app/props/propsInputTypes";

const Products = () => {
    const [products, setProducts] = useState([]);
    const { modal, openModal, closeModal } = useModal();
    const inputs = ["name","price","type","description", "url"];
    const inputs_type: (string | propsInputTypes)[] = [
        "text", 
        "number", 
        {type: "select", options: ["Comida", "Agua", "Entradas"]}, 
        "text", 
        "url"
    ];
    const translated_inputs = ["nombre", "precio", "tipo de producto", "descripcion", "Imagen"];
    const addProductInput = generateObjectConfigForInputs(inputs, translated_inputs, inputs_type);

    const handleCloseModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeModal();
    };

    const getProducts = async () => {
        const data = await getApiCall(apiURL + api_routes.products);
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className="products__page__container">
            <div className="card__container" onClick={openModal}>
                <div className="card__static">
                    <h2 className="products__page__card__title">Añade un producto</h2>
                    <BiAddToQueue className="products__page__card__icon" />
                </div>
                <Modal open={modal}>
                    <Card
                        close={handleCloseModal}
                        title="Agregar producto"
                        isActiveModal={modal}
                    >
                        <Input 
                            inputs={addProductInput} 
                            translated_inputs={translated_inputs}
                            defaultAction={createProduct}
                            submitButtonName="Crear producto"
                        />
                    </Card>
                </Modal>
            </div>
            {
                products.map(({id, name, price, description, type, url }) => (
                    <CardProduct 
                        key={id}
                        id={id}
                        name={name}
                        price={price}
                        description={description}
                        type={type}
                        url={url}
                    />
                ))
            }
        </div>
    );
};

export default Products;
