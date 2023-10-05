export enum authRoutes {
  LOGIN_ROUTE = '/access/login/',
  CSRF_TOKEN_ROUTE = '/access/csrf-token/',
  REFRESH_ACCESS_TOKEN_ROUTE = 'access/refresh/',
}

export enum keyManagementRoutes {
  LLM_PROVIDERS = '/key/llm-providers/',
  CREATE_KEY_ROUTE = '/key/create_key/',
  KEY_LIST_ROUTE = '/key/get_key_list/',
  DELETE_KEY_ROUTE = '/key/',
  TEST_CONNECTION_ROUTE = 'key/test-connection/',
}

export enum workspaceRoutes {
  GET_WORKSPACES_ROUTE = '/workspace/get-all-workspaces/',
  CREATE_WORKSPACE_ROUTE = '/workspace/create-workspace/',
  GET_WORKSPACE_INFO_ROUTE = '/workspace/get-workspace-info',
  DELETE_WORKSPACE_ROUTE = '/workspace/',
  GENERATE_OUTPUT_ROUTE = 'workspace/generate-output/',
}

export enum libraryRoutes {
  GET_PROMPTS = '/prompt/get-prompt-list-private/?page=1',
  CREATE_PROMPT = '/prompt/',
  DELETE_PROMPT = '/prompt/',
  GET_PROMPT = '/prompt/',
  SEARCH_PROMPT = '/prompt/search-prompt/?q=',
  UPDATE_PROMPT = '/prompt/',
}
