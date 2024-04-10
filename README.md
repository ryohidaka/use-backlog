# use-backlog

[![npm version](https://badge.fury.io/js/use-backlog.svg)](https://badge.fury.io/js/use-backlog)
![build](https://github.com/ryohidaka/use-backlog/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/ryohidaka/use-backlog/graph/badge.svg?token=DCij5i7WBc)](https://codecov.io/gh/ryohidaka/use-backlog)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B6TVH92)

## Overview

React Hooks library for [Backlog](https://backlog.com/).

## Installation

You can install this library using npm:

```shell
npm install use-backlog
```

## Usage

Wrap your app with the `BacklogProvider` and provide `host` and `apiKey` property.

```tsx
import { BacklogProvider } from "use-backlog";

ReactDOM.render(
  <React.StrictMode>
    <BacklogProvider host="example.backlog.com" apiKey="{apiKey}">
      <App />
    </BacklogProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
```

Use the provided hooks to fetch Backlog data:

- useProjects
- useProject
- useIssues
- useIssue
- useMyself

```tsx
import { useProjects } from "use-backlog";

function App() {
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ul>
        {projects?.map((project) => <li key={project.id}>{project.name}</li>)}
      </ul>
    </>
  );
}

export default App;
```

## API

### Hooks

- `useProjects(params, swrConfig)` - Fetch multiple projects.

- `useProject(projectIdOrKey, swrConfig)` - Get a project.

- `useIssues(params, swrConfig)` - Get a list of issues in a project.

- `useIssue(issueIdOrKey, swrConfig)` - Get a issue.

- `useMyself(swrConfig)` - Get own information about user.

### BacklogProvider

The `BacklogProvider` component should be used to wrap your app.

## Link

- [Backlog](https://backlog.com/)
- [backlog-js](https://github.com/nulab/backlog-js)
- [Docs for Backlog API](https://developer.nulab.com/docs/backlog)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
