import React, { useState } from "react";
import { Stage, Layer, Line, Rect, Text } from "react-konva";
import { motion } from "framer-motion";
import "./styles/ParallelResistance.css";

const ParallelResistance: React.FC = () => {
    const [values, setValues] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>("");

    const processInput = (input: string): number[] => {
        return input.split(",").map((val) => {
            // Eliminar espacios y verificar si contiene 'k'
            const cleanedVal = val.trim().toLowerCase();
            if (cleanedVal.endsWith("k")) {
                const num = parseFloat(cleanedVal.replace("k", "").trim());
                return num * 1000;
            }
            return parseFloat(cleanedVal);
        });
    };

    const calculate = () => {
        const resistances = processInput(values);

        // Verificar si hay valores no válidos o ceros
        if (resistances.some(isNaN) || resistances.includes(0)) {
            setError("Por favor ingresa solo valores numéricos válidos (no ceros).");
            setResult(null);
            return;
        }

        setError("");
        const Req_inv = resistances.reduce((acc, r) => acc + 1 / r, 0);
        setResult(1 / Req_inv);
    };

    const stageWidth = 600;
    const stageHeight = 400;
    const resistorWidth = 60;
    const resistorHeight = 20;
    const resistorGap = 80;

    const resistances = processInput(values).filter((r) => !isNaN(r));

    // Construir la fórmula de la resistencia equivalente mostrando los valores
    const formula = resistances
        .map((r) => `1 / ${r}`)
        .join(" + ");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container"
        >
            <h2>Resistencias en Paralelo</h2>

            <div className="input-container">
                <label>
                    Resistencias (separadas por coma):{" "}
                    <input
                        type="text"
                        value={values}
                        onChange={(e) => setValues(e.target.value)}
                        placeholder="Ejemplo: 10, 20, 30 o 10k, 20k"
                    />
                </label>
                <button onClick={calculate}>Calcular</button>
            </div>

            {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="error">
                    {error}
                </motion.div>
            )}

            {result !== null && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="result">
                    <p>
                        Resistencia equivalente: <strong>{result.toLocaleString()}</strong> Ω
                    </p>
                </motion.div>
            )}

            <Stage width={stageWidth} height={stageHeight}>
                <Layer>
                    {/* Línea principal vertical */}
                    <Line
                        points={[150, 50, 150, 50 + resistances.length * resistorGap]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />

                    {resistances.map((resistance, index) => (
                        <React.Fragment key={index}>
                            {/* Rama de conexión horizontal superior */}
                            <Line
                                points={[150, 50 + index * resistorGap, 150 + resistorWidth, 50 + index * resistorGap]}
                                stroke="#8ecae6"
                                strokeWidth={3}
                            />
                            {/* Resistencia */}
                            <Rect
                                x={150 + resistorWidth}
                                y={50 + index * resistorGap - resistorHeight / 2}
                                width={resistorWidth}
                                height={resistorHeight}
                                fill="#ffb703"
                            />
                            {/* Etiqueta de resistencia */}
                            <Text
                                text={`R${index + 1} = ${resistance} Ω`}
                                x={150 + 2 * resistorWidth + 10}
                                y={50 + index * resistorGap - 10}
                                fontSize={14}
                                fill="#fb8500"
                            />
                            {/* Rama de conexión horizontal inferior */}
                            <Line
                                points={[
                                    150 + resistorWidth,
                                    50 + index * resistorGap,
                                    150 + 2 * resistorWidth,
                                    50 + index * resistorGap,
                                ]}
                                stroke="#8ecae6"
                                strokeWidth={3}
                            />
                        </React.Fragment>
                    ))}

                    {/* Línea final vertical */}
                    <Line
                        points={[150 + 2 * resistorWidth, 50, 150 + 2 * resistorWidth, 50 + resistances.length * resistorGap]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                </Layer>
            </Stage>

            {/* Procedimiento debajo del diagrama */}
            {result !== null && (
                <div className="procedure-container">
                    <h3>Procedimiento de Cálculo:</h3>
                    <p>La resistencia equivalente en paralelo se calcula con la fórmula:</p>
                    <p>
                        <strong>
                            1 / Req = {formula}
                        </strong>
                    </p>
                    <p>Usando los valores proporcionados:</p>
                    <ul>
                        {resistances.map((resistance, index) => (
                            <li key={index}>R{index + 1} = {resistance} Ω</li>
                        ))}
                    </ul>
                    <p>
                        La resistencia total, Req, es:
                        <strong> Req = {resistances.join(" + ")} = {result.toLocaleString()} Ω</strong>
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default ParallelResistance;
