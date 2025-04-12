declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.png' {
  const content: string;
  export default content;
} 