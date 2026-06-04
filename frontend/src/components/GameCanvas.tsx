import { useState } from 'react';
import type { Node, Member } from '../types';

export default function GameCanvas() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  const loadTestTower = () => {
    setNodes([
      { id: 1, x: 500, y: 650 },
      { id: 2, x: 650, y: 650 },
      { id: 3, x: 500, y: 500 },
      { id: 4, x: 650, y: 500 },
      { id: 5, x: 500, y: 350 },
      { id: 6, x: 650, y: 350 },
      { id: 7, x: 500, y: 200 },
      { id: 8, x: 650, y: 200 }
    ]);

    setMembers([
      { id: 1, startNodeId: 1, endNodeId: 2, size: 'medium' },
      { id: 2, startNodeId: 3, endNodeId: 4, size: 'medium' },
      { id: 3, startNodeId: 5, endNodeId: 6, size: 'medium' },
      { id: 4, startNodeId: 7, endNodeId: 8, size: 'medium' },
      { id: 5, startNodeId: 1, endNodeId: 3, size: 'medium' },
      { id: 6, startNodeId: 3, endNodeId: 5, size: 'medium' },
      { id: 7, startNodeId: 5, endNodeId: 7, size: 'medium' },
      { id: 8, startNodeId: 2, endNodeId: 4, size: 'medium' },
      { id: 9, startNodeId: 4, endNodeId: 6, size: 'medium' },
      { id: 10, startNodeId: 6, endNodeId: 8, size: 'medium' },
      { id: 11, startNodeId: 1, endNodeId: 4, size: 'small' },
      { id: 12, startNodeId: 2, endNodeId: 3, size: 'small' },
      { id: 13, startNodeId: 3, endNodeId: 6, size: 'small' },
      { id: 14, startNodeId: 4, endNodeId: 5, size: 'small' },
      { id: 15, startNodeId: 5, endNodeId: 8, size: 'small' },
      { id: 16, startNodeId: 6, endNodeId: 7, size: 'small' }
    ]);

    setSelectedNodeId(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as Element).tagName === 'circle') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / 20) * 20;
    const y = Math.round((e.clientY - rect.top) / 20) * 20;
    setNodes(prev => [...prev, { id: prev.length + 1, x, y }]);
  };

  const handleNodeClick = (nodeId: number) => {
    if (selectedNodeId === null) return setSelectedNodeId(nodeId);
    if (selectedNodeId === nodeId) return setSelectedNodeId(null);

    setMembers(prev => [...prev, {
      id: prev.length + 1,
      startNodeId: selectedNodeId,
      endNodeId: nodeId,
      size: 'medium'
    }]);

    setSelectedNodeId(null);
  };

  const gridLines = [];
  for (let x = 0; x <= 2000; x += 20) gridLines.push(<line key={`vx-${x}`} x1={x} y1={0} x2={x} y2={2000} stroke="#1e293b" strokeWidth={1} />);
  for (let y = 0; y <= 2000; y += 20) gridLines.push(<line key={`hy-${y}`} x1={0} y1={y} x2={2000} y2={y} stroke="#1e293b" strokeWidth={1} />);

  return (
    <div className="app">
      <div className="sidebar">
        <h1>Structure</h1>
        <p>EIT Challenge #1</p>
        <button>Analyze</button>
        <button onClick={loadTestTower}>Load Test Tower</button>
        <hr />
        <p>Nodes: {nodes.length}</p>
        <p>Members: {members.length}</p>
        <p>Cost: ${members.length * 1000}</p>
      </div>
      <div className="canvas-container">
        <svg width="100%" height="100%" onClick={handleCanvasClick}>
          {gridLines}
          {members.map(member => {
            const start = nodes.find(n => n.id === member.startNodeId);
            const end = nodes.find(n => n.id === member.endNodeId);
            if (!start || !end) return null;
            return <line key={member.id} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#e2e8f0" strokeWidth={3} />;
          })}
          {nodes.map(node => (
            <circle key={node.id} cx={node.x} cy={node.y} r={7} fill={selectedNodeId === node.id ? '#facc15' : '#60a5fa'} onClick={(e) => { e.stopPropagation(); handleNodeClick(node.id); }} />
          ))}
        </svg>
      </div>
    </div>
  );
}
