export const Preview = (value: any) => {
  const body = JSON.stringify(value, null, "\t");
  return <pre style={{ height: 200, overflow: "scroll" }}>{body}</pre>;
};
