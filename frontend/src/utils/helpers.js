export const parsePrice = (price) => {
  if (typeof price === 'number') {
    return price;
  }
  if (typeof price === 'string') {
    return parseFloat(price.replace(/[^\d.]/g, '')) || 0;
  }
  return 0;
};