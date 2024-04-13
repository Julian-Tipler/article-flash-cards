export const createCards = async (articleText) => {
  // TODO Need to figure out how to get user id
  const url =
    import.meta.env.VITE_FUNCTIONS_URL +
    "/cards/?userId=" +
    "00000000-0000-0000-0000-000000000000";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      body: JSON.stringify({
        content: articleText,
      }),
    });
    if (!response.ok) {
      throw new Error("API Call was not ok: " + response.statusText);
    }
    const { cardSetId } = await response.json();
    return { cardSetId };
  } catch (error) {
    console.error(error);
    return {};
  }
};
