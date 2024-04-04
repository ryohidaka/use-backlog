import { Backlog } from "backlog-js";

// Define a type for the configuration of Backlog
export type BacklogConfigure = {
  host: string; // The host URL of your Backlog space
  apiKey?: string; // Your API Key (optional)
  accessToken?: string; // Your access token (optional)
  timeout?: number; // Timeout for the requests (optional)
};

// Define a type for an instance of Backlog
export type BacklogInstance = InstanceType<typeof Backlog>;
