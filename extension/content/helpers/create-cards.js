export const createCards = async () => {
  // TODO Need to figure out how to get user id
  const url =
    import.meta.env.VITE_API_URL +
    "/cards/" + "00000000-0000-0000-0000-000000000000";
  const success = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "mock article content",
    }),
  })
    .then((response) => response.ok)
    .catch(() => false);
};
