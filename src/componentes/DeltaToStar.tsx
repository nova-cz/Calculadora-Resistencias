import React, { useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

const DeltaToStarWithValues: React.FC = () => {
    const [R1, setR1] = useState<number>(0);
    const [R2, setR2] = useState<number>(0);
    const [R3, setR3] = useState<number>(0);
    const [result, setResult] = useState<{ Ra: number; Rb: number; Rc: number } | null>(null);

    const calculate = () => {
        const suma = R1 + R2 + R3;
        setResult({
            Ra: (R1 * R2) / suma,
            Rb: (R2 * R3) / suma,
            Rc: (R3 * R1) / suma,
        });
    };

    const formatNumber = (num: number) => num.toLocaleString();

    // Dimensiones del Stage
    const stageWidth = 1100;
    const stageHeight = 450;

    // Calcular el centro del Stage
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;

    // Separación entre Delta y Estrella
    const separation = 120;

    return (
        <div style={{ textAlign: "center", backgroundColor: "#023047", minHeight: "100vh", padding: "40px" }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", color: "#8ecae6" }}>Conversión de Delta a Estrella</h2>

            {/* Formulario de entrada */}
            <div style={{ marginBottom: "30px", display: "flex", justifyContent: "center", gap: "20px" }}>
                {["R1", "R2", "R3"].map((label, index) => (
                    <label key={index} style={{ fontFamily: "'Poppins', sans-serif", color: "#ffb703" }}>
                        {label}:{" "}
                        <input
                            type="number"
                            value={index === 0 ? R1 : index === 1 ? R2 : R3}
                            onChange={(e) =>
                                index === 0
                                    ? setR1(Number(e.target.value))
                                    : index === 1
                                    ? setR2(Number(e.target.value))
                                    : setR3(Number(e.target.value))
                            }
                            onFocus={(e) => {
                                if (e.target.value === "0") e.target.value = "";
                            }}
                            onBlur={(e) => {
                                if (e.target.value === "") {
                                    if (index === 0) setR1(0);
                                    else if (index === 1) setR2(0);
                                    else if (index === 2) setR3(0);
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

            {/* Dibujo del Delta y Estrella */}
            <Stage width={stageWidth} height={stageHeight}>
                <Layer>
                    {/* Dibujo del Delta */}
                    <Line
                        points={[centerX - 150 - separation, centerY - 50, centerX - 50 - separation, centerY + 50]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                    <Line
                        points={[centerX - 50 - separation, centerY + 50, centerX - 250 - separation, centerY + 50]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                    <Line
                        points={[centerX - 250 - separation, centerY + 50, centerX - 150 - separation, centerY - 50]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />

                    {/* Dibujo de la Estrella */}
                    <Line
                        points={[centerX + 150 + separation, centerY - 50, centerX + 150 + separation, centerY + 50]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                    <Line
                        points={[centerX + 150 + separation, centerY + 50, centerX + 100 + separation, centerY + 100]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                    <Line
                        points={[centerX + 150 + separation, centerY + 50, centerX + 200 + separation, centerY + 100]}
                        stroke="#8ecae6"
                        strokeWidth={3}
                    />
                </Layer>

                <Layer>
                    {/* Texto en el Delta en el centro de cada línea */}
                    <Text
                        text="A"
                        x={(centerX - 50 - separation + centerX - 250 - separation) / 2 - 10}
                        y={centerY + 60}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="B"
                        x={(centerX - 150 - separation + centerX - 50 - separation) / 2 - 10}
                        y={(centerY - 50 + centerY + 20) / 2 - 20}  // Ajuste hacia arriba
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="C"
                        x={(centerX - 250 - separation + centerX - 150 - separation) / 2 - 10}
                        y={(centerY + 50 + centerY - 75) / 2 - 20}  // Ajuste hacia arriba
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />

                    {/* Texto en la Estrella */}
                    <Text
                        text="a"
                        x={centerX + 140 + separation}
                        y={centerY - 70}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="b"
                        x={centerX + 90 + separation}
                        y={centerY + 105}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="c"
                        x={centerX + 190 + separation}
                        y={centerY + 105}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                </Layer>
            </Stage>

            {/* Información del Delta y Estrella en la misma línea */}
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
                {/* Información del Delta */}
                <div>
                    <h3>Valores de Delta</h3>
                    <p>A: {formatNumber(R1)}</p>
                    <p>B: {formatNumber(R2)}</p>
                    <p>C: {formatNumber(R3)}</p>
                </div>

                {/* Información de la Estrella */}
                <div style={{ color: "#fb8500" }}>
                    <h3>Valores de Estrella</h3>
                    <p>a: {result ? formatNumber(result.Ra) : ""}</p>
                    <p>b: {result ? formatNumber(result.Rb) : ""}</p>
                    <p>c: {result ? formatNumber(result.Rc) : ""}</p>
                </div>
            </div>
        </div>
    );
};

export default DeltaToStarWithValues;
