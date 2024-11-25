import React, { useState, useRef } from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import Konva from "konva";
import EditResistorModal from './EditResistorModal';  // Asegúrate de que la ruta sea correcta

// Definir el tipo para los resistores
interface Resistor {
    id: number;
    x: number;
    y: number;
    value: number;
    name: string;
}

const Simulate: React.FC = () => {
    const [resistors, setResistors] = useState<Resistor[]>([]); // Estado de resistores con el tipo definido
    const [nextId, setNextId] = useState(1);
    const [editing, setEditing] = useState(false);
    const [currentResistor, setCurrentResistor] = useState<Resistor | null>(null);  // Guardar la resistencia que se edita
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });  // Para el desplazamiento

    const stageRef = useRef<any>(null);

    // Función para manejar el evento de rueda (zoom)
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();  // Prevenir el comportamiento por defecto del scroll
        const zoomChange = e.deltaY < 0 ? 0.1 : -0.1;  // Cambiar el zoom
        setZoom((prevZoom) => Math.min(Math.max(prevZoom + zoomChange, 0.1), 3));  // Limitar el zoom
    };

    // Función para agregar una resistencia
    const addResistor = () => {
        setResistors([
            ...resistors,
            { id: nextId, x: 100, y: 100, value: 10, name: `R${nextId}` },
        ]);
        setNextId(nextId + 1);
    };

    // Función para manejar el doble clic y editar la resistencia
    const handleDblClick = (resistor: Resistor) => {
        setCurrentResistor(resistor);
        setEditing(true);  // Abrir el modal de edición
    };

    // Función para actualizar una resistencia
    const updateResistor = (id: number, newName: string, newValue: number) => {
        setResistors(resistors.map((resistor) =>
            resistor.id === id
                ? { ...resistor, name: newName, value: newValue }
                : resistor
        ));
        setEditing(false);  // Cerrar el modal después de actualizar
    };

    // Márgenes para los lados
    const margin = 50;
    const gridWidth = window.innerWidth * 2;  // Aumento el tamaño de la cuadrícula
    const gridHeight = window.innerHeight * 2;

    // Función para manejar el movimiento de arrastre
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

            {/* Modal para editar resistencia */}
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
                onDragMove={handleDragMove}  // Manejar el movimiento de la cuadrícula
                offsetX={offset.x}
                offsetY={offset.y}
            >
                <Layer>
                    {/* Fondo blanco con márgenes en todos los lados */}
                    <Rect
                        x={margin}  // Márgenes izquierdo
                        y={margin}  // Márgenes superior
                        width={gridWidth}  // Cuadrícula mayor al tamaño de la página
                        height={gridHeight}  // Cuadrícula mayor al tamaño de la página
                        fill="white"  // Fondo blanco
                    />

                    {/* Contenedor de los elementos con zoom */}
                    <Group
                        scaleX={zoom}
                        scaleY={zoom}
                        offsetX={0}  // No mover en el eje X (centrado)
                        offsetY={0}  // No mover en el eje Y (centrado)
                    >
                        {resistors.map((resistor) => (
                            <Group
                                key={resistor.id}
                                onDblClick={() => handleDblClick(resistor)}  // Agregar evento de doble clic
                            >
                                <Rect
                                    x={resistor.x}
                                    y={resistor.y}
                                    width={60}
                                    height={20}
                                    fill="gray"
                                    draggable
                                    onDragMove={(e) => {
                                        const x = Math.max(margin, Math.min(e.target.x(), gridWidth - 60));  // Limitar X
                                        const y = Math.max(margin, Math.min(e.target.y(), gridHeight - 20));  // Limitar Y
                                        setResistors(resistors.map((r) =>
                                            r.id === resistor.id ? { ...r, x, y } : r
                                        ));
                                    }}  // Limitar movimiento de las resistencias
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
