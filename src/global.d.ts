

declare module '*.scss' {
  interface IClassNames {
    [className: string] : string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare const __IS_DEV__: boolean;
declare const __API__: string;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
