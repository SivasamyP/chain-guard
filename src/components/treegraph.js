import React from 'react';
import ReactD3Tree from 'react-d3-tree';
import treeData from '../mockdata/heirarchyData.json';

const TreeGraph = () => {

    const getNodeColor = (nodeDatum) => {
        // Example dynamic color assignment based on the name of the node
        if (nodeDatum.overAllRisk === 'High') {
          return 'red';  // Parent node color
        } else if (nodeDatum.overAllRisk === 'Medium') {
          return 'orange';
        } else if (nodeDatum.overAllRisk === 'Low') {
          return 'green';
        } else {
          return 'lightgray';  // Default color for other nodes
        }
      };

  const containerStyles = {
    width: '100%',
    height: '500px'
  };

  const nodeSize = { x: 150, y: 50 };

  return (
    <div style={containerStyles}>
      <ReactD3Tree
        data={treeData}
        orientation="horizontal" // Render the tree from left to right
        renderCustomNodeElement={({ nodeDatum }) => (
          <g>
            <circle r="10" fill={getNodeColor(nodeDatum) } stroke="none"/>
            <text  textAnchor="middle" dy="25" fontWeight="normal" fontSize="12" textDecoration="none">
              {nodeDatum.name}
            </text>
          </g>
        )}
        nodeSize={nodeSize} // Adjust node size here
      />
    </div>
  );
};

export default TreeGraph;
