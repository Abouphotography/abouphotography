const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders() };
  }

  const password = event.headers["x-admin-password"];
  if (password !== process.env.ADMIN_PASSWORD) {
    return {
      statusCode: 401,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "Non autorisé" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const store = getStore("avis-approuves");
  const { action, avis, key } = body;

  try {
    if (action === "approve" && avis) {
      const id = `avis-${Date.now()}`;
      await store.setJSON(id, { ...avis, _ts: Date.now() });
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify({ success: true, id }),
      };
    }

    if (action === "delete" && key) {
      await store.delete(key);
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify({ success: true }),
      };
    }

    return { statusCode: 400, body: JSON.stringify({ error: "Action invalide" }) };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: err.message }),
    };
  }
};

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-password",
  };
}
