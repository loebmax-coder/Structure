import { useState } from 'react';
import type { Node, Member } from '../types';

export default function GameCanvas() {
const [nodes,setNodes]=useState<Node[]>([]);
const [members,setMembers]=useState<Member[]>([]);
const [supports,setSupports]=useState<{nodeId:number,type:'fixed'|'pin'|'roller'}[]>([]);
const [activeTool,setActiveTool]=useState<'node'|'fixed'|'pin'|'roller'>('node');
const [selectedNodeId,setSelectedNodeId]=useState<number|null>(null);
const [analysisStatus,setAnalysisStatus]=useState<'pass'|'fail'|null>(null);
const [maxDrift,setMaxDrift]=useState<number|null>(null);

const handleAnalyze=()=>{const drift=Math.max(1,Math.round((members.length/Math.max(nodes.length,1))*10));setMaxDrift(drift);setAnalysisStatus(drift<12?'pass':'fail');};

const loadTestTower=()=>{setNodes([{id:1,x:500,y:650},{id:2,x:650,y:650},{id:3,x:500,y:500},{id:4,x:650,y:500},{id:5,x:500,y:350},{id:6,x:650,y:350},{id:7,x:500,y:200},{id:8,x:650,y:200}]);setMembers([{id:1,startNodeId:1,endNodeId:2,size:'medium'},{id:2,startNodeId:3,endNodeId:4,size:'medium'},{id:3,startNodeId:5,endNodeId:6,size:'medium'},{id:4,startNodeId:7,endNodeId:8,size:'medium'},{id:5,startNodeId:1,endNodeId:3,size:'medium'},{id:6,startNodeId:3,endNodeId:5,size:'medium'},{id:7,startNodeId:5,endNodeId:7,size:'medium'},{id:8,startNodeId:2,endNodeId:4,size:'medium'}]);setSupports([{nodeId:1,type:'pin'},{nodeId:2,type:'roller'}]);};

const handleCanvasClick=(e:React.MouseEvent<SVGSVGElement>)=>{if((e.target as Element).tagName==='circle')return;if(activeTool!=='node')return;const r=e.currentTarget.getBoundingClientRect();const x=Math.round((e.clientX-r.left)/20)*20;const y=Math.round((e.clientY-r.top)/20)*20;setNodes(p=>[...p,{id:p.length+1,x,y}]);};

const handleNodeClick=(nodeId:number)=>{
if(activeTool!=='node'){setSupports(p=>[...p.filter(s=>s.nodeId!==nodeId),{nodeId,type:activeTool as 'fixed'|'pin'|'roller'}]);return;}
if(selectedNodeId===null)return setSelectedNodeId(nodeId);
if(selectedNodeId===nodeId)return setSelectedNodeId(null);
setMembers(p=>[...p,{id:p.length+1,startNodeId:selectedNodeId,endNodeId:nodeId,size:'medium'}]);setSelectedNodeId(null);
};

const gridLines=[];for(let x=0;x<=2000;x+=20)gridLines.push(<line key={x} x1={x} y1={0} x2={x} y2={2000} stroke="#1e293b"/>);for(let y=0;y<=2000;y+=20)gridLines.push(<line key={`y${y}`} x1={0} y1={y} x2={2000} y2={y} stroke="#1e293b"/>);

return <div className='app'><div className='sidebar'><h1>Structure</h1><button onClick={handleAnalyze}>Analyze</button><button onClick={loadTestTower}>Load Test Tower</button><hr/><button onClick={()=>setActiveTool('node')}>Node Tool</button><button onClick={()=>setActiveTool('fixed')}>Fixed</button><button onClick={()=>setActiveTool('pin')}>Pin</button><button onClick={()=>setActiveTool('roller')}>Roller</button><p>Tool: {activeTool}</p><hr/><p>Nodes: {nodes.length}</p><p>Members: {members.length}</p><p>Supports: {supports.length}</p>{maxDrift!==null&&<p>Status: {analysisStatus}</p>}</div><div className='canvas-container'>{analysisStatus&&<div className={analysisStatus==='pass'?'banner-pass':'banner-fail'}>{analysisStatus.toUpperCase()}</div>}<svg width='100%' height='100%' onClick={handleCanvasClick}>{gridLines}{members.map(m=>{const s=nodes.find(n=>n.id===m.startNodeId);const e=nodes.find(n=>n.id===m.endNodeId);if(!s||!e)return null;return <line key={m.id} x1={s.x} y1={s.y} x2={e.x} y2={e.y} stroke='#e2e8f0' strokeWidth={3}/>;})}{supports.map((s,i)=>{const n=nodes.find(x=>x.id===s.nodeId);if(!n)return null;return <text key={i} x={n.x-10} y={n.y+25} fill='white' fontSize='14'>{s.type==='fixed'?'▉':s.type==='pin'?'△':'○○'}</text>;})}{nodes.map(n=><circle key={n.id} cx={n.x} cy={n.y} r={7} fill={selectedNodeId===n.id?'#facc15':'#60a5fa'} onClick={(e)=>{e.stopPropagation();handleNodeClick(n.id);}}/> )}</svg></div></div>;
}