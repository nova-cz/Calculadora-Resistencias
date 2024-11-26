import React, { useState } from "react";

interface EditResistorModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  currentName: string;
  currentValue: number;
  onUpdateResistor: (name: string, value: number) => void;
}

const EditResistorModal: React.FC<EditResistorModalProps> = ({
  isOpen,
  onRequestClose,
  currentName,
  currentValue,
  onUpdateResistor,
}) => {
  const [name, setName] = useState(currentName);
  const [value, setValue] = useState(currentValue);

  const handleSubmit = () => {
    onUpdateResistor(name, value);
    onRequestClose(); 
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "20px", background: "white", zIndex: 1000 }}>
      <h3>Editar Resistencia</h3>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Valor (Ω):
        <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
      </label>
      <br />
      <button onClick={handleSubmit}>Actualizar</button>
      <button onClick={onRequestClose}>Cancelar</button>
    </div>
  );
};

export default EditResistorModal;
