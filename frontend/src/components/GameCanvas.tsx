import { useState } from 'react';
import type { Node, Member } from '../types';

export default function GameCanvas() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [members] = useState<Member[]>([]);

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = Math.round((e.clientX - rect.left) / 20) * 20;
    const y = Math.round((e.clientY - rect.top) / 20) * 20;

    setNodes(prev => [
      ...prev,
      {
        id: prev.length + 1,
        x,
        y,
      },
    ]);
  };

  const gridLines = [];

  for (let x = 0; x <= 2000; x += 20) {
    gridLines.push(
      <line key={`vx-${x}`} x1={x} y1={0} x2={x} y2={2000} stroke="#1e293b" strokeWidth={1} />
    );
  }

  for (let y = 0; y <= 2000; y += 20) {
    gridLines.push(
      <line key={`hy-${y}`} x1={0} y1={y} x2={2000} y2={y} stroke="#1e293b" strokeWidth={1} />
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h1>Structure</h1>

        <p>EIT Challenge #1</p>

        <button>Analyze</button>
        <button>Load Test Tower</button>

        <hr />

        <p>Nodes: {nodes.length}</p>
        <p>Members: {members.length}</p>
        <p>Cost: ${members.length * 1000}</p>
      </div>

      <div className="canvas-container">
        <svg
          width="100%"
          height="100%"
          onClick={handleCanvasClick}
        >
          {gridLines}

          {nodes.map(node => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={6}
              fill="#60a5fa"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
