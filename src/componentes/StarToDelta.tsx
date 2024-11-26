import React, { useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { motion } from "framer-motion";
import "./styles/StarToDelta.css"; // Asegúrate de importar el archivo CSS

const StarToDelta: React.FC = () => {
    const [a, setA] = useState<string>("0");
    const [b, setB] = useState<string>("0");
    const [c, setC] = useState<string>("0");
    const [result, setResult] = useState<{ A: number; B: number; C: number } | null>(null);

    // Función para parsear la entrada con las unidades
    const parseInput = (input: string): number => {
        const sanitized = input.trim().toLowerCase();
        const regex = /^(\d+(\.\d+)?)([km]?)$/;
        const match = sanitized.match(regex);

        if (!match) {
            return 0; // Si no coincide con el formato esperado, devolver 0
        }

        const value = parseFloat(match[1]);
        const suffix = match[3];

        if (suffix === "k") return value * 1000;
        if (suffix === "m") return value * 1000000;
        return value;
    };

    // Controlador de eventos para filtrar entrada en tiempo real
    const handleInputChange = (index: number, value: string) => {
        const sanitizedValue = value.replace(/[^0-9km.]/gi, ""); // Permite solo números, 'k', 'm', '.'
        if (index === 0) setA(sanitizedValue);
        else if (index === 1) setB(sanitizedValue);
        else if (index === 2) setC(sanitizedValue);
    };

    // Cálculo de las resistencias en el sistema Delta
    const calculate = () => {
        const parsedA = parseInput(a);
        const parsedB = parseInput(b);
        const parsedC = parseInput(c);
        const suma = parsedA * parsedB + parsedB * parsedC + parsedC * parsedA;
        setResult({
            A: suma / parsedA,
            B: suma / parsedB,
            C: suma / parsedC,
        });
    };

    const formatNumber = (num: number): string => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
        if (num >= 1000) return (num / 1000).toFixed(1) + "k";
        return num.toLocaleString();
    };

    const stageWidth = 1100;
    const stageHeight = 450;
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;
    const separation = 220;

    // Estado para mostrar la información de la letra
    const [info, setInfo] = useState<string | null>(null);

    // Función para manejar el clic en las letras
    const handleClick = (letter: string) => {
        let infoText = '';
        switch (letter) {
            case 'A':
                infoText = 'Información sobre la letra A';
                break;
            case 'B':
                infoText = 'Información sobre la letra B';
                break;
            case 'C':
                infoText = 'Información sobre la letra C';
                break;
            case 'a':
                infoText = 'Información sobre la letra a';
                break;
            case 'b':
                infoText = 'Información sobre la letra b';
                break;
            case 'c':
                infoText = 'Información sobre la letra c';
                break;
            default:
                infoText = '';
        }
        setInfo(infoText);
    };

    return (
        <div className="body-container">
            <h2>Conversión de Estrella a Delta</h2>

            <div className="input-container">
                {["a", "b", "c"].map((label, index) => (
                    <label key={index}>
                        {label}:{" "}
                        <input
                            type="text"
                            value={index === 0 ? a : index === 1 ? b : c}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onFocus={(e) => {
                                if (e.target.value === "0") e.target.value = "";
                            }}
                            onBlur={(e) => {
                                if (e.target.value === "") {
                                    if (index === 0) setA("0");
                                    else if (index === 1) setB("0");
                                    else if (index === 2) setC("0");
                                }
                            }}
                        />
                    </label>
                ))}
                <button onClick={calculate}>Calcular</button>
            </div>

            <Stage width={stageWidth} height={stageHeight}>
                <Layer>
                    {/* Representación visual de la estrella */}
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
                    {/* Nombres de las resistencias en la figura Estrella */}
                    <Text
                        text="a"
                        x={centerX - 154 - separation}
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
                        x={centerX - 95 - separation}
                        y={centerY + 110}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="A"
                        x={centerX + 140 + separation}
                        y={centerY + 70}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="C"
                        x={centerX + 70 + separation}
                        y={centerY -20}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                    <Text
                        text="B"
                        x={centerX + 220 + separation}
                        y={centerY - 20}
                        fontSize={16}
                        fontFamily="'Poppins', sans-serif"
                        fill="#fb8500"
                    />
                </Layer>
            </Stage>

            <div className="result-container">
                <div>
                    <h3>Valores de Estrella</h3>
                    <p>a: {formatNumber(parseInput(a))}</p>
                    <p>b: {formatNumber(parseInput(b))}</p>
                    <p>c: {formatNumber(parseInput(c))}</p>
                </div>

                {result && (
                    <div>
                        <h3>Resultados de Delta</h3>
                        <p>A: {formatNumber(result.A)}</p>
                        <p>B: {formatNumber(result.B)}</p>
                        <p>C: {formatNumber(result.C)}</p>
                    </div>
                )}

            </div>

            <div className="procedure">
                <h3>Procedimiento paso a paso:</h3>
                <ol>
                    <li>
                        <strong>Introducción de valores:</strong> Los valores ingresados son:
                        <ul>
                            <li>a = {formatNumber(parseInput(a))}</li>
                            <li>b = {formatNumber(parseInput(b))}</li>
                            <li>c = {formatNumber(parseInput(c))}</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Cálculo de la resistencia en Delta:</strong>
                        <br />
                        <code>A = (a * b + b * c + c * a) / a = ({formatNumber(parseInput(a))} * {formatNumber(parseInput(b))} + {formatNumber(parseInput(b))} * {formatNumber(parseInput(c))} + {formatNumber(parseInput(c))} * {formatNumber(parseInput(a))}) / {formatNumber(parseInput(a))}</code>
                        <br />
                        <code>B = (a * b + b * c + c * a) / b = ({formatNumber(parseInput(a))} * {formatNumber(parseInput(b))} + {formatNumber(parseInput(b))} * {formatNumber(parseInput(c))} + {formatNumber(parseInput(c))} * {formatNumber(parseInput(a))}) / {formatNumber(parseInput(b))}</code>
                        <br />
                        <code>C = (a * b + b * c + c * a) / c = ({formatNumber(parseInput(a))} * {formatNumber(parseInput(b))} + {formatNumber(parseInput(b))} * {formatNumber(parseInput(c))} + {formatNumber(parseInput(c))} * {formatNumber(parseInput(a))}) / {formatNumber(parseInput(c))}</code>
                    </li>
                    <li>
                        <strong>Visualización:</strong> Se muestra una representación visual del triángulo Delta con valores para A, B y C, así como la estrella con los valores a, b y c.
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default StarToDelta;
