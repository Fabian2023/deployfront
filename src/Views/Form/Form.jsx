import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Form.css";
import {
  postProduct,
  getCategorys,
  getBrands,
} from "../../redux/action/action";
import validation from "./validation";

const Form = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const brand = useSelector((state) => state.brands);
  const [file, setFile] = useState([]);
  const [image, setImage] = useState([]);
  const [products, setProducts] = useState([]);
  const [postCarForm, setPostCarForm] = useState({
    name: "",
    image: [],
    brand: "",
    description: "",
    price: "",
    stock: "",
    maker: "",
    model: "",
    color: "",
    kilometraje: "",
    direccion: "",
    category: [],
  });
  const [errors, setErrors] = useState({});
  const [fieldTouched, setFieldTouched] = useState({
    name: false,
    brand: false,
    price: false,
    stock: false,
    maker: false,
    model: false,
    kilometraje: false,
    direccion: false,
    category: false,
    description: false,
  });

  useEffect(() => {
    dispatch(getCategorys());
    dispatch(getBrands());
  }, []);

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setPostCarForm({
      ...postCarForm,
      [property]: value,
    });

    // Marcar el campo como tocado
    setFieldTouched({
      ...fieldTouched,
      [property]: true,
    });

    // Validar el campo solo si el usuario ha interactuado con él
    if (fieldTouched[property]) {
      const updatedErrors = validation({
        ...postCarForm,
        [property]: value,
      });
      setErrors(updatedErrors);
    }
  };

  const selectBrandHandler = (event) => {
    const brandValue = event.target.value;
    setPostCarForm({
      ...postCarForm,
      brand: brandValue,
    });
  };

  const selectCategoryHandler = (event) => {
    const categoryValue = event.target.value;
    setPostCarForm({
      ...postCarForm,
      category: [categoryValue],
    });
  };

  const handleChange = (e) => {
    const files = e.target.files;
    const fileList = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        fileList.push(imageData);

        if (fileList.length === files.length) {
          setFile(fileList);
          setImage(fileList);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0 && postCarForm.category.length > 0) {
      const newProduct = {
        name: postCarForm.name,
        image: file,
        brand: postCarForm.brand,
        description: postCarForm.description,
        price: postCarForm.price,
        stock: postCarForm.stock,
        maker: postCarForm.maker,
        model: postCarForm.model,
        color: postCarForm.color,
        kilometraje: postCarForm.kilometraje,
        direccion: postCarForm.direccion,
        category: postCarForm.category,
      };

      setFile(file);
      setProducts([...products, newProduct]);
      dispatch(postProduct(newProduct));

      setPostCarForm({
        name: "",
        image: [],
        brand: "",
        description: "",
        price: "",
        stock: "",
        maker: "",
        model: "",
        color: "",
        kilometraje: "",
        direccion: "",
        category: [],
      });

      console.log("dispatch:", newProduct);
      alert("Tu producto ha sido creado exitosamente");
    } else {
      alert("Debes llenar todos los campos");
    }
  };

  const previewFiles = (files) => {
    const imagePreviews = [];
    const readers = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      readers.push(reader);
      reader.readAsDataURL(files[i]);

      reader.onloadend = () => {
        imagePreviews.push(reader.result);

        if (imagePreviews.length === files.length) {
          setImage(imagePreviews);
        }
      };
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="form-container">
        <div className="form-row">
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              value={postCarForm.name}
              name="name"
              onChange={changeHandler}
            />
            {fieldTouched.name && errors.name && (
              <span className="error">{errors.name}</span>
            )}
          </div>
          <div>
            <label htmlFor="brand">Marca:</label>
            <select
              name="brand"
              value={postCarForm.brand}
              onChange={changeHandler}
            >
              <option value="">selecciona la marca</option>
              {brand?.map((brand) => (
                <option value={brand.name} key={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && fieldTouched.brand && (
              <span className="error">{errors.brand}</span>
            )}
          </div>
          <div>
            <label htmlFor="price">Precio:</label>
            <input
              type="text"
              value={postCarForm.price}
              name="price"
              onChange={changeHandler}
            />
            {errors.price && fieldTouched.price && (
              <span className="error">{errors.price}</span>
            )}
          </div>
          <div>
            <label htmlFor="stock">Cantidad:</label>
            <input
              type="text"
              value={postCarForm.stock}
              name="stock"
              onChange={changeHandler}
            />
            {errors.stock && fieldTouched.stock && (
              <span className="error">{errors.stock}</span>
            )}
          </div>
          <div>
            <label htmlFor="maker">Fabricante:</label>
            <input
              type="text"
              value={postCarForm.maker}
              name="maker"
              onChange={changeHandler}
            />
            {errors.maker && fieldTouched.maker && (
              <span className="error">{errors.maker}</span>
            )}
          </div>
          <div>
            <label htmlFor="model">Año:</label>
            <input
              type="text"
              value={postCarForm.model}
              name="model"
              onChange={changeHandler}
            />
            {errors.model && fieldTouched.model && (
              <span className="error">{errors.model}</span>
            )}
          </div>
          <div>
            <label htmlFor="color">Color:</label>
            <input
              type="text"
              value={postCarForm.color}
              name="color"
              onChange={changeHandler}
            />
            {errors.color && fieldTouched.color && (
              <span className="error">{errors.color}</span>
            )}
          </div>
          <div>
            <label htmlFor="kilometraje">Kilometraje:</label>
            <input
              type="text"
              value={postCarForm.kilometraje}
              name="kilometraje"
              onChange={changeHandler}
            />
            {errors.kilometraje && fieldTouched.kilometraje && (
              <span className="error">{errors.kilometraje}</span>
            )}
          </div>
          <div>
            <label htmlFor="direccion">Dirección:</label>
            <select
              name="direccion"
              value={postCarForm.direccion}
              onChange={changeHandler}
            >
              <option value="">Selecciona el tipo de dirección</option>
              <option value="hidraulica">Hidráulica</option>
              <option value="mecanica">Mecánica</option>
            </select>
            {errors.direccion && fieldTouched.direccion && (
              <span className="error">{errors.direccion}</span>
            )}
          </div>
          <div>
            <label htmlFor="category">Categoría:</label>
            <select
              name="category"
              value={postCarForm.category}
              onChange={changeHandler}
            >
              <option value="">selecciona una Categoria</option>
              {category &&
                category.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
            {errors.category && fieldTouched.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>
          <div>
            <label htmlFor="description">Agrega una descripción:</label>
            <input
              type="text"
              value={postCarForm.description}
              name="description"
              onChange={changeHandler}
            />
            {errors.description && fieldTouched.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>
          <div>
            <label htmlFor="fileInput">Subir imagen aquí:</label>
            <input type="file" multiple onChange={handleChange} />
          </div>
        </div>
        <div className="button-container">
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
