import React, { useState } from "react";
import { Stage, Layer, Line, Rect, Text } from "react-konva";
import { motion } from "framer-motion";

const SeriesResistance: React.FC = () => {
    const [values, setValues] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const resistances = values.split(",").map(Number);
        const Req = resistances.reduce((acc, r) => acc + r, 0);
        setResult(Req);
    };

    // Parámetros de diagrama
    const stageWidth = 600;
    const stageHeight = 200;
    const resistorWidth = 60;
    const resistorHeight = 20;
    const resistorGap = 30;

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
            <h2 style={{ color: "#8ecae6" }}>Resistencias en Serie</h2>

            {/* Input de resistencias en serie */}
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

            {/* Dibujo del circuito en serie */}
            <Stage width={stageWidth} height={stageHeight}>
                <Layer>
                    {/* Línea de entrada */}
                    <Line
                        points={[20, stageHeight / 2, 40, stageHeight / 2]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />

                    {/* Dibujo de cada resistencia y líneas de conexión */}
                    {resistances.map((resistance, index) => (
                        <React.Fragment key={index}>
                            {/* Rectángulo que representa la resistencia */}
                            <Rect
                                x={50 + index * (resistorWidth + resistorGap)}
                                y={stageHeight / 2 - resistorHeight / 2}
                                width={resistorWidth}
                                height={resistorHeight}
                                fill="#ffb703"
                            />
                            {/* Texto con el valor de la resistencia */}
                            <Text
                                text={`R${index + 1} = ${resistance} Ω`}
                                x={50 + index * (resistorWidth + resistorGap)}
                                y={stageHeight / 2 - resistorHeight - 15}
                                fontSize={14}
                                fill="#fb8500"
                                fontFamily="'Poppins', sans-serif"
                            />
                            {/* Línea de conexión entre resistencias */}
                            <Line
                                points={[
                                    50 + index * (resistorWidth + resistorGap) + resistorWidth,
                                    stageHeight / 2,
                                    50 + (index + 1) * (resistorWidth + resistorGap),
                                    stageHeight / 2,
                                ]}
                                stroke="#8ecae6"
                                strokeWidth={3}
                            />
                        </React.Fragment>
                    ))}

                    {/* Línea de salida */}
                    <Line
                        points={[
                            50 + resistances.length * (resistorWidth + resistorGap),
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

export default SeriesResistance;
