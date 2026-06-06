import { useState } from 'react';
import type { Node, Member } from '../types';

export default function GameCanvas() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [analysisStatus, setAnalysisStatus] = useState<'pass' | 'fail' | null>(null);

  const loadTestTower = () => {
    setNodes([
      { id: 1, x: 200, y: 500 },
      { id: 2, x: 300, y: 500 },
      { id: 3, x: 200, y: 350 },
      { id: 4, x: 300, y: 350 },
      { id: 5, x: 250, y: 200 }
    ]);

    setMembers([
      { id: 1, startNodeId: 1, endNodeId: 2, size: 'medium' },
      { id: 2, startNodeId: 1, endNodeId: 3, size: 'medium' },
      { id: 3, startNodeId: 2, endNodeId: 4, size: 'medium' },
      { id: 4, startNodeId: 3, endNodeId: 4, size: 'medium' },
      { id: 5, startNodeId: 3, endNodeId: 5, size: 'medium' },
      { id: 6, startNodeId: 4, endNodeId: 5, size: 'medium' }
    ]);
  };

  const analyze = () => {
    setAnalysisStatus(members.length > 4 ? 'pass' : 'fail');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: 260, padding: 16, background: '#111827', color: 'white' }}>
        <h1>Structure</h1>
        <button onClick={loadTestTower}>Load Test Tower</button>
        <br /><br />
        <button onClick={analyze}>Analyze</button>

        <p>Nodes: {nodes.length}</p>
        <p>Members: {members.length}</p>

        {analysisStatus && (
          <h2 style={{ color: analysisStatus === 'pass' ? 'lime' : 'red' }}>
            {analysisStatus.toUpperCase()}
          </h2>
        )}
      </div>

      <svg width="100%" height="100%" style={{ background: '#0f172a' }}>
        {members.map((member) => {
          const start = nodes.find(n => n.id === member.startNodeId);
          const end = nodes.find(n => n.id === member.endNodeId);

          if (!start || !end) return null;

          return (
            <line
              key={member.id}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="white"
              strokeWidth={3}
            />
          );
        })}

        {nodes.map((node) => (
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
  );
}
