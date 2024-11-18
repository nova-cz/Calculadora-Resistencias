import React, { useState } from "react";
import { Stage, Layer, Line, Rect, Text } from "react-konva";
import { motion } from "framer-motion";

const ParallelResistance: React.FC = () => {
    const [values, setValues] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const resistances = values.split(",").map(Number);
        const Req_inv = resistances.reduce((acc, r) => acc + 1 / r, 0);
        setResult(1 / Req_inv);
    };

    // Parámetros de diagrama
    const stageWidth = 600;
    const stageHeight = 400; // Aumentado para acomodar más resistencias
    const resistorWidth = 60;
    const resistorHeight = 20;
    const resistorGap = 100; // Espacio entre resistencias

    // Dividir los valores ingresados por coma y calcular posiciones de cada resistencia
    const resistances = values.split(",").map(Number).filter((r) => !isNaN(r));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                textAlign: "center",
                backgroundColor: "#023047",
                color: "#8ecae6",
                minHeight: "100vh",
                padding: "40px",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <h2 style={{ color: "#8ecae6" }}>Resistencias en Paralelo</h2>

            {/* Input de resistencias en paralelo */}
            <div style={{ marginBottom: "30px", display: "flex", justifyContent: "center", gap: "10px" }}>
                <label style={{ color: "#ffb703", fontFamily: "'Poppins', sans-serif" }}>
                    Resistencias (separadas por coma):{" "}
                    <input
                        type="text"
                        value={values}
                        onChange={(e) => setValues(e.target.value)}
                        placeholder="Ejemplo: 10,20,30"
                        style={{
                            padding: "5px",
                            borderRadius: "5px",
                            border: "1px solid #264653",
                            width: "200px",
                            marginLeft: "10px",
                            fontFamily: "'Poppins', sans-serif",
                        }}
                    />
                </label>
                <button
                    onClick={calculate}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#e76f51",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontFamily: "'Poppins', sans-serif",
                    }}
                >
                    Calcular
                </button>
            </div>

            {/* Resultado de la resistencia equivalente */}
            {result !== null && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        backgroundColor: "#264653",
                        padding: "20px",
                        borderRadius: "10px",
                        display: "inline-block",
                        color: "#ffb703",
                        marginBottom: "20px",
                    }}
                >
                    <p style={{ fontSize: "1.2rem", fontFamily: "'Poppins', sans-serif" }}>
                        Resistencia equivalente: <strong>{result.toFixed(4)}</strong> Ω
                    </p>
                </motion.div>
            )}

            {/* Dibujo del circuito en paralelo */}
            <Stage width={stageWidth} height={stageHeight}>
                <Layer>
                    {/* Línea de entrada */}
                    <Line
                        points={[20, stageHeight / 2, 40, stageHeight / 2]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />

                    {/* Dibujo de cada resistencia en paralelo */}
                    {resistances.map((resistance, index) => (
                        <React.Fragment key={index}>
                            {/* Línea gris que acompaña a cada resistencia */}
                            <Line
                                points={[40, 50 + index * resistorGap, 40 + resistorWidth, 50 + index * resistorGap]}
                                stroke="#8ecae6"
                                strokeWidth={3}
                            />
                            {/* Rectángulo que representa la resistencia */}
                            <Rect
                                x={40}
                                y={50 + index * resistorGap} // Incremento en la posición vertical
                                width={resistorWidth}
                                height={resistorHeight}
                                fill="#ffb703"
                            />
                            {/* Texto con el valor de la resistencia */}
                            <Text
                                text={`R${index + 1} = ${resistance} Ω`}
                                x={40}
                                y={50 + index * resistorGap - 15} // Ajuste del texto
                                fontSize={14}
                                fill="#fb8500"
                                fontFamily="'Poppins', sans-serif"
                            />
                        </React.Fragment>
                    ))}

                    {/* Líneas de salida */}
                    <Line
                        points={[
                            40 + resistorWidth, // Línea de salida al final de las resistencias
                            stageHeight / 2,
                            stageWidth - 20,
                            stageHeight / 2,
                        ]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                </Layer>
            </Stage>
        </motion.div>
    );
};

export default ParallelResistance;
