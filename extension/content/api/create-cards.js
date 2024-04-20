export const createCards = async (articleText, sessionToken) => {
  // TODO Need to figure out how to get user id
  const url = import.meta.env.VITE_FUNCTIONS_URL + "/cards";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify({
      content: articleText,
    }),
  });
  if (!response.ok) {
    throw new Error("API Call was not ok: " + response.statusText);
  }
  const { setId } = await response.json();
  return { setId };
};
