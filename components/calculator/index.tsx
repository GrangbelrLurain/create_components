interface ICalculator extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Calculator({ children, ...props }: ICalculator) {
  return <div {...props}>{children}</div>;
}

export default Calculator;
