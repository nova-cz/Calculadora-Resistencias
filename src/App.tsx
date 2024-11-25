import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
import DeltaToStar from './componentes/DeltaToStar';
import StarToDelta from './componentes/StarToDelta';
import SeriesResistance from './componentes/SeriesResistance';
import ParallelResistance from './componentes/ParallelResistance';


const App: React.FC = () => {
    const [option, setOption] = useState<number | null>(null);

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

    // Animación para que las letras "floten"
    const floatingAnimation = {
        initial: { y: 0 },
        animate: {
            y: [0, -10, 0], // Se moverá hacia arriba y abajo
            transition: {
                y: {
                    repeat: Infinity,  // Repite infinitamente
                    duration: 2,       // Duración de un ciclo
                    ease: "easeInOut"  // Tipo de animación
                }
            }
        }
    };

    // Manejar el clic en los botones para mostrar su valor
    const handleClick = (value: number) => {
        setOption(value);
    };

    return (
        <div className="App">
            <h1>Calculadora de Resistencias</h1>
            <motion.div 
                className="menu" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
            >
                <motion.button 
                    onClick={() => handleClick(1)} 
                    variants={floatingAnimation}
                    whileHover={{ scale: 1.1 }} // Efecto de hover (aumenta el tamaño)
                >
                    Delta a Estrella
                </motion.button>
                <motion.button 
                    onClick={() => handleClick(2)} 
                    variants={floatingAnimation}
                    whileHover={{ scale: 1.1 }}
                >
                    Estrella a Delta
                </motion.button>
                <motion.button 
                    onClick={() => handleClick(3)} 
                    variants={floatingAnimation}
                    whileHover={{ scale: 1.1 }}
                >
                    Resistencias en Serie
                </motion.button>
                <motion.button 
                    onClick={() => handleClick(4)} 
                    variants={floatingAnimation}
                    whileHover={{ scale: 1.1 }}
                >
                    Resistencias en Paralelo
                </motion.button>
                <motion.button 
                    onClick={() => handleClick(5)} 
                    variants={floatingAnimation}
                    whileHover={{ scale: 1.1 }}
                >
                    Reiniciar
                </motion.button>
            </motion.div>
            <div className="content">
                {renderOption()}
            </div>
        </div>
    );
};

export default App;
