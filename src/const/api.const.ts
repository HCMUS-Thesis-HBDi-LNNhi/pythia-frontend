const GET = {
  loginWithGoogle: (redirect_url: string) =>
    `/authorize?provider_id=google_oauth2&redirect_url=${redirect_url}`,
};

const POST = {};

const API = { GET, POST };

export default API;
