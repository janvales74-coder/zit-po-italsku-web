// Sdílená pravidla pro sestavení webu a testy. UTM přepisujeme jednotně.
export function shopLink(productUrl, product, placement) {
  if (!productUrl || !['skladem', 'predprodej'].includes(product.availability) || !Number.isFinite(product.price) || product.price <= 0) return '';
  if (product.availability === 'predprodej' && !/^\d{4}-\d{2}-\d{2}$/.test(product.dispatchDate)) return '';
  const url = new URL(product.checkoutMode === 'cart' && product.verifiedCartUrl ? product.verifiedCartUrl : productUrl);
  if (url.protocol !== 'https:') throw new Error('E-shop musí mít HTTPS adresu.');
  for (const [key, val] of Object.entries({utm_source:'onepager',utm_medium:'web',utm_campaign:'zit-po-italsku',utm_content:placement})) url.searchParams.set(key, val);
  return url.href;
}
