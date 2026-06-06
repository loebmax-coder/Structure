import React, { useState } from 'react';
import type { Node, Member } from '../types';
import { analyzeStructure } from '../solver/analyze';

export default function GameCanvas() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [analysisStatus, setAnalysisStatus] = useState<'pass' | 'fail' | null>(null);
  const [results, setResults] = useState<any>(null);

  const challenge = {
    name: 'Denver Office Tower',
    targetHeight: 600,
    windSpeed: 115,
  };

  const loadTestTower = () => {
    setNodes([
      { id: 1, x: 250, y: 650 },
      { id: 2, x: 400, y: 650 },

      { id: 3, x: 250, y: 500 },
      { id: 4, x: 400, y: 500 },

      { id: 5, x: 250, y: 350 },
      { id: 6, x: 400, y: 350 },

      { id: 7, x: 325, y: 200 },
    ]);

    setMembers([
      { id: 1, startNodeId: 1, endNodeId: 2, size: 'medium' },

      { id: 2, startNodeId: 1, endNodeId: 3, size: 'medium' },
      { id: 3, startNodeId: 2, endNodeId: 4, size: 'medium' },

      { id: 4, startNodeId: 3, endNodeId: 4, size: 'medium' },

      { id: 5, startNodeId: 3, endNodeId: 5, size: 'medium' },
      { id: 6, startNodeId: 4, endNodeId: 6, size: 'medium' },

      { id: 7, startNodeId: 5, endNodeId: 6, size: 'medium' },

      { id: 8, startNodeId: 5, endNodeId: 7, size: 'medium' },
      { id: 9, startNodeId: 6, endNodeId: 7, size: 'medium' },
    ]);

    setResults(null);
    setAnalysisStatus(null);
  };

  const analyze = () => {
    const r = analyzeStructure(members.length, challenge.targetHeight);

    setResults(r);
    setAnalysisStatus(r.pass ? 'pass' : 'fail');
  };

  const getMemberColor = (memberId: number) => {
    if (!results?.memberForces) return '#e5e7eb';

    const force = results.memberForces[memberId] ?? 0;

    if (force < 0) return '#ef4444'; // compression

    if (force > 0) return '#3b82f6'; // tension

    return '#9ca3af';
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: '#0f172a',
        color: 'white',
      }}
    >
      <div
        style={{
          width: 320,
          padding: 20,
          background: '#111827',
          borderRight: '1px solid #374151',
        }}
      >
        <h1>🏗 Structure</h1>

        <h3>{challenge.name}</h3>

        <p>Target Height: {challenge.targetHeight} ft</p>
        <p>Wind Speed: {challenge.windSpeed} mph</p>

        <hr />

        <button onClick={loadTestTower}>
          Load Test Tower
        </button>

        <br />
        <br />

        <button onClick={analyze}>
          Analyze
        </button>

        <hr />

        <p>Nodes: {nodes.length}</p>
        <p>Members: {members.length}</p>

        {results && (
          <>
            <hr />

            <h3>Analysis</h3>

            <p>Wind: {results.windMph} mph</p>
            <p>Cost: ${results.cost.toFixed(2)}M</p>
            <p>Schedule: {results.durationMonths} mo</p>
            <p>Drift: {results.driftRatio}</p>

            <h2>
              Score: {results.score}
            </h2>
          </>
        )}

        {analysisStatus && (
          <h2
            style={{
              color:
                analysisStatus === 'pass'
                  ? '#22c55e'
                  : '#ef4444',
            }}
          >
            {analysisStatus.toUpperCase()}
          </h2>
        )}
      </div>

      <svg
        width="100%"
        height="100%"
        style={{ background: '#0f172a' }}
      >
        <rect
          x="650"
          y="100"
          width="120"
          height="500"
          fill="rgba(59,130,246,0.12)"
        />

        <text
          x="680"
          y="140"
          fill="#60a5fa"
          fontSize="24"
        >
          WIND
        </text>

        <text
          x="670"
          y="190"
          fill="#60a5fa"
          fontSize="24"
        >
          →→→
        </text>

        <text
          x="670"
          y="260"
          fill="#60a5fa"
          fontSize="24"
        >
          →→→
        </text>

        <text
          x="670"
          y="330"
          fill="#60a5fa"
          fontSize="24"
        >
          →→→
        </text>

        <text
          x="670"
          y="400"
          fill="#60a5fa"
          fontSize="24"
        >
          →→→
        </text>

        <text
          x="670"
          y="470"
          fill="#60a5fa"
          fontSize="24"
        >
          →→→
        </text>

        {members.map((member) => {
          const start = nodes.find(
            n => n.id === member.startNodeId
          );

          const end = nodes.find(
            n => n.id === member.endNodeId
          );

          if (!start || !end) return null;

          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;

          return (
            <g key={member.id}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={getMemberColor(member.id)}
                strokeWidth={5}
              />

              {results?.memberForces && (
                <text
                  x={midX}
                  y={midY}
                  fill="white"
                  fontSize="14"
                >
                  {results.memberForces[member.id] ?? 0}k
                </text>
              )}
            </g>
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

        <text
          x="220"
          y="700"
          fill="#22c55e"
          fontSize="18"
        >
          PIN
        </text>

        <text
          x="390"
          y="700"
          fill="#22c55e"
          fontSize="18"
        >
          ROLLER
        </text>
      </svg>
    </div>
  );
}
