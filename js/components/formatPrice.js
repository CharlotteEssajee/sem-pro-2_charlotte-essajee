export default function formatPrice(price) {
  price = parseFloat(price);
  price = price.toFixed(2);
  price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
  return price;
}
