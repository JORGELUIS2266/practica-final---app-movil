import React, { createContext, useState } from "react";

export const AlumnosContext = createContext();

export const AlumnosProvider = ({ children }) => {
  const [alumnos, setAlumnos] = useState([]);

  const agregarAlumno = (alumno) => {
    setAlumnos([...alumnos, { id: Date.now(), ...alumno }]);
  };

  const actualizarAlumno = (id, datos) => {
    setAlumnos(alumnos.map(a => (a.id === id ? { ...a, ...datos } : a)));
  };

  const eliminarAlumno = (id) => {
    setAlumnos(alumnos.filter(a => a.id !== id));
  };

  return (
    <AlumnosContext.Provider value={{ alumnos, agregarAlumno, actualizarAlumno, eliminarAlumno }}>
      {children}
    </AlumnosContext.Provider>
  );
};
