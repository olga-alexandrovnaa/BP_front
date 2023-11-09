import { UserAuthDataForm } from "@/serviceEntities/User";
import cls from "./MainPage.module.scss";

import { useMemo } from "react";
import * as d3 from "d3";

const MARGIN = { top: 60, right: 60, bottom: 300, left: 1000 };

export type TreeNode = {
  type: "node";
  value: number;
  nameInfo: string;
  completeInfo: string;
  fieldsInfo: string;
  usersInfo: string;
  children: Tree[];
};

export type TreeLeaf = {
  type: "leaf";
  nameInfo: string;
  completeInfo: string;
  fieldsInfo: string;
  usersInfo: string;
  value: number;
};

export type Tree = TreeNode | TreeLeaf;

type DendrogramProps = {
  width: number;
  height: number;
  data: Tree;
};

function Dendogram({ width, height, data }: DendrogramProps) {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const hierarchy = useMemo(() => {
    return d3.hierarchy(data);
  }, [data]);

  const dendrogram = useMemo(() => {
    const dendrogramGenerator = d3
      .cluster<Tree>()
      .size([boundsWidth, boundsHeight]);
    return dendrogramGenerator(hierarchy);
  }, [hierarchy, width, height]);

  const descendantsForEdges = dendrogram.descendants();

  const descendants = dendrogram.descendants().reduce((result, item) => {
    return result.find((e) => e.data.value === item.data.value)
      ? result
      : [...result, item];
  }, []);

  for (const iterator of descendants) {
    if (iterator.data.type === "leaf") {
      const sisters = descendants.filter(
        (e) => e.parent && e.parent.data.value === iterator.parent.data.value
      );
      const min = sisters.reduce((res, item) => {
        if (res === null) {
          res = item.y;
        } else if (res > item.y) {
          res = item.y;
        }
        return res;
      }, null);

      if (min !== null) iterator.y = min;
    }
  }

  const allNodes = descendants.map((node) => {
    const sisters = descendants.filter(
      (e) => e.parent && e.parent?.data.value === node.parent?.data.value
    );

    let width = "400";
    let height = "200";
    let r = 12;
    let m = 0;

    if (sisters.length > 1) {
      width = "150";
      height = "600";
      r = 50;
      m = 35;
    }

    const h1 = node.y - r;
    const h2 = node.data.nameInfo ? node.y : h1;
    const h3 = node.data.nameInfo
      ? node.data.completeInfo
        ? node.y + r
        : h2
      : h1;
    const h4 = node.data.nameInfo
      ? node.data.completeInfo
        ? node.data.fieldsInfo
          ? node.y + r * 2
          : h3
        : h2
      : h1;

    return (
      <g key={"node" + node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r={10}
          stroke="transparent"
          fill={"#69b3a2"}
        />

        <line
          key={"line__" + node.id}
          fill="none"
          stroke="grey"
          x1={node.x + 10}
          y1={node.y - m}
          x2={node.x + 150}
          y2={node.y - m}
        />
        {!!node.data.nameInfo && (
          <switch>
            <foreignObject
              x={node.x + 10}
              y={h1}
              fontSize={14}
              width={width}
              height={height}
            >
              <p xmlns="http://www.w3.org/1999/xhtml">
                Название: {node.data.nameInfo}
              </p>
            </foreignObject>
          </switch>
        )}

        {!!node.data.completeInfo && (
          <switch>
            <foreignObject
              x={node.x + 10}
              y={h2}
              fontSize={14}
              width={width}
              height={height}
            >
              <p xmlns="http://www.w3.org/1999/xhtml">
                Выполнение: {node.data.completeInfo}
              </p>
            </foreignObject>
          </switch>
        )}
        {!!node.data.fieldsInfo && (
          <switch>
            <foreignObject
              x={node.x + 10}
              y={h3}
              fontSize={14}
              width={width}
              height={height}
            >
              <p xmlns="http://www.w3.org/1999/xhtml">
                Поля ввода: {node.data.fieldsInfo}
              </p>
            </foreignObject>
          </switch>
        )}

        {!!node.data.usersInfo && (
          <switch>
            <foreignObject
              x={node.x + 10}
              y={h4}
              fontSize={14}
              width={width}
              height={height}
            >
              <p xmlns="http://www.w3.org/1999/xhtml">
                Пользователи: {node.data.usersInfo}
              </p>
            </foreignObject>
          </switch>
        )}
      </g>
    );
  });

  const allEdges = [];

  for (const node of descendants) {
    const allCopies = descendantsForEdges.filter(
      (e) => e.data.value === node.data.value
    );

    console.log(allCopies);
    for (const copy of allCopies) {
      const p = copy.parent;
      if (!p) continue;

      const parent = descendants.find((e) => e.data.value === p.data.value);

      allEdges.push(
        <line
          key={"line" + node.id}
          fill="none"
          stroke="#69b3a2"
          x1={node.x}
          x2={parent.x}
          y1={node.y}
          y2={parent.y}
        />
      );
    }
  }

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allNodes}
          {allEdges}
        </g>
      </svg>
    </div>
  );
}

export default Dendogram;
