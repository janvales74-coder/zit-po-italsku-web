# Žít po italsku

Statický český onepager ke knize Lindy Valešové. HTML, CSS a malý JavaScript bez runtime závislostí. Sestavení používá pouze standardní knihovnu Node.js 22+; místní server Python 3. Obrázky i fonty jsou lokální.

```sh
cd /workspace/zit-po-italsku-web
npm run build
npm test
npm start
```

Server běží na portu 4173. Výstup pro hosting je výhradně adresář `dist/`. Instalace npm balíčků není nutná. Použijte existující checkout, nevytvářejte další worktree.

## Úpravy bez hledání v kódu

Všechny obsahové texty, barvy, cena, dostupnost a odkazy jsou v **config.mjs**. Prodejní adresa je na začátku v `SHOPTET_PRODUCT_URL`. Po změně spusťte `npm run build`. Do konfigurace nikdy nevkládejte API klíče ani jiné tajné údaje; jde o veřejný web.

- `product.availability`: `pripravujeme`, `skladem`, `predprodej`, `vyprodano`.
- `price`: číslo v Kč včetně DPH. `null` ponechá místo pro cenu. Nejde o částku potvrzenou autorkou.
- `dispatchDate`: u předprodeje datum `YYYY-MM-DD`; bez něj nákup není aktivní.
- `siteUrl`: konečná HTTPS adresa, nutná pro absolutní OG obrázek a canonical.
- `newsletter`: veřejný endpoint formuláře, skutečné názvy polí, případná veřejná skrytá pole, alternativně `fallbackEmail`. Žádný privátní API endpoint vyžadující klíč. `privacyReady: true` až po doplnění právního dokumentu.
- `authorPhoto`: cesta k vlastní fotografii. Ilustrace na webu nejsou vydávané za fotografie autorky.

Výchozí stránka je návrh před zahájením prodeje. Neodesílá e-maily, nevytváří objednávky ani nenačítá analytiku. Formulář je záměrně vypnutý, dokud není připraven jeho endpoint a informace o zpracování údajů. Při vyprodání vedou prodejní CTA na formulář upozornění s vlastním účelem `naskladneni`. U poskytovatele tento účel oddělte od běžných novinek. Žádný úspěch přihlášení se nepředstírá.

## Dokumentace

- [Obsah, vizuální návrh a podklady](docs/NAVRH.md)
- [Texty sekcí ke schválení](docs/TEXTY-KE-SCHVALENI.md)
- [Nasazení a domény](docs/NASAZENI.md)
- [Shoptet, právní šablony a seznam k doplnění](docs/PROPOJENI-A-PRAVO.md)
- [Ověření](docs/OVERENI.md)

`dekujeme.html` je výhradně šablona k přenesení do Shoptetu, ne potvrzení jakékoli objednávky. Právní kostry vznikají v `build.mjs` → `dist/legal.json`; před prodejem je nahraďte zkontrolovanými dokumenty, upravte označení pracovní šablony v generátoru a propojte podmínky e-shopu.
