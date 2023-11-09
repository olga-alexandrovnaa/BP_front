import { ReactNode, useContext } from "react";
import { TestContext } from "../TestContext";

interface UseThemeResult {
  toggleTest: (newTheme: ReactNode) => void;
  test: ReactNode;
}

export const useTest = (): UseThemeResult => {
  const { test, setTest } = useContext(TestContext);

  const toggleTest= (newTheme: ReactNode) => {
    setTest?.(newTheme);
  };

  return {
      test: test,
      toggleTest,
  };
};




//в коде const { test, toggleTest } = useTest();
