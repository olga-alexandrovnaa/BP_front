import { ReactNode, createContext } from 'react';

export interface TestContextProps {
    test?: ReactNode;
    setTest?: (test: ReactNode) => void;
}

export const TestContext = createContext<TestContextProps>({});
