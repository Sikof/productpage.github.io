"use client";
import "../app.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";

const AddProductPage = () => {
  const router = useRouter();
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [type, setType] = useState("");

  const [size, setSize] = useState("");

  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");

  const [weight, setWeight] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "sku":
        setSku(value);
        break;
      case "name":
        setName(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "size":
        setSize(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "length":
        setLength(value);
        break;
      case "width":
        setWidth(value);
        break;
      default:
        break;
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSaveProduct = async () => {
    router.push("/");
    const product = {
      sku,
      name,
      price,
      type,
      size,
      height,
      width,
      length,
      weight,
    };
    try {
      await fetch("https://your-php-server/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.error("An error occurred while deleting products:", error);
    }
  };

  // IF WE USE FORMIK ->>

  // const validationSchema = Yup.object().shape({
  //   sku: Yup.string().required("SKU is required."),
  //   name: Yup.string().required("Name is required."),
  //   price: Yup.number()
  //     .required("Price is required.")
  //     .typeError("Price must be a valid number."),
  //   type: Yup.string().required("Type is required."),
  //   size: Yup.string().when("type", {
  //     is: "DVD",
  //     then: Yup.string().required("Size is required."),
  //     otherwise: Yup.string(),
  //   }),
  //   height: Yup.string().when("type", {
  //     is: "Furniture",
  //     then: Yup.string().required("Height is required."),
  //     otherwise: Yup.string(),
  //   }),
  //   width: Yup.string().when("type", {
  //     is: "Furniture",
  //     then: Yup.string().required("Width is required."),
  //     otherwise: Yup.string(),
  //   }),
  //   length: Yup.string().when("type", {
  //     is: "Furniture",
  //     then: Yup.string().required("Length is required."),
  //     otherwise: Yup.string(),
  //   }),
  //   weight: Yup.string().when("type", {
  //     is: "Book",
  //     then: Yup.string().required("Weight is required."),
  //     otherwise: Yup.string(),
  //   }),
  // });

  return (
    <div>
      <div className="header">
        <div id="headerText">Product List</div>
        <div className="headerButtons">
          <div className="headerButton" onClick={() => handleSaveProduct()}>
            Save
          </div>
          <Link href="/">
            <div
              className="headerButton"
              // onClick={() => handleMassDelete()}
            >
              Cancel
            </div>
          </Link>
        </div>
      </div>

      <form onSubmit={() => console.log("submited")}>
        <div className="basicInput">
          <label htmlFor="sku">SKU:</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={sku}
            onChange={handleInputChange}
          />
        </div>
        <div className="basicInput">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="basicInput">
          <label htmlFor="price">Price ($)</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </div>
      </form>

      <div>
        <select
          id="typeSelect"
          name="type"
          value={type}
          onChange={handleTypeChange}
        >
          <option value="">Type Switcher</option>
          <option value="DVD">DVD</option>
          <option value="Furniture">Furniture</option>
          <option value="Book">Book</option>
        </select>
      </div>

      {/* DVD FORM */}
      {type === "DVD" && (
        <div className="form">
          <div className="rowInputs">
            <label htmlFor="size">Size (MB)</label>
            <input
              type="text"
              id="size"
              name="size"
              value={size}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      {/* FURNITURE FORM */}
      {type === "Furniture" && (
        <div className="form">
          <div className="rowInputs">
            <label htmlFor="height">Height (CM)</label>
            <input
              type="text"
              id="height"
              name="height"
              value={height}
              onChange={handleInputChange}
            />
          </div>

          <div className="rowInputs">
            <label htmlFor="width">Width (CM)</label>
            <input
              type="text"
              id="width"
              name="width"
              value={width}
              onChange={handleInputChange}
            />
          </div>

          <div className="rowInputs">
            <label htmlFor="length">Length (CM)</label>
            <input
              type="text"
              id="length"
              name="length"
              value={length}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      {/* BOOK FORM */}
      {type === "Book" && (
        <div className="form">
          <div className="rowInputs">
            <label htmlFor="weight">Weight (KG)</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={weight}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductPage;
