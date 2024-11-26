import React, { useState } from "react";
import { Stage, Layer, Line, Rect, Text } from "react-konva";
import { motion } from "framer-motion";
import './styles/SeriesResistance.css';

const SeriesResistance: React.FC = () => {
    const [values, setValues] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>("");

    const processValues = (input: string) => {
        return input.split(",").map(value => {
            let cleanedValue = value.trim().toLowerCase();
            if (cleanedValue.includes('k')) {
                cleanedValue = cleanedValue.replace('k', '');
                return Number(cleanedValue) * 1000;   
            }
            return Number(cleanedValue);  
        });
    };

    const calculate = () => {
        const resistances = processValues(values); 
        
        if (resistances.some(isNaN)) {
            setError("Por favor ingresa solo valores numéricos válidos.");
            setResult(null);
            return;
        }

        setError(""); 
        const Req = resistances.reduce((acc, r) => acc + r, 0); 
        setResult(Req);
    };

    const stageWidth = 600;
    const stageHeight = 200;
    const resistorWidth = 60;
    const resistorHeight = 20;
    const resistorGap = 30;

    const resistances = processValues(values); 

    const totalWidth = resistances.length * (resistorWidth + resistorGap) - resistorGap;
    const startX = (stageWidth - totalWidth) / 2;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container"
        >
            <h2 className="title">Resistencias en Serie</h2>

            <div className="input-container">
                <label className="input-label">
                    Resistencias (separadas por coma):{" "}
                    <input
                        type="text"
                        value={values}
                        onChange={(e) => setValues(e.target.value)}
                        placeholder="Ejemplo: 10,20,30 o 10k,5k"
                        className="input-field"
                    />
                </label>
                <button onClick={calculate} className="calculate-button">
                    Calcular
                </button>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="error-container"
                >
                    <p className="error-text">{error}</p>
                </motion.div>
            )}

            {result !== null && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="result-container"
                >
                    <p className="result-text">
                        Resistencia equivalente: <strong>{result.toFixed(4)}</strong> Ω
                    </p>
                </motion.div>
            )}

            <Stage width={stageWidth} height={stageHeight}>
                <Layer>
                    {resistances.map((resistance, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <Line
                                    points={[
                                        startX + (index - 1) * (resistorWidth + resistorGap) + resistorWidth, 
                                        stageHeight / 2,
                                        startX + index * (resistorWidth + resistorGap), 
                                        stageHeight / 2,
                                    ]}
                                    stroke="#8ecae6"
                                    strokeWidth={3}
                                />
                            )}

                            <Rect
                                x={startX + index * (resistorWidth + resistorGap)}
                                y={stageHeight / 2 - resistorHeight / 2}
                                width={resistorWidth}
                                height={resistorHeight}
                                fill="#ffb703"
                            />
                            <Text
                                text={`R${index + 1} = ${resistance} Ω`}
                                x={startX + index * (resistorWidth + resistorGap)}
                                y={stageHeight / 2 - resistorHeight - 15}
                                fontSize={14}
                                fill="#fb8500"
                                fontFamily="'Poppins', sans-serif"
                            />
                        </React.Fragment>
                    ))}

                    <Line
                        points={[startX - resistorGap, stageHeight / 2, startX, stageHeight / 2]} 
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />

                    <Line
                        points={[
                            startX + (resistances.length - 1) * (resistorWidth + resistorGap) + resistorWidth, 
                            stageHeight / 2,
                            stageWidth - (stageWidth - (startX + totalWidth + resistorGap)), 
                            stageHeight / 2,
                        ]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                </Layer>
            </Stage>

            {result !== null && (
                <div className="procedure-container">
                    <h3>Procedimiento de Cálculo:</h3>
                    <p>
                        La resistencia equivalente en serie se calcula sumando todas las resistencias individuales:
                    </p>
                    <ul>
                        {resistances.map((resistance, index) => (
                            <li key={index}>R{index + 1} = {resistance} Ω</li>
                        ))}
                    </ul>
                    <p>
                        La resistencia total, Req, es la suma de todas: 
                        <strong> Req = {resistances.join(" + ")} = {result.toFixed(4)} Ω</strong>
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default SeriesResistance;
