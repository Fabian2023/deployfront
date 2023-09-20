
export const validateField = (name, value, setErrors, errors) => {
    const newErrors = { ...errors };
  
    if (name === "fullName") {
      const validNameRegex = /^[A-Za-záéíóúÁÉÍÓÚ\s]*$/;
      if (!validNameRegex.test(value)) {
        newErrors[name] = "Nombre no válido (solo letras y espacios)";
      } else {
        delete newErrors[name];
      }
  
      if (value.trim() === "") {
        newErrors[name] = "Este campo es requerido";
      }
    } else if (name === "email") {
      const validEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!validEmailRegex.test(value)) {
        newErrors[name] = "Correo electrónico no válido";
      } else {
        delete newErrors[name];
      }
  
      if (value.trim() === "") {
        newErrors[name] = "Este campo es requerido";
      }
    } else if (name === "password") {
      if (value.length < 8 || !/(?=.*[A-Za-z])(?=.*\d)/.test(value)) {
        newErrors[name] =
          "La contraseña debe tener al menos 8 caracteres y contener letras y números";
      } else {
        delete newErrors[name];
      }
  
      if (value.trim() === "") {
        newErrors[name] = "Este campo es requerido";
      }
    }  else {
      delete newErrors[name];
    }
  
    setErrors(newErrors);
    console.log('Validaciones ejecutadas:', newErrors);
  };
  