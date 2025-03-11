"use client"
import Image from "next/image"
import defaultImage from "../../public/default_product.png";
import '../styles/card.css'
import { propsProduct } from "../props/propsProduct";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import { propsInputTypes } from "../props/propsInputTypes";
import { generateObjectConfigForInputs } from "../lib/utils.clients";
import Input from "./Input";
import Card from "./Card";

function CardProduct({id, name, description, type, price, url}: propsProduct) {
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

  return (
    <main className="card__container card-custom">
        <Image className="card__image" alt='' src={url ? url : defaultImage} width={200} height={200} priority />
        <div className="card__body">
            <div className="card__body__type__price">
                <span className="card__product__type">
                    {type}
                </span>
                <span className="card__product__price">
                    ${price}
                </span>
            </div>
            <h3 className="card__title">
                {name}
            </h3>
            <p className="card__description">
                {description}
            </p>
        </div>
        <div className="card__edit">
            <div onClick={openModal}>
                <FaEdit className="card__edit__icon__edit"  />
                <Modal open={modal}>
                    <Card
                        close={handleCloseModal}
                        title="Actualizar producto"
                        isActiveModal={modal}
                    >
                        <Input 
                            inputs={addProductInput} 
                            translated_inputs={translated_inputs}
                            submitButtonName="Actualizar"
                        />
                    </Card>
                </Modal>
            </div>
            <div onClick={openModal}>
                <MdDelete className="card__edit__icon__delete"/>
                <Modal open={modal}>
                    <Card
                        close={handleCloseModal}
                        title="Agregar mesa"
                        isActiveModal={modal}
                    >
                        <h3>¿Desea eliminar el producto?</h3>
                    </Card>
                </Modal>
            </div>
        </div>
    </main>
  )
}

export default CardProduct