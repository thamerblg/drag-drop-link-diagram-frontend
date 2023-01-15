import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDispatch } from "react-redux";
import { getAllPages } from "./JS/actions/pageActions";

import Sidebar from "./Sidebar";
import EditLabel from "./EditLabel";
import "./index.css";
import { useEffect } from "react";

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    // eslint-disable-next-line
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow/type");
      const icon = event.dataTransfer.getData("application/reactflow/icon");
      const color = event.dataTransfer.getData("application/reactflow/color");
      const form = event.dataTransfer.getData("application/reactflow/form");
      const link = event.dataTransfer.getData("application/reactflow/link");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        //className: `${type}`,
        style: {
          backgroundColor: color,
          borderRadius: form === "circular" ? "50%" : "4px",
        },
        type,
        position,
        data: {
          label: (
            <div>
              <img src={icon} alt="img_icon" />
              <EditLabel link={link} />
            </div>
          ),
        },
        ...nodeDefaults,
      };

      setNodes((nds) => nds.concat(newNode));
    }, // eslint-disable-next-line
    [reactFlowInstance]
  );

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getAllPages());
    }, // eslint-disable-next-line
    []
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            attributionPosition="bottom"
          ></ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
