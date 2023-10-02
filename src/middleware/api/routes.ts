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
  GET_WORKSPACE_ROUTE = '/workspace/get-all-workspaces/',
  CREATE_WORKSPACE_ROUTE = '/workspace/create-workspace/',
}

export enum libraryRoutes {
  GET_PROMPTS = '/prompt/get-prompt-list-private/?page=1',
}
