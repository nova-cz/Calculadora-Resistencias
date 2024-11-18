import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
import DeltaToStar from './componentes/DeltaToStar'; // Corrección de la ruta y nombre
import StarToDelta from "./componentes/StarToDelta";
import SeriesResistance from "./componentes/SeriesResistance";
import ParallelResistance from "./componentes/ParallelResistance";

const App: React.FC = () => {
    const [option, setOption] = useState<number | null>(null);

    // Función para renderizar el componente basado en la opción seleccionada
    const renderOption = () => {
        switch (option) {
            case 1:
                return <DeltaToStar />;
            case 2:
                return <StarToDelta />;
            case 3:
                return <SeriesResistance />;
            case 4:
                return <ParallelResistance />;
            default:
                return <p>Seleccione una opción para comenzar.</p>;
        }
    };

    return (
        <div className="App">
            <h1>Calculadora de Resistencias</h1>
            <motion.div className="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button onClick={() => setOption(1)}>Delta a Estrella</button>
                <button onClick={() => setOption(2)}>Estrella a Delta</button>
                <button onClick={() => setOption(3)}>Resistencias en Serie</button>
                <button onClick={() => setOption(4)}>Resistencias en Paralelo</button>
                <button onClick={() => setOption(null)}>Reiniciar</button>
            </motion.div>
            <div className="content">{renderOption()}</div>
        </div>
    );
};

export default App;
