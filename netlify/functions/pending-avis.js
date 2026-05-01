exports.handler = async (event) => {
  const password = event.headers["x-admin-password"];
  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ error: "Non autorisé" }) };
  }

  const formId = process.env.AVIS_FORM_ID;
  const token  = process.env.NETLIFY_API_TOKEN;

  try {
    const res = await fetch(
      `https://api.netlify.com/api/v1/forms/${formId}/submissions?per_page=100`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const submissions = await res.json();

    const formatted = submissions.map((s) => ({
      id:       s.id,
      texte:    s.data.avis || s.data.texte || "",
      nom:      s.data.nom  || "Anonyme",
      occasion: s.data.occasion || "",
      note:     parseInt(s.data.note) || 5,
      date:     s.created_at,
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatted),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
