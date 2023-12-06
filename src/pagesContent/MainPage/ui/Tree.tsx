import cls from "./MainPage.module.scss";

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
  data: Tree;
};

function TreeItem({ data }: DendrogramProps) {


  return (
    <li>
      <span className="tf-nc">
        <p>Название: {data.nameInfo}</p>
        {!!data.completeInfo && <p>Выполнение: {data.completeInfo}</p>}
        {!!data.fieldsInfo && <p>Поля ввода: {data.fieldsInfo}</p>}
        {!!data.usersInfo && <p>Пользователи: {data.usersInfo}</p>}
      </span>
      {"children" in data && !!data.children.length ? (
        <ul>
          {data.children.map((e) => (
            <TreeItem data={e}/>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function TreeComponent({ data }: DendrogramProps) {
  return (
    <div className="tf-tree tf-gap-lg">
      <ul>
        <TreeItem data={data}/>
      </ul>
    </div>
  );
}

export default TreeComponent;
