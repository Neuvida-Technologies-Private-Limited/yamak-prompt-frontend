export enum authRoutes {
  LOGIN_ROUTE = '/access/login/',
  CSRF_TOKEN_ROUTE = '/access/csrf-token/',
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
  GET_WORKSPACE = '/workspace/get-workspace-info',
}

export enum libraryRoutes {
  GET_PROMPTS = '/prompt/get-prompt-list-private/?page=1',
}
