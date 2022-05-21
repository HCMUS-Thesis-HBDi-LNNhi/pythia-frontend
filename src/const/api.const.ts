const GET = {
  loginWithGoogle: "/login?provider_id=google_oauth2",
  healthCheck: "/health-check",
};

const POST = {
  uploadFile: "/files",
};

const API = { GET, POST };

export default API;
