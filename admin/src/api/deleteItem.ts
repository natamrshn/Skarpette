export const deleteItem = async (id: string) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const response = await fetch(`http://localhost:5000/skarpette/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export const deleteFavItem = async (id: string) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const response = await fetch(`http://localhost:5000/new/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};