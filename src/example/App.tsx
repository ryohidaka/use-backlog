import { useState } from "react";
import { useBacklog, useProjects } from "..";

function App() {
  const initialHost = import.meta.env.VITE_BACKLOG_HOST ?? "";
  const initialApiKey = import.meta.env.VITE_BACKLOG_APIKEY ?? "";

  const [host, setHost] = useState<string>(initialHost);
  const [apiKey, setApiKey] = useState<string>(initialApiKey);

  const { setConfig } = useBacklog();

  const { projects } = useProjects();

  const save = () => {
    setConfig?.({ host, apiKey });
  };

  return (
    <div>
      <h1>useBacklog()</h1>

      <section>
        <h3>Backlog Config</h3>
        <div>
          <label htmlFor="host">Host</label>
          <input
            name="host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="api-key">API Key</label>
          <input
            name="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <button onClick={save}>Save</button>
      </section>

      <section>
        <h3>Projects</h3>
        {projects && (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
