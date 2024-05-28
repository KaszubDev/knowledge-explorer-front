import React, { useEffect, useRef } from 'react'
import RelationGraph from 'relation-graph-react'
import type { MutableRefObject} from 'react'
import type {
  RGLine,
  RGLink,
  RGNode,
  RGNodeSlotProps,
  RGOptions,
  RelationGraphExpose
} from 'relation-graph-react'
import { useNavigate } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GraphProps {
  baseWord: string | null
  synonyms: string[]
}

const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
  if (node.id === 'root') { // if rootNode
    return <div className='absolute left-0 top-0' style={{zIndex: 555, opacity: 0.5, lineHeight:'100px', width: '96px', height: '96px', color: '#000000', borderRadius:'50%', boxSizing: 'border-box', fontSize: '18px', textAlign: 'center', overflow: 'hidden'}}>
      <div style={{width: '100%', height: (node.data!.percent * 100) + '%', marginTop: ((1-node.data!.percent) * 100) + '%', background: 'linear-gradient(to bottom, #00FFFF, #FF00FF)'}}>
        {node.text}
      </div>
    </div>
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div style={{ lineHeight: '80px', textAlign: 'center' }}>
            <span>{node.text}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>{node.text}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};

const Graph: React.FC<GraphProps> = ({ baseWord, synonyms }) => {
  const graphRef = useRef() as MutableRefObject<RelationGraphExpose>
  const navigate = useNavigate()

  useEffect(() => {
    clearGraph()
    showGraph()
  }, [synonyms])

  const clearGraph = async (data = { rootId: '', nodes: [], lines: [] }) => {
    await graphRef.current?.setJsonData(data);
  };

  const showGraph = async () => {
    await graphRef.current.setJsonData({
      rootId: baseWord,
      nodes: [
        { id: 'root', text: baseWord, myicon: 'el-icon-star-on' },
        ...synonyms.map((synonym, index) => ({ id: `synonym-${index}`, text: synonym, myicon: 'el-icon-setting', styleClass: 'cursor-pointer' })),
      ],
      lines: synonyms.map((synonym, index) => ({ from: 'root', to: `synonym-${index}`, text: 'Synonym' })),
    }, (graphInstance) => {});
  };

  const options: RGOptions = {
    debug: false,
    defaultLineShape: 1,
    layout: {
      layoutName: 'center',
      maxLayoutTimes: 3000,
    },
    defaultExpandHolderPosition: 'right',
  };

  const onNodeClick = (node: RGNode, _e: MouseEvent | TouchEvent) => {
    navigate(`/searchDetail?query=${node.text}`)
    console.log('onNodeClick:', node.text)
    return true;
  };

  const onLineClick = (line: RGLine, _link: RGLink, _e: MouseEvent | TouchEvent) => {
    console.log('onLineClick:', line.text, line.from, line.to)
    return true;
  };

  return (
    <div className='w-full min-w-[1000px] mb-8' style={{ height: 'calc(100vh - 0px)' }}>
      <RelationGraph
        ref={graphRef}
        options={options}
        nodeSlot={NodeSlot}
        onNodeClick={onNodeClick}
        onLineClick={onLineClick}
      />
    </div>
  );
};

export default Graph
