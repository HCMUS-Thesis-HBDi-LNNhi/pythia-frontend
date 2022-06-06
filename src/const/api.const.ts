const GET = {
  loginWithGoogle: "/login?provider_id=google_oauth2",
  healthCheck: "/health_check",
  getPinnedCharts: (id: string) => `/users/${id}/pinned_charts`,
  getData: (id: string) => `/users/${id}/data_warehouse`,
  getRFMResult: (id: string) => `/users/${id}/rfm_result`,
};

const POST = {
  uploadFile: "/files",
  createPinnedChart: "/pinned_charts",
};

const DELETE = {
  deletePinnedChart: (id: string) => `/pinned_charts/${id}`,
};

const API = { GET, POST, DELETE };

export default API;
