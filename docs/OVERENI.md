# Ověření — 20. října 2026

Aktuální cloudové prostředí: Node.js 24.19.0, Python 3.12.14, Chromium. Standardní sestavení a testy nevyžadují instalaci balíčků. Při původní přípravě prostředí byl ověřen čtecí přístup ke GitHubu a shoda checkoutu s větví main. Nyní jsou zdrojové soubory webu lokální necommitované změny.

## Provedeno

- `npm run build`: úspěšně vzniká statický výstup `dist/`.
- `npm test`: 5 testů prošlo, 0 selhání, 0 přeskočených. Testována UTM a zachování parametrů, blokování nákupu bez ceny/URL, datum předprodeje, bezpečný fallback z košíku i skutečné generování tří stavů nabídky v dočasném adresáři. Vyprodání vytváří správný účel upozornění a schema OutOfStock.
- HTTP: hlavní stránka, obálka a právní JSON vracejí 200 ze serveru spuštěného přes uložené instrukce.
- Chromium/Playwright: všechny obrázky se načtou, žádná chyba klientského JavaScriptu. Žádný horizontální přesah při 360, 390, 600, 768, 1024 a 1440 px. Vizuálně zkontrolováno desktopové a mobilní zobrazení.
- Klávesnice: první Tab zobrazí přeskočení na obsah, odkaz funguje; právní dialog otevře dokument, Escape jej zavře a fokus se vrátí na původní tlačítko. Základní uzamčení fokusu poskytuje nativní dialog.
- Rozbalení obsahu zobrazí všech 16 kapitol; druhá ukázka se otevře; všechny lokální kotvy existují.
- `prefers-reduced-motion: reduce`: plynulé rolování i čekající animace vypnuté.
- Vypnutý JavaScript: hlavní obsah a všechny tři karty kapitol jsou v HTML a viditelné.
- Newsletter bez konfigurace je deaktivovaný; nejsou předstírané objednávky, odběry ani recenze.
- axe-core (WCAG 2 A/AA a 2.1 A/AA): 0 automaticky zjištěných porušení na mobilní stránce i při otevřeném právním dialogu. To samo o sobě není úplný audit souladu WCAG.

## Lighthouse

Mobilní profil se simulovaným zpomalením, lokální Python server, bez produkční komprese a cache:

| Oblast | Skóre |
|---|---:|
| Výkon | 93 / 100 |
| Přístupnost | 100 / 100 |
| Doporučené postupy | 100 / 100 |
| SEO | 100 / 100 |

FCP přibližně 2,1 s, LCP přibližně 3,0 s v prvním měření. Skóre se liší podle běhu a hostingu. Zbývající doporučení souvisejí zejména s kompresí, cache a přenosem obrázků. V produkci ověřte opět po připojení domény a případné analytiky. Finální drobné změny copy/generování schématu prošly opět sestavením a testy.

## Co nebylo možné ověřit

Nejsou dodány skutečné prodejní a newsletter adresy ani cena. Nebyla provedena reálná objednávka, platba, přihlášení k newsletteru, double opt-in, odeslání e-mailu ani doručení. Přímý košíkový odkaz není ověřený, proto je vypnutý. Oficiální nápověda Shoptetu vracela HTTP 403; instrukce k administraci jsou výslovně orientační.

Web nebyl veřejně nasazen a DNS ani sociální metadata na skutečné doméně nebyla ověřena. Před publikací nastavte siteUrl, skutečné obchodní údaje a zkontrolované právní dokumenty. Právní šablony nejsou právní posudek. Dodané ilustrace nejsou fotografie autorky.

## Opakování

```sh
npm run build
npm test
npm start
```

Audit prohlížeče a Lighthouse byly spuštěny s dočasnými nástroji mimo repozitář; nejde o runtime závislosti webu. Pro jejich opakování použijte aktuální Playwright, Chromium, @axe-core/playwright a Lighthouse. Ověřujte lokální adresu pouze interně. Cloudový návrh ukládá install_script a start_skill; uložení návrhu není publikace ani důkaz obnovení prostředí v nové úloze.
