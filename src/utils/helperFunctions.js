export const commaSeparatedPrice = (price) =>
  price != null
    ? `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : "";

export const slugTitleToString = (slug) => slug.replace(/-/g, " ");

export const getPriceByLga = (lga) => {
  let price = 0;
  if (lga === "ikorodu") {
    price = 500;
  } else if (lga === "yaba") {
    price = 800;
  } else {
    price = 1000;
  }
  return price;
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Extract the day, month, weekday, and year
  const day = date.getDate(); // Day of the month
  const month = date.toLocaleString("en-US", { month: "short" }); // Short month name (e.g., Jan, Feb)
  const weekday = date.toLocaleString("en-US", { weekday: "short" }); // Short weekday name (e.g., Mon, Tue)
  const year = date.getFullYear(); // Year

  // Combine the parts into the desired format
  return `${day}, ${weekday} ${month} ${year}`;
};
