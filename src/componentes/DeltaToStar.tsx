import React, { useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { motion } from "framer-motion";
import './styles/deltatoStar.css'; 


const DeltaToStarWithValues: React.FC = () => {
    const [A, setA] = useState<string>("0");
    const [B, setB] = useState<string>("0");
    const [C, setC] = useState<string>("0");
    const [result, setResult] = useState<{ a: number; b: number; c: number } | null>(null);

    const parseInput = (input: string): number => {
        const sanitized = input.trim().toLowerCase();
        const regex = /^(\d+(\.\d+)?)([km]?)$/;
        const match = sanitized.match(regex);

        if (!match) {
            return 0; 
        }

        const value = parseFloat(match[1]);
        const suffix = match[3];

        if (suffix === "k") return value * 1000;
        if (suffix === "m") return value * 1000000;
        return value;
    };

    const handleInputChange = (index: number, value: string) => {
        const sanitizedValue = value.replace(/[^0-9km.]/gi, ""); 
        if (index === 0) setA(sanitizedValue);
        else if (index === 1) setB(sanitizedValue);
        else if (index === 2) setC(sanitizedValue);
    };

    const calculate = () => {
        const parsedA = parseInput(A);
        const parsedB = parseInput(B);
        const parsedC = parseInput(C);
        const suma = parsedA + parsedB + parsedC;
        setResult({
            a: (parsedB * parsedC) / suma,
            b: (parsedA * parsedC) / suma,
            c: (parsedA * parsedB) / suma,
        });
    };

    const formatNumber = (num: number): string => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
        if (num >= 1000) return (num / 1000).toFixed(1) + "k";
        return num.toLocaleString();
    };

    const floatingAnimation = {
        initial: { y: 0, scale: 1 },
        animate: {
            y: [0, -15, 0], 
            scale: [1, 1.2, 1], 
            transition: {
                y: {
                    repeat: Infinity,  
                    duration: 1,       
                    ease: "easeInOut"  
                },
                scale: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                }
            }
        }
    };

    const stageWidth = 1100;
    const stageHeight = 450;
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;
    const separation = 220;

    const [info, setInfo] = useState<string | null>(null);

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
            <h2>Conversión de Delta a Estrella</h2>

            <div className="input-container">
                {["A", "B", "C"].map((label, index) => (
                    <label key={index}>
                        {label}:{" "}
                        <input
                            type="text"
                            value={index === 0 ? A : index === 1 ? B : C}
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
                    
                        <Line
                            points={[centerX - 150 - separation + 100, centerY - 50, centerX - 50 - separation + 100, centerY + 50]}
                            stroke="#8ecae6"
                            strokeWidth={3}
                        />
                        <Line
                            points={[centerX - 50 - separation + 100, centerY + 50, centerX - 250 - separation + 100, centerY + 50]}
                            stroke="#8ecae6"
                            strokeWidth={3}
                        />
                        <Line
                            points={[centerX - 250 - separation + 100, centerY + 50, centerX - 150 - separation + 100, centerY - 50]}
                            stroke="#8ecae6"
                            strokeWidth={3}
                        />

                        <Line
                            points={[centerX + 190 + separation, centerY - 50, centerX + 190 + separation, centerY + 50]}
                            stroke="#8ecae6"
                            strokeWidth={3}
                        />
                        <Line
                            points={[centerX + 190 + separation, centerY + 50, centerX + 140 + separation, centerY + 100]}
                            stroke="#8ecae6"
                            strokeWidth={3}
                        />
                        <Line
                            points={[centerX + 190 + separation, centerY + 50, centerX + 240 + separation, centerY + 100]}
                            stroke="#8ecae6"
                            strokeWidth={3}
                        />

                        <Text
                            text="A"
                            x={(centerX - 50 - separation + centerX - 250 - separation) / 2 - 10 + 100}
                            y={centerY + 60}
                            fontSize={16}
                            fontFamily="'Poppins', sans-serif"
                            fill="#fb8500"
                            onClick={() => handleClick('A')}
                        />
                        <Text
                            text="B"
                            x={(centerX - 150 - separation + centerX - 50 - separation) / 2 - 10 + 100}
                            y={(centerY - 50 + centerY + 20) / 2 - 20}
                            fontSize={16}
                            fontFamily="'Poppins', sans-serif"
                            fill="#fb8500"
                            onClick={() => handleClick('B')}
                        />
                        <Text
                            text="C"
                            x={(centerX - 250 - separation + centerX - 150 - separation) / 2 - 10 + 100}
                            y={(centerY + 50 + centerY - 75) / 2 - 20}
                            fontSize={16}
                            fontFamily="'Poppins', sans-serif"
                            fill="#fb8500"
                            onClick={() => handleClick('C')}
                        />

                        <Text
                            text="a"
                            x={centerX + 140 + separation + 44}
                            y={centerY - 70}
                            fontSize={16}
                            fontFamily="'Poppins', sans-serif"
                            fill="#fb8500"
                            onClick={() => handleClick('a')}
                        />
                        <Text
                            text="b"
                            x={centerX + 90 + separation + 40}
                            y={centerY + 105}
                            fontSize={16}
                            fontFamily="'Poppins', sans-serif"
                            fill="#fb8500"
                            onClick={() => handleClick('b')}
                        />
                        <Text
                            text="c"
                            x={centerX + 190 + separation + 52}
                            y={centerY + 105}
                            fontSize={16}
                            fontFamily="'Poppins', sans-serif"
                            fill="#fb8500"
                            onClick={() => handleClick('c')}
                        />
                    
                </Layer>
            </Stage>

            <div className="result-container">
                <div>
                    <h3>Valores de Delta</h3>
                    <p>A: {formatNumber(parseInput(A))}</p>
                    <p>B: {formatNumber(parseInput(B))}</p>
                    <p>C: {formatNumber(parseInput(C))}</p>
                </div>

                {result && (
                    <div>
                        <h3>Resultados de Estrella</h3>
                        <p>a: {formatNumber(result.a)}</p>
                        <p>b: {formatNumber(result.b)}</p>
                        <p>c: {formatNumber(result.c)}</p>
                    </div>
                )}
            </div>

            <div className="procedure">
    <h3>Procedimiento paso a paso:</h3>
    <ol>
        <li>
            <strong>Introducción de valores:</strong> Los valores ingresados son:
            <ul>
                <li>A = {formatNumber(parseInput(A))}</li>
                <li>B = {formatNumber(parseInput(B))}</li>
                <li>C = {formatNumber(parseInput(C))}</li>
            </ul>
        </li>
        <li>
            <strong>Cálculo de la resistencia en estrella:</strong>
            <br />
            <code>a = (B * C) / (A + B + C) = ({formatNumber(parseInput(B))} * {formatNumber(parseInput(C))}) / ({formatNumber(parseInput(A))} + {formatNumber(parseInput(B))} + {formatNumber(parseInput(C))})</code>
            <br />
            <code>b = (C * A) / (A + B + C) = ({formatNumber(parseInput(C))} * {formatNumber(parseInput(A))}) / ({formatNumber(parseInput(A))} + {formatNumber(parseInput(B))} + {formatNumber(parseInput(C))})</code>
            <br />
            <code>c = (A * B) / (A + B + C) = ({formatNumber(parseInput(A))} * {formatNumber(parseInput(B))}) / ({formatNumber(parseInput(A))} + {formatNumber(parseInput(B))} + {formatNumber(parseInput(C))})</code>
        </li>
        <li>
            <strong>Visualización:</strong> Se muestra una representación visual del triángulo Delta con valores para A, B y C, así como la estrella con los valores a, b y c.
        </li>
    </ol>
</div>

        </div>
    );
};

export default DeltaToStarWithValues;
