
const regexName = /^[a-zA-Z\s]+$/;
const regexNumber = /^[0-9]\d*(\.\d+)?$/;
const errorCompleted = "es obligatorio*";
const errorCompletedd="es obligatoria*"
const errorJustNumber = "Debe contener solo números*";

const validation = ({
  name,
  brand,
  description,  
  price,
  stock,
  maker,
  model,
  color,
  kilometraje,
  direccion,
  category
}) => {
  const errors = {};

  if (!name) {
    errors.name = `El nombre ${errorCompleted}`;
  } else if (parseInt(name)) {
    errors.name = "El nombre es inválido, debe ser un texto";
  } else if (!regexName.test(name)) {
    errors.name = "No se admiten caracteres especiales";
  } else if (name.length > 50) {
    errors.name = "El nombre debe tener como máximo 50 caracteres";
  }

  if (!brand) {
    errors.brand = `La marca ${errorCompletedd}`;
  }

  if (!description) {
    errors.description = `La descripción ${errorCompletedd}`;
  }

  if (!price) {
    errors.price = `El precio ${errorCompleted}`;
  } else if (!regexNumber.test(price)) {
    errors.price = `El precio ${errorJustNumber}`;
  }

  if (!stock) {
    errors.stock = `La cantidad ${errorCompletedd}`;
  } else if (!Number.isInteger(Number(stock))) {
    errors.stock = `La cantidad debe ser un número entero`;
  }

  if (!maker) {
    errors.maker = `El fabricante ${errorCompleted}`;
  }

  if (!model) {
    errors.model = `El año ${errorCompleted}`;
  } else if (!Number.isInteger(Number(model))) {
    errors.model = `El año debe ser un número entero`;
  }

  if (!color) {
    errors.color = `El color ${errorCompleted}`;
  }

  if (!kilometraje) {
    errors.kilometraje = `El kilometraje ${errorCompleted}`;
  } else if (!Number.isInteger(Number(kilometraje))) {
    errors.kilometraje = `El kilometraje debe ser un número entero`;
  }

  if (!direccion) {
    errors.direccion = `La dirección ${errorCompletedd}`;
  }

  if (!category) {
    errors.category = `La categoría ${errorCompletedd}`;
  }

  return errors;
};

export default validation;