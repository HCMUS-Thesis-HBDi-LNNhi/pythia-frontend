const GET = {
  loginWithGoogle: "/login?provider_id=google_oauth2",
  healthCheck: "/health_check",
  getPinnedCharts: (id: string) => `/users/${id}/pinned_charts`,
  getData: (id: string) => `/users/${id}/data_warehouse`,
  getRFMResult: (id: string) => `/users/${id}/rfm_result`,
  getBGNBDResult: (id: string) => `/users/${id}/bg_nbd_result`,
  getPotentialityResult: (id: string) => `/users/${id}/classification_result`,
};

const POST = {
  createPinnedChart: "/pinned_charts",
  uploadFile: "/files",
  uploadClassifyData: (id: string) => `/users/${id}/classify_customers`,
  triggerModels: (id: string) => `/users/${id}/trigger_models`,
};

const DELETE = {
  deletePinnedChart: (id: string) => `/pinned_charts/${id}`,
};

const API = { GET, POST, DELETE };

export default API;
