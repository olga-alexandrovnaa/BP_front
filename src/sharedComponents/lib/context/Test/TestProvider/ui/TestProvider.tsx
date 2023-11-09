import { TestContext } from '@/sharedComponents/lib/context/Test/TestContext';
import { ReactNode, useMemo, useState } from 'react';

interface TestProviderProps {
  children?: ReactNode;
}

const TestProvider = (props: TestProviderProps) => {
  const {
    children,
  } = props;

  const { Provider } = (TestContext);

  const [test, setTest] = useState<ReactNode>(null);

  const defaultProps = useMemo(
    () => ({
      test,
      setTest,
    }),
    [test],
);

  return (
    <Provider value={defaultProps}>
      {children}
    </Provider>
  );
};

export default TestProvider;