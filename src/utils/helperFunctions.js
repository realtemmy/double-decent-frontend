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
