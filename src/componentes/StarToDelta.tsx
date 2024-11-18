import React, { useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { motion } from "framer-motion";

const StarToDelta: React.FC = () => {
    const [Ra, setRa] = useState<number>(0);
    const [Rb, setRb] = useState<number>(0);
    const [Rc, setRc] = useState<number>(0);
    const [result, setResult] = useState<{ R1: number; R2: number; R3: number } | null>(null);

    const calculate = () => {
        const suma = Ra * Rb + Rb * Rc + Rc * Ra;
        setResult({
            R1: suma / Rc,
            R2: suma / Ra,
            R3: suma / Rb,
        });
    };

    const formatNumber = (num: number) => num.toLocaleString();

    // Dimensiones del Stage
    const stageWidth = 1100;
    const stageHeight = 450;

    // Calcular el centro del Stage
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;

    // Separación entre Estrella y Delta
    const separation = 120;

    return (
        <motion.div initial={{ x: 200 }} animate={{ x: 0 }} style={{ textAlign: "center", backgroundColor: "#023047", minHeight: "100vh", padding: "40px" }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", color: "#8ecae6" }}>Conversión de Estrella a Delta</h2>

            {/* Formulario de entrada */}
            <div style={{ marginBottom: "30px", display: "flex", justifyContent: "center", gap: "20px" }}>
                {["Ra", "Rb", "Rc"].map((label, index) => (
                    <label key={index} style={{ fontFamily: "'Poppins', sans-serif", color: "#ffb703" }}>
                        {label}:{" "}
                        <input
                            type="number"
                            value={index === 0 ? Ra : index === 1 ? Rb : Rc}
                            onChange={(e) =>
                                index === 0
                                    ? setRa(Number(e.target.value))
                                    : index === 1
                                    ? setRb(Number(e.target.value))
                                    : setRc(Number(e.target.value))
                            }
                            onFocus={(e) => {
                                if (e.target.value === "0") e.target.value = "";
                            }}
                            onBlur={(e) => {
                                if (e.target.value === "") {
                                    if (index === 0) setRa(0);
                                    else if (index === 1) setRb(0);
                                    else if (index === 2) setRc(0);
                                }
                            }}
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #264653",
                                width: "80px",
                                marginLeft: "10px",
                            }}
                        />
                    </label>
                ))}
                <button
                    onClick={calculate}
                    style={{
                        padding: "10px 20px",
                        marginLeft: "20px",
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

            {/* Dibujo de la Estrella y Delta */}
            <Stage width={stageWidth} height={stageHeight}>
                <Layer>
                    {/* Dibujo de la Estrella */}
                    <Line
                        points={[centerX - 150 - separation, centerY - 50, centerX - 150 - separation, centerY + 50]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                    <Line
                        points={[centerX - 150 - separation, centerY + 50, centerX - 200 - separation, centerY + 100]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                    <Line
                        points={[centerX - 150 - separation, centerY + 50, centerX - 100 - separation, centerY + 100]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />

                    {/* Dibujo del Delta */}
                    <Line
                        points={[centerX + 150 + separation, centerY - 50, centerX + 50 + separation, centerY + 50]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                    <Line
                        points={[centerX + 50 + separation, centerY + 50, centerX + 250 + separation, centerY + 50]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                    <Line
                        points={[centerX + 250 + separation, centerY + 50, centerX + 150 + separation, centerY - 50]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                </Layer>

                <Layer>
                    {/* Texto en la Estrella */}
                    <Text
                        text="a"
                        x={centerX - 160 - separation}
                        y={centerY - 70}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="b"
                        x={centerX - 210 - separation}
                        y={centerY + 110}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="c"
                        x={centerX - 110 - separation}
                        y={centerY + 110}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />

                    {/* Texto en el Delta en el centro de cada línea */}
                    <Text
                        text="A"
                        x={(centerX + 50 + separation + centerX + 250 + separation) / 2 - 10}
                        y={centerY + 60}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="B"
                        x={(centerX + 150 + separation + centerX + 50 + separation) / 2 - 10}
                        y={(centerY - 50 + centerY + 50) / 2 - 20}  // Ajuste hacia arriba
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="C"
                        x={(centerX + 250 + separation + centerX + 150 + separation) / 2 - 10}
                        y={(centerY + 50 + centerY - 70) / 2 - 20}  // Ajuste hacia arriba
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                </Layer>
            </Stage>

            {/* Información de la Estrella y Delta en la misma línea */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: `${separation * 2}px`,
                    marginTop: "30px",
                    color: "#ffb703",
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                {/* Información de la Estrella */}
                <div>
                    <h3>Valores de Estrella</h3>
                    <p>a: {formatNumber(Ra)}</p>
                    <p>b: {formatNumber(Rb)}</p>
                    <p>c: {formatNumber(Rc)}</p>
                </div>

                {/* Información del Delta */}
                <div style={{ color: "#fb8500" }}>
                    <h3>Valores de Delta</h3>
                    <p>R1: {result ? formatNumber(result.R1) : ""}</p>
                    <p>R2: {result ? formatNumber(result.R2) : ""}</p>
                    <p>R3: {result ? formatNumber(result.R3) : ""}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default StarToDelta;
