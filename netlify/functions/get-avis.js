const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    const store = getStore("avis-approuves");
    const { blobs } = await store.list();

    const avis = await Promise.all(
      blobs.map(async ({ key }) => {
        const data = await store.get(key, { type: "json" });
        return { ...data, _key: key };
      })
    );

    avis.sort((a, b) => (b._ts || 0) - (a._ts || 0));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(avis),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
