export const commaSeparatedPrice = (price) =>
  price != null
    ? `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : "";

export const slugTitleToString = (slug) => slug.replace(/-/g, " ");
