import test from 'node:test';
import assert from 'node:assert/strict';
import {shopLink} from '../commerce.mjs';
const product={price:449,availability:'skladem',checkoutMode:'product'};
test('všechny prodejní odkazy mají jednotné UTM a zachovají parametry produktu',()=>{
 for(const placement of ['header','hero','order','mobile','schema']){
 const url=new URL(shopLink('https://obchod.example/kniha/?variantId=42',product,placement));
 assert.equal(url.searchParams.get('utm_content'),placement);assert.equal(url.searchParams.get('utm_source'),'onepager');assert.equal(url.searchParams.get('utm_medium'),'web');assert.equal(url.searchParams.get('utm_campaign'),'zit-po-italsku');assert.equal(url.searchParams.get('variantId'),'42');
 }
});
test('bez URL, ceny, při přípravě a vyprodání nelze nabízet falešný nákup',()=>{
 assert.equal(shopLink('',product,'hero'),'');
 for(const availability of ['pripravujeme','vyprodano'])assert.equal(shopLink('https://shop.example/',{...product,availability},'hero'),'');
 assert.equal(shopLink('https://shop.example/',{...product,price:null},'hero'),'');
});
test('předprodej potřebuje datum expedice',()=>{
 assert.equal(shopLink('https://shop.example/',{...product,availability:'predprodej'},'hero'),'');
 assert.ok(shopLink('https://shop.example/',{...product,availability:'predprodej',dispatchDate:'2026-12-01'},'hero'));
});
test('košík bez ověřené URL zachová produktovou kartu, HTTP odmítne',()=>{
 assert.match(shopLink('https://shop.example/product',{...product,checkoutMode:'cart'},'hero'),/\/product\?/);
 assert.throws(()=>shopLink('http://shop.example',product,'hero'),/HTTPS/);
 assert.match(shopLink('https://shop.example/product',{...product,checkoutMode:'cart',verifiedCartUrl:'https://shop.example/verified-cart'},'hero'),/verified-cart/);
});
