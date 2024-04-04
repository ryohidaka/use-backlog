import { BacklogConfigure, BacklogInstance } from "@/types";
import { Backlog } from "backlog-js";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

/**
 * Define the properties for the BacklogProvider component
 */
type Props = {
  children: ReactNode; // The child components that will have access to the Backlog API
};

/**
 * Create a context for providing the Backlog API to child components
 */
const BacklogContext = createContext<{
  backlog: BacklogInstance | null;
  setConfig?: Dispatch<SetStateAction<BacklogConfigure | undefined>>;
}>({ backlog: null });

/**
 * BacklogProvider is a React component that provides the Backlog API to its child components.
 * @param {object} props - The properties for the BacklogProvider component.
 * @param {ReactNode} props.children - The child components that will have access to the Backlog API.
 * @returns {JSX.Element} A provider component that provides the Backlog API to its child components.
 */
const BacklogProvider = ({ children }: Props) => {
  const [config, setConfig] = useState<BacklogConfigure | undefined>();

  const contextValue = useMemo(() => {
    if (!config) return { backlog: null, setConfig };
    const { host, apiKey } = config;

    // Create a new instance of the Backlog API with the provided host and API key
    const backlog = new Backlog({ host, apiKey });

    return { backlog, setConfig };
  }, [config]);

  // Provide the Backlog API to the child components
  return (
    <BacklogContext.Provider value={contextValue}>
      {children}
    </BacklogContext.Provider>
  );
};

/**
 * useBacklog is a custom hook that provides the Backlog API to the component where it's called.
 * It must be used within a BacklogProvider.
 * @returns {object} The context object containing the Backlog API instance and the setConfig function.
 * @throws {Error} If useBacklog is not used within a BacklogProvider.
 */
const useBacklog = () => {
  const context = useContext(BacklogContext);

  if (!context) {
    throw new Error("useBacklog must be used within a BacklogProvider.");
  }
  return context;
};

// Export the BacklogProvider and useBacklog
export { BacklogProvider, useBacklog };
