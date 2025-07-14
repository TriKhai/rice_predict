import React from "react";
import ReactFlow, {
  Background,
  Controls,
} from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

interface DecisionTreeSklearnProps {
  treeText: string;
}

interface TreeNode {
  name: string;
  children: TreeNode[];
}

// Phân tích format `|---` của sklearn
function parseSklearnTree(treeText: string): TreeNode[] {
  const lines = treeText.trim().split("\n");
  const rootNodes: TreeNode[] = [];
  const stack: { level: number; node: TreeNode }[] = [];

  for (const line of lines) {
    const match = line.match(/^((\| {3})*)(\|--- )(.+)$/);
    if (!match) continue;

    const indent = (match[1]?.match(/\| {3}/g) || []).length;
    const name = match[4].trim();


    const level = indent;
    const newNode: TreeNode = { name, children: [] };

    if (level === 0) {
      rootNodes.push(newNode);
      stack.length = 0;
      stack.push({ level, node: newNode });
    } else {
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].node;
      parent.children.push(newNode);
      stack.push({ level, node: newNode });
    }
  }

  return rootNodes;
}

// Tạo nodes & edges
function treeToFlowElements(
  tree: TreeNode[],
  level = 0,
  xOffset = 0,
  parentId: string | null = null,
  acc: { nodes: Node[]; edges: Edge[]; count: number; nextX: number } = {
    nodes: [],
    edges: [],
    count: 0,
    nextX: 0,
  }
): { nodes: Node[]; edges: Edge[] } {
  for (const node of tree) {
    const id = `node-${acc.count++}`;

    // Tạm tính vị trí x dựa vào thứ tự node để dàn đều
    const x = acc.nextX * 200;
    const y = level * 140;

    acc.nextX += 1;

    acc.nodes.push({
      id,
      data: { label: node.name },
      position: { x, y },
      style: {
        padding: 10,
        background: node.name.startsWith("class") ? "#16a34a" : "#3b82f6",
        color: "white",
        borderRadius: 10,
        fontWeight: "bold",
        minWidth: 160,
        textAlign: "center",
      },
    });

    if (parentId) {
      acc.edges.push({
        id: `edge-${parentId}-${id}`,
        source: parentId,
        target: id,
        type: "smoothstep",
        animated: false,
        style: { stroke: "#94a3b8" },
      });
    }

    if (node.children.length > 0) {
      treeToFlowElements(node.children, level + 1, xOffset, id, acc);
    }
  }

  return { nodes: acc.nodes, edges: acc.edges };
}


const DecisionTreeSklearn: React.FC<DecisionTreeSklearnProps> = ({ treeText }) => {
  const tree = parseSklearnTree(treeText);
  const { nodes, edges } = treeToFlowElements(tree);

  return (
    <div className="max-w-6xl mx-auto mt-6 p-6 bg-gray-100 dark:bg-[#0f1727] rounded-xl">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Sơ đồ cây quyết định</h3>
      <div style={{ width: "100%", height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          panOnDrag
          nodesDraggable={false}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DecisionTreeSklearn;
