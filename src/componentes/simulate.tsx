import React, { useState, useRef } from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import Konva from "konva";
import EditResistorModal from './EditResistorModal';  
interface Resistor {
    id: number;
    x: number;
    y: number;
    value: number;
    name: string;
}

const Simulate: React.FC = () => {
    const [resistors, setResistors] = useState<Resistor[]>([]); 
    const [nextId, setNextId] = useState(1);
    const [editing, setEditing] = useState(false);
    const [currentResistor, setCurrentResistor] = useState<Resistor | null>(null);  
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });  

    const stageRef = useRef<any>(null);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();  
        const zoomChange = e.deltaY < 0 ? 0.1 : -0.1;  
        setZoom((prevZoom) => Math.min(Math.max(prevZoom + zoomChange, 0.1), 3));  
    };

    const addResistor = () => {
        setResistors([
            ...resistors,
            { id: nextId, x: 100, y: 100, value: 10, name: `R${nextId}` },
        ]);
        setNextId(nextId + 1);
    };

    const handleDblClick = (resistor: Resistor) => {
        setCurrentResistor(resistor);
        setEditing(true);  
    };

    const updateResistor = (id: number, newName: string, newValue: number) => {
        setResistors(resistors.map((resistor) =>
            resistor.id === id
                ? { ...resistor, name: newName, value: newValue }
                : resistor
        ));
        setEditing(false);  
    };

    const margin = 50;
    const gridWidth = window.innerWidth * 2;  
    const gridHeight = window.innerHeight * 2;

    const handleDragMove = (e: any) => {
        setOffset({
            x: e.target.x(),
            y: e.target.y(),
        });
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }} onWheel={(e) => handleWheel(e as React.WheelEvent<HTMLDivElement>)}>
            <h2>Simulación de Circuito</h2>
            <button onClick={addResistor} style={{ marginBottom: "20px" }}>
                Agregar Resistencia
            </button>

            {editing && currentResistor && (
                <EditResistorModal
                    isOpen={editing}
                    onRequestClose={() => setEditing(false)}
                    currentName={currentResistor.name}
                    currentValue={currentResistor.value}
                    onUpdateResistor={(name, value) => updateResistor(currentResistor.id, name, value)}
                />
            )}

            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                ref={stageRef}
                draggable
                onDragMove={handleDragMove}  
                offsetX={offset.x}
                offsetY={offset.y}
            >
                <Layer>
                    <Rect
                        x={margin}  
                        y={margin}  
                        width={gridWidth}  
                        height={gridHeight}  
                        fill="white" 
                    />

                    <Group
                        scaleX={zoom}
                        scaleY={zoom}
                        offsetX={0}  
                        offsetY={0}  
                    >
                        {resistors.map((resistor) => (
                            <Group
                                key={resistor.id}
                                onDblClick={() => handleDblClick(resistor)}  clic
                            >
                                <Rect
                                    x={resistor.x}
                                    y={resistor.y}
                                    width={60}
                                    height={20}
                                    fill="gray"
                                    draggable
                                    onDragMove={(e) => {
                                        const x = Math.max(margin, Math.min(e.target.x(), gridWidth - 60));  
                                        const y = Math.max(margin, Math.min(e.target.y(), gridHeight - 20));  
                                        setResistors(resistors.map((r) =>
                                            r.id === resistor.id ? { ...r, x, y } : r
                                        ));
                                    }}  
                                />
                                <Text
                                    text={resistor.name}
                                    x={resistor.x + 5}
                                    y={resistor.y + 5}
                                    fontSize={12}
                                    fill="white"
                                />
                                <Text
                                    text={`${resistor.value} Ω`}
                                    x={resistor.x + 5}
                                    y={resistor.y + 15}
                                    fontSize={10}
                                    fill="white"
                                />
                            </Group>
                        ))}
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default Simulate;
