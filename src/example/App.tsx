import { useState } from "react";
import { useBacklog, useIssue, useIssues, useProject, useProjects } from "..";
import { Preview } from "./Preview";
import { useMyself } from "@/hooks/user";

function App() {
  const initialHost = import.meta.env.VITE_BACKLOG_HOST ?? "";
  const initialApiKey = import.meta.env.VITE_BACKLOG_APIKEY ?? "";

  const [host, setHost] = useState<string>(initialHost);
  const [apiKey, setApiKey] = useState<string>(initialApiKey);

  const { setConfig } = useBacklog();

  const { projects } = useProjects();
  const projectId = projects ? projects[0]?.id : 0;
  const { project } = useProject(projectId);

  const { issues } = useIssues({ count: 3 });

  const issueId = issues ? issues[0]?.id : 0;
  const { issue } = useIssue(issueId);

  const { myself } = useMyself();

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

      <section>
        <h3>Project</h3>
        {project && <Preview value={project} />}
      </section>

      <section>
        <h3>Issues</h3>
        {issues && (
          <ul>
            {issues.map((issue) => (
              <li key={issue.id}>{issue.summary}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Issue</h3>
        {issue && <Preview value={issue} />}
      </section>

      <section>
        <h3>Myself</h3>
        {myself && <Preview value={myself} />}
      </section>
    </div>
  );
}

export default App;
