"use client";

import CardProduct from "@/app/components/CardProduct";
import '../../styles/productsPage.css';
import { useEffect, useState } from "react";
import { apiURL, getApiCall } from "@/app/service/api_calls";
import api_routes from "@/app/service/api_routes";
import "../../styles/card.css"
import { BiAddToQueue, BiCheckCircle } from "react-icons/bi";
import { useModal } from "@/app/hooks/useModal";
import Modal from "@/app/components/Modal";
import Card from "@/app/components/Card";
import { generateObjectConfigForInputs } from "@/app/lib/utils.clients";
import Input from "@/app/components/Input";
import { createProduct, deleteProduct, updateProduct } from "./productsActions";
import { propsInputTypes } from "@/app/props/propsInputTypes";
import { usePopUp } from "@/app/hooks/usePopUp";
import PopUp from "@/app/components/PopUp";
import { propsProduct } from "@/app/props/propsProduct";
import { propsFormState } from "@/app/props/forms/propsFormState";

const Products = () => {
    const [products, setProducts] = useState<propsProduct[]>([]);
    const { modal, openModal, closeModal } = useModal();
    const { popup, openPopUp } = usePopUp(2500);
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

    const handleOpenModal = (modalName:string ,e: React.MouseEvent) => {
        e.stopPropagation();
        openModal(modalName);
    };
    
    const handleCloseModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeModal();
    };

    const handleCreateProduct = async (prevState: propsFormState, formData: FormData) => {
        const result = await createProduct(prevState, formData);
        if (!result?.errors) {
            getProducts();
            closeModal();
            openPopUp({
                text: `Producto creado`,
                visible: true,
                backGround: '#19a051',
                textColor: '#fff',
                icon: <BiCheckCircle />,
                colorIcon: '#fff',
            });
        }
        return result;
    };

    const handleUpdate = async (prevState: propsFormState, formData: FormData) => {
        const id = formData.get("id");
        if (!id) return;
    
        const result = await updateProduct(prevState, formData);
        if (!result?.errors) {
            getProducts();
            closeModal();
            openPopUp({
                text: `Producto actualizado`,
                visible: true,
                backGround: '#19a051',
                textColor: '#fff',
                icon: <BiCheckCircle />,
                colorIcon: '#fff',
            });
        }
        return result;
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((product) => product.id !== id));
        openPopUp({
            text: `Producto eliminado`,
            visible: true,
            backGround: '#19a051',
            textColor: '#fff',
            icon: <BiCheckCircle />,
            colorIcon: '#fff',
        });
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
            <div className="card__container" onClick={(e) => handleOpenModal('modalCreateProduct', e)}>
                <div className="card__static">
                    <h2 className="products__page__card__title">Añade un producto</h2>
                    <BiAddToQueue className="products__page__card__icon" />
                </div>
                <Modal idModal={modal} name="modalCreateProduct">
                    <Card
                        title="Agregar producto"
                        close={handleCloseModal}
                        isActiveModal={modal === 'modalCreateProduct'}
                    >
                        <Input 
                            inputs={addProductInput} 
                            translated_inputs={translated_inputs}
                            defaultAction={handleCreateProduct}
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
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))
            }
            <PopUp
                text={popup?.text as string}
                visible={popup?.visible as boolean}
                backGround={popup?.backGround}
                textColor={popup?.textColor}
                icon={popup?.icon}
                colorIcon={popup?.colorIcon}
            />
        </div>
    );
};

export default Products;
