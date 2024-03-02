interface ILayout {
  children?: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  return <>{children}</>;
};
