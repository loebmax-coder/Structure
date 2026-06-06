import React, { useState } from 'react';
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

    setAnalysisStatus(null);
  };

  const analyze = () => {
    setAnalysisStatus(members.length > 4 ? 'pass' : 'fail');
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: '#0f172a',
        color: 'white'
      }}
    >
      <div
        style={{
          width: 320,
          padding: 20,
          background: '#111827'
        }}
      >
        <h1>🏗 Structure</h1>

        <button onClick={loadTestTower}>
          Load Test Tower
        </button>

        <br />
        <br />

        <button onClick={analyze}>
          Analyze
        </button>

        <hr />

        <h3>Project</h3>

        <p>Height: 600 ft</p>
        <p>Wind: 115 mph</p>
        <p>Cost: $2.3M</p>
        <p>Schedule: 18 Months</p>

        <hr />

        <p>Nodes: {nodes.length}</p>
        <p>Members: {members.length}</p>

        {analysisStatus && (
          <h2
            style={{
              color:
                analysisStatus === 'pass'
                  ? '#22c55e'
                  : '#ef4444'
            }}
          >
            {analysisStatus.toUpperCase()}
          </h2>
        )}
      </div>

      <svg
        width="100%"
        height="100%"
        style={{
          background: '#0f172a'
        }}
      >
        {/* Roof Load */}

        <line
          x1="250"
          y1="120"
          x2="250"
          y2="180"
          stroke="red"
          strokeWidth="4"
        />

        <polygon
          points="240,170 260,170 250,190"
          fill="red"
        />

        <text
          x="270"
          y="160"
          fill="red"
          fontSize="18"
        >
          500 k
        </text>

        {/* Reactions */}

        <line
          x1="200"
          y1="540"
          x2="200"
          y2="500"
          stroke="lime"
          strokeWidth="4"
        />

        <line
          x1="300"
          y1="540"
          x2="300"
          y2="500"
          stroke="lime"
          strokeWidth="4"
        />

        {members.map((member) => {
          const start = nodes.find(
            n => n.id === member.startNodeId
          );

          const end = nodes.find(
            n => n.id === member.endNodeId
          );

          if (!start || !end) return null;

          return (
            <line
              key={member.id}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="white"
              strokeWidth={4}
            />
          );
        })}

        {nodes.map(node => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={8}
            fill="#60a5fa"
          />
        ))}
      </svg>
    </div>
  );
}
