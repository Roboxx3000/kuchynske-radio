/* =====================================================================
   😊 ÚSMEV – obrazovka pre lepšiu náladu (tlačidlo „Úsmev“ nad hodinami)
   Načítava sa po hlavnom skripte v index.html a používa jeho pomocníkov
   ($, now, ymd, md, addDays, pad, esc, sk, CONFIG, HOLIDAYS, SCHOOL_BREAKS,
   sunTimes, MENINY, CAL_URL, CAL_KEY, famEvent, goPage).
   Obsah:  Dnes je … (medzinárodné dni, zdroj podklady/medzinarodne_dni.json)
           Víkendometer (CONFIG.vikend)  ·  Na čo sa tešiť  ·  Svetlo  ·  Nápad na dnes
   ===================================================================== */

/* ---------- medzinárodné dni (len veselé a neutrálne; vážne sa nezobrazujú) ---------- */
const DNI = /*DNI*/[{"datum":"01-04","nazov":"Svetový deň Braillovho písma","veta":"Braillovo písmo umožňuje nevidiacim čítať a písať hmatom.","ton":"neutrálny","osn":true},{"datum":"01-24","nazov":"Medzinárodný deň vzdelávania","veta":"Pripomína, že vzdelanie je základ rozvoja ľudí aj celých spoločností.","ton":"neutrálny","osn":true},{"datum":"01-26","nazov":"Medzinárodný deň čistej energie","veta":"Upozorňuje na výhody solárnej, veternej či vodnej energie pre ľudí i planétu.","ton":"neutrálny","osn":true},{"datum":"01-28","nazov":"Medzinárodný deň mierového spolunažívania","veta":"Vyzýva ľudí rôznych kultúr a presvedčení, aby žili vedľa seba v dobrom susedstve.","ton":"neutrálny","osn":true},{"datum":"02-02","nazov":"Svetový deň mokradí","veta":"Mokrade čistia vodu, zadržiavajú zrážky a poskytujú domov mnohým druhom vtákov a rastlín.","ton":"veselý","osn":true},{"datum":"02-04","nazov":"Medzinárodný deň ľudského bratstva","veta":"Pripomína, že ľudia rôznych náboženstiev a kultúr môžu žiť v spolupráci a úcte.","ton":"neutrálny","osn":true},{"datum":"02-10","nazov":"Svetový deň strukovín","veta":"Šošovica, hrach či cícer sú lacný a zdravý zdroj bielkovín.","ton":"veselý","osn":true},{"datum":"02-10","nazov":"Medzinárodný deň leoparda arabského","veta":"Leopard arabský patrí k najohrozenejším veľkým mačkovitým šelmám sveta.","ton":"neutrálny","osn":true},{"datum":"02-11","nazov":"Medzinárodný deň žien a dievčat vo vede","veta":"Podporuje rovnaké príležitosti pre ženy a dievčatá vo vede a technike.","ton":"neutrálny","osn":true},{"datum":"02-13","nazov":"Svetový deň rozhlasu","veta":"Rádio je lacné médium, ktoré sa dostane aj tam, kam internet nedosiahne.","ton":"veselý","osn":true},{"datum":"02-21","nazov":"Medzinárodný deň materinského jazyka","veta":"Chráni jazykovú rozmanitosť, lebo mnohé jazyky sveta postupne miznú.","ton":"neutrálny","osn":true},{"datum":"03-01","nazov":"Svetový deň morských tráv","veta":"Morské trávy zachytávajú uhlík a poskytujú úkryt množstvu morských živočíchov.","ton":"neutrálny","osn":true},{"datum":"03-03","nazov":"Svetový deň voľne žijúcich živočíchov","veta":"Oslavuje divoké zvieratá a rastliny a upozorňuje na ich ochranu.","ton":"veselý","osn":true},{"datum":"03-08","nazov":"Medzinárodný deň žien","veta":"Pripomína úspechy žien a boj za ich rovnoprávnosť.","ton":"neutrálny","osn":true},{"datum":"03-20","nazov":"Medzinárodný deň šťastia","veta":"Pripomína, že šťastie a pohoda ľudí sú dôležitým cieľom spoločnosti.","ton":"veselý","osn":true},{"datum":"03-20","nazov":"Deň francúzskeho jazyka","veta":"Oslavuje francúzštinu, jeden z oficiálnych jazykov OSN.","ton":"neutrálny","osn":true},{"datum":"03-21","nazov":"Svetový deň ľadovcov","veta":"Ľadovce sú zásobárňou sladkej vody a ich topenie ovplyvňuje celú planétu.","ton":"neutrálny","osn":true},{"datum":"03-21","nazov":"Medzinárodný deň lesov","veta":"Lesy dávajú drevo, čistia vzduch a sú domovom väčšiny suchozemských druhov.","ton":"veselý","osn":true},{"datum":"03-21","nazov":"Svetový deň poézie","veta":"Oslavuje básne a básnikov a podporuje jazykovú rozmanitosť.","ton":"veselý","osn":true},{"datum":"03-21","nazov":"Medzinárodný deň Nowruzu","veta":"Nowruz je tradičný nový rok spojený s príchodom jari, ktorý oslavujú milióny ľudí.","ton":"neutrálny","osn":true},{"datum":"03-21","nazov":"Svetový deň Downovho syndrómu","veta":"Upozorňuje na dôležitosť rovnakých príležitostí pre ľudí s Downovým syndrómom.","ton":"neutrálny","osn":true},{"datum":"03-22","nazov":"Svetový deň vody","veta":"Pripomína, že čistá pitná voda je základ života a nie je dostupná všade.","ton":"neutrálny","osn":true},{"datum":"03-23","nazov":"Svetový meteorologický deň","veta":"Pripomína prácu meteorológov, ktorí sledujú počasie a podnebie.","ton":"neutrálny","osn":true},{"datum":"03-30","nazov":"Medzinárodný deň nulového odpadu","veta":"Vyzýva predchádzať vzniku odpadu a využívať zdroje šetrnejšie.","ton":"neutrálny","osn":true},{"datum":"04-02","nazov":"Svetový deň povedomia o autizme","veta":"Podporuje porozumenie a prijatie ľudí s autizmom.","ton":"neutrálny","osn":true},{"datum":"04-05","nazov":"Medzinárodný deň svedomia","veta":"Vyzýva ľudí k tolerancii, porozumeniu a mierovému spolunažívaniu.","ton":"neutrálny","osn":true},{"datum":"04-06","nazov":"Medzinárodný deň športu pre rozvoj a mier","veta":"Šport spája ľudí a učí spolupráci, férovosti a rešpektu.","ton":"veselý","osn":true},{"datum":"04-07","nazov":"Svetový deň zdravia","veta":"Svetová zdravotnícka organizácia každý rok upozorňuje na jednu zdravotnú tému.","ton":"neutrálny","osn":true},{"datum":"04-12","nazov":"Medzinárodný deň ľudských letov do vesmíru","veta":"Pripomína prvý let človeka do vesmíru, ktorý absolvoval Jurij Gagarin v roku 1961.","ton":"veselý","osn":true},{"datum":"04-15","nazov":"Medzinárodný deň wellness","veta":"Upozorňuje na význam telesnej a duševnej pohody v každodennom živote.","ton":"veselý","osn":true},{"datum":"04-20","nazov":"Deň čínskeho jazyka","veta":"Oslavuje čínštinu, jeden z oficiálnych jazykov OSN.","ton":"neutrálny","osn":true},{"datum":"04-21","nazov":"Svetový deň tvorivosti a inovácií","veta":"Pripomína, že nové nápady môžu pomôcť riešiť problémy sveta.","ton":"veselý","osn":true},{"datum":"04-22","nazov":"Medzinárodný deň zazelenania planéty","veta":"Povzbudzuje k výsadbe stromov a obnove zelene.","ton":"veselý","osn":true},{"datum":"04-22","nazov":"Medzinárodný deň Matky Zeme","veta":"Pripomína, že o planétu sa treba starať, lebo je naším spoločným domovom.","ton":"veselý","osn":true},{"datum":"04-23","nazov":"Medzinárodný deň dievčat v IKT","veta":"Podporuje dievčatá, aby sa zaujímali o technológie a informatiku.","ton":"neutrálny","osn":true},{"datum":"04-23","nazov":"Svetový deň knihy a autorských práv","veta":"Oslavuje čítanie, knihy a prácu autorov.","ton":"veselý","osn":true},{"datum":"04-23","nazov":"Deň anglického jazyka","veta":"Oslavuje angličtinu, jeden z oficiálnych jazykov OSN.","ton":"neutrálny","osn":true},{"datum":"04-23","nazov":"Deň španielskeho jazyka","veta":"Oslavuje španielčinu, jeden z oficiálnych jazykov OSN.","ton":"neutrálny","osn":true},{"datum":"04-30","nazov":"Medzinárodný deň jazzu","veta":"Jazz spája ľudí hudbou, improvizáciou a slobodou.","ton":"veselý","osn":true},{"datum":"05-02","nazov":"Svetový deň tuniakov","veta":"Upozorňuje na udržateľný rybolov a ochranu tuniakov.","ton":"neutrálny","osn":true},{"datum":"05-03","nazov":"Svetový deň slobody tlače","veta":"Pripomína význam slobodných médií a ochranu novinárov.","ton":"neutrálny","osn":true},{"datum":"05-05","nazov":"Svetový deň portugalského jazyka","veta":"Oslavuje portugalčinu a jej kultúrne bohatstvo.","ton":"neutrálny","osn":true},{"datum":"05-10","nazov":"Medzinárodný deň argánie","veta":"Argánia je strom z Maroka, z ktorého sa získava vzácny olej.","ton":"veselý","osn":true},{"datum":"05-12","nazov":"Medzinárodný deň zdravia rastlín","veta":"Zdravé rastliny sú základom potravy, prírody aj poľnohospodárstva.","ton":"neutrálny","osn":true},{"datum":"05-15","nazov":"Medzinárodný deň rodiny","veta":"Pripomína, aká dôležitá je rodina pre spoločnosť a pre každého z nás.","ton":"veselý","osn":true},{"datum":"05-16","nazov":"Medzinárodný deň spoločného života v mieri","veta":"Vyzýva ľudí, aby žili spolu v zhode, porozumení a úcte.","ton":"neutrálny","osn":true},{"datum":"05-16","nazov":"Medzinárodný deň svetla","veta":"Svetlo pomáha vede, umeniu, zdraviu aj každodennému životu.","ton":"veselý","osn":true},{"datum":"05-17","nazov":"Svetový deň telekomunikácií a informačnej spoločnosti","veta":"Pripomína, ako internet a komunikačné technológie spájajú svet.","ton":"neutrálny","osn":true},{"datum":"05-19","nazov":"Svetový deň fair play","veta":"Podporuje férové správanie a rešpekt v športe aj v živote.","ton":"veselý","osn":true},{"datum":"05-20","nazov":"Svetový deň včiel","veta":"Včely opeľujú rastliny a bez nich by sme mali menej plodov.","ton":"veselý","osn":true},{"datum":"05-21","nazov":"Medzinárodný deň čaju","veta":"Čaj pije denne veľká časť sveta a je dôležitým zdrojom obživy pre milióny rodín.","ton":"veselý","osn":true},{"datum":"05-21","nazov":"Svetový deň kultúrnej rozmanitosti pre dialóg a rozvoj","veta":"Pripomína, že rôzne kultúry nás obohacujú.","ton":"neutrálny","osn":true},{"datum":"05-22","nazov":"Medzinárodný deň biologickej rozmanitosti","veta":"Pripomína, že rozmanitosť druhov je dôležitá pre zdravú planétu.","ton":"veselý","osn":true},{"datum":"05-24","nazov":"Medzinárodný deň kozorožca vrutorohého (markhora)","veta":"Markhor je divá koza z hôr Strednej a Južnej Ázie s točenými rohmi.","ton":"veselý","osn":true},{"datum":"05-25","nazov":"Svetový deň futbalu","veta":"Futbal spája ľudí na celom svete bez ohľadu na vek či krajinu.","ton":"veselý","osn":true},{"datum":"05-30","nazov":"Medzinárodný deň zemiaka","veta":"Zemiak je jedna z najdôležitejších plodín sveta a základ mnohých jedál.","ton":"veselý","osn":true},{"datum":"06-01","nazov":"Globálny deň rodičov","veta":"Oceňuje rodičov a ich zodpovednosť za výchovu detí.","ton":"veselý","osn":true},{"datum":"06-03","nazov":"Svetový deň bicykla","veta":"Bicykel je jednoduchý, lacný a ekologický dopravný prostriedok.","ton":"veselý","osn":true},{"datum":"06-05","nazov":"Svetový deň životného prostredia","veta":"Vyzýva ľudí, aby chránili prírodu a šetrne zaobchádzali s planétou.","ton":"neutrálny","osn":true},{"datum":"06-06","nazov":"Deň ruského jazyka","veta":"Oslavuje ruštinu, jeden z oficiálnych jazykov OSN.","ton":"neutrálny","osn":true},{"datum":"06-07","nazov":"Svetový deň bezpečnosti potravín","veta":"Pripomína, že bezpečné jedlo je základ zdravia.","ton":"neutrálny","osn":true},{"datum":"06-08","nazov":"Svetový deň oceánov","veta":"Oceány pokrývajú väčšinu planéty a produkujú veľkú časť kyslíka.","ton":"veselý","osn":true},{"datum":"06-10","nazov":"Medzinárodný deň dialógu medzi civilizáciami","veta":"Podporuje rozhovor a vzájomné porozumenie medzi kultúrami.","ton":"neutrálny","osn":true},{"datum":"06-11","nazov":"Medzinárodný deň hry","veta":"Hra je dôležitá pre zdravý vývin detí a prináša radosť v každom veku.","ton":"veselý","osn":true},{"datum":"06-13","nazov":"Medzinárodný deň povedomia o albinizme","veta":"Podporuje porozumenie a ochranu ľudí s albinizmom.","ton":"neutrálny","osn":true},{"datum":"06-14","nazov":"Svetový deň darcov krvi","veta":"Poďakovanie darcom krvi, ktorí pomáhajú zachraňovať životy.","ton":"neutrálny","osn":true},{"datum":"06-18","nazov":"Medzinárodný deň udržateľnej gastronómie","veta":"Oslavuje miestne jedlá, kulinárske tradície a šetrné využívanie surovín.","ton":"veselý","osn":true},{"datum":"06-21","nazov":"Medzinárodný deň jogy","veta":"Joga spája pohyb, dych a pokoj a pochádza z Indie.","ton":"veselý","osn":true},{"datum":"06-21","nazov":"Medzinárodný deň slnovratu","veta":"Oslavuje letný a zimný slnovrat, ktoré ľudia vnímali ako dôležité dni v roku.","ton":"neutrálny","osn":true},{"datum":"06-25","nazov":"Deň námorníkov","veta":"Oceňuje námorníkov, ktorí zabezpečujú väčšinu svetového obchodu.","ton":"neutrálny","osn":true},{"datum":"06-27","nazov":"Medzinárodný deň hluchoslepoty","veta":"Upozorňuje na ľudí, ktorí majú zároveň poškodený zrak aj sluch.","ton":"neutrálny","osn":true},{"datum":"06-27","nazov":"Deň mikro, malých a stredných podnikov","veta":"Oceňuje malé podniky, ktoré tvoria väčšinu firiem na svete.","ton":"neutrálny","osn":true},{"datum":"06-29","nazov":"Medzinárodný deň trópov","veta":"Tropické oblasti sú domovom veľkej časti obyvateľov i druhov planéty.","ton":"neutrálny","osn":true},{"datum":"06-30","nazov":"Medzinárodný deň asteroidov","veta":"Upozorňuje na asteroidy a na význam sledovania blízkozemských telies.","ton":"veselý","osn":true},{"datum":"07-05","nazov":"Medzinárodný deň družstiev","veta":"Družstvá pomáhajú ľuďom spoločne podnikať a zlepšovať svoj život.","ton":"neutrálny","osn":true},{"datum":"07-06","nazov":"Svetový deň rozvoja vidieka","veta":"Upozorňuje na dôležitosť života a práce na vidieku.","ton":"neutrálny","osn":true},{"datum":"07-07","nazov":"Svetový deň svahilčiny","veta":"Svahilčinou sa dorozumievajú desiatky miliónov ľudí vo východnej Afrike.","ton":"neutrálny","osn":true},{"datum":"07-11","nazov":"Svetový deň koňa","veta":"Kôň je človeku spoločníkom a pomocníkom už tisícročia.","ton":"veselý","osn":true},{"datum":"07-12","nazov":"Medzinárodný deň nádeje","veta":"Pripomína silu nádeje a spolupráce v ťažkých časoch.","ton":"neutrálny","osn":true},{"datum":"07-15","nazov":"Svetový deň zručností mládeže","veta":"Podporuje mladých ľudí, aby získavali zručnosti pre prácu a život.","ton":"neutrálny","osn":true},{"datum":"07-18","nazov":"Medzinárodný deň Nelsona Mandelu","veta":"Pripomína odkaz Nelsona Mandelu a výzvu pomáhať druhým.","ton":"neutrálny","osn":true},{"datum":"07-20","nazov":"Svetový deň šachu","veta":"Šach rozvíja myslenie a spája hráčov z celého sveta.","ton":"veselý","osn":true},{"datum":"07-20","nazov":"Medzinárodný deň Mesiaca","veta":"Pripomína pristátie človeka na Mesiaci v roku 1969.","ton":"veselý","osn":true},{"datum":"07-25","nazov":"Medzinárodný deň žien a dievčat afrického pôvodu","veta":"Oceňuje úlohu žien a dievčat afrického pôvodu v spoločnosti.","ton":"neutrálny","osn":true},{"datum":"07-30","nazov":"Medzinárodný deň priateľstva","veta":"Priateľstvo spája ľudí naprieč krajinami a kultúrami.","ton":"veselý","osn":true},{"datum":"08-09","nazov":"Medzinárodný deň pôvodných obyvateľov sveta","veta":"Oceňuje kultúru a práva pôvodných obyvateľov.","ton":"neutrálny","osn":true},{"datum":"08-11","nazov":"Svetový deň steelpanu","veta":"Steelpan je hudobný nástroj z oceľového suda pôvodom z Trinidadu a Tobaga.","ton":"veselý","osn":true},{"datum":"08-12","nazov":"Medzinárodný deň mládeže","veta":"Povzbudzuje mladých ľudí, aby sa zapájali do diania v spoločnosti.","ton":"veselý","osn":true},{"datum":"08-19","nazov":"Svetový deň humanitárnej pomoci","veta":"Vzdáva úctu ľuďom, ktorí pomáhajú iným v núdzi.","ton":"neutrálny","osn":true},{"datum":"08-27","nazov":"Svetový deň jazier","veta":"Jazerá sú zásobárňou vody a domovom množstva živočíchov.","ton":"veselý","osn":true},{"datum":"08-31","nazov":"Medzinárodný deň ľudí afrického pôvodu","veta":"Oceňuje prínos ľudí afrického pôvodu pre svet.","ton":"neutrálny","osn":true},{"datum":"09-05","nazov":"Medzinárodný deň charity","veta":"Pripomína hodnotu dobrovoľnej pomoci tým, ktorí ju potrebujú.","ton":"veselý","osn":true},{"datum":"09-05","nazov":"Medzinárodný deň pôvodných žien a dievčat sveta","veta":"Oceňuje úlohu pôvodných žien a dievčat vo svojich komunitách.","ton":"neutrálny","osn":true},{"datum":"09-07","nazov":"Medzinárodný deň čistého ovzdušia pre modrú oblohu","veta":"Čistý vzduch je dôležitý pre zdravie ľudí aj pre prírodu.","ton":"neutrálny","osn":true},{"datum":"09-08","nazov":"Medzinárodný deň gramotnosti","veta":"Pripomína, že čítať a písať je základ vzdelania.","ton":"veselý","osn":true},{"datum":"09-15","nazov":"Medzinárodný deň demokracie","veta":"Pripomína hodnotu slobodných volieb a účasti občanov.","ton":"neutrálny","osn":true},{"datum":"09-16","nazov":"Medzinárodný deň ochrany ozónovej vrstvy","veta":"Ozónová vrstva chráni Zem pred škodlivým žiarením zo Slnka.","ton":"neutrálny","osn":true},{"datum":"09-20","nazov":"Svetový deň upratovania","veta":"Ľudia na celom svete spoločne upratujú prírodu a okolie.","ton":"veselý","osn":true},{"datum":"09-21","nazov":"Medzinárodný deň mieru","veta":"Pripomína, že mier je spoločný cieľ ľudstva.","ton":"neutrálny","osn":true},{"datum":"09-23","nazov":"Medzinárodný deň posunkových jazykov","veta":"Posunkové jazyky umožňujú dorozumievať sa ľuďom s poškodeným sluchom.","ton":"neutrálny","osn":true},{"datum":"09-27","nazov":"Svetový deň cestovného ruchu","veta":"Pripomína, že cestovanie spája ľudí a prináša prácu aj poznanie.","ton":"veselý","osn":true},{"datum":"09-29","nazov":"Medzinárodný deň povedomia o stratách a plytvaní potravinami","veta":"Upozorňuje, že veľa jedla sa vyhodí, hoci by sa dalo zjesť.","ton":"neutrálny","osn":true},{"datum":"09-30","nazov":"Medzinárodný deň prekladu","veta":"Oceňuje prekladateľov, vďaka ktorým si rozumieme naprieč jazykmi.","ton":"veselý","osn":true},{"datum":"10-01","nazov":"Medzinárodný deň kávy","veta":"Oslavuje kávu a ľudí, ktorí ju pestujú, spracúvajú aj pripravujú.","ton":"veselý","osn":true},{"datum":"10-01","nazov":"Medzinárodný deň starších osôb","veta":"Oceňuje skúsenosti seniorov a ich miesto v spoločnosti.","ton":"neutrálny","osn":true},{"datum":"10-02","nazov":"Medzinárodný deň nenásilia","veta":"Pripomína hodnoty nenásilia a toleranciu, ktoré presadzoval Mahátma Gándhí.","ton":"neutrálny","osn":true},{"datum":"10-05","nazov":"Svetový deň učiteľov","veta":"Poďakovanie učiteľom za ich prácu.","ton":"veselý","osn":true},{"datum":"10-07","nazov":"Svetový deň bavlny","veta":"Bavlna je dôležitá plodina pre odevy aj živobytie miliónov farmárov.","ton":"neutrálny","osn":true},{"datum":"10-09","nazov":"Svetový deň pošty","veta":"Pripomína založenie Svetovej poštovej únie v roku 1874.","ton":"neutrálny","osn":true},{"datum":"10-11","nazov":"Medzinárodný deň dievčat","veta":"Podporuje práva a príležitosti dievčat na celom svete.","ton":"neutrálny","osn":true},{"datum":"10-15","nazov":"Medzinárodný deň žien na vidieku","veta":"Oceňuje prácu žien na vidieku, najmä v poľnohospodárstve.","ton":"neutrálny","osn":true},{"datum":"10-16","nazov":"Svetový deň výživy","veta":"Pripomína, že každý by mal mať dostatok kvalitného jedla.","ton":"neutrálny","osn":true},{"datum":"10-23","nazov":"Medzinárodný deň leoparda snežného","veta":"Leopard snežný žije vo vysokých horách Strednej a Južnej Ázie.","ton":"veselý","osn":true},{"datum":"10-27","nazov":"Svetový deň audiovizuálneho dedičstva","veta":"Pripomína ochranu filmov, rozhlasových a televíznych záznamov.","ton":"neutrálny","osn":true},{"datum":"10-29","nazov":"Medzinárodný deň starostlivosti a podpory","veta":"Oceňuje prácu ľudí, ktorí sa starajú o druhých.","ton":"neutrálny","osn":true},{"datum":"10-31","nazov":"Svetový deň miest","veta":"Upozorňuje na rozvoj miest a život v nich.","ton":"neutrálny","osn":true},{"datum":"11-10","nazov":"Svetový deň vedy v službách mieru a rozvoja","veta":"Pripomína, že veda pomáha spoločnosti aj spolupráci krajín.","ton":"veselý","osn":true},{"datum":"11-16","nazov":"Medzinárodný deň stredomorskej stravy","veta":"Stredomorská strava stojí na zelenine, olivovom oleji, rybách a obilninách.","ton":"veselý","osn":true},{"datum":"11-16","nazov":"Medzinárodný deň tolerancie","veta":"Vyzýva k úcte, porozumeniu a prijatiu odlišností.","ton":"neutrálny","osn":true},{"datum":"11-20","nazov":"Svetový deň detí","veta":"Pripomína práva detí a ich právo na šťastné detstvo.","ton":"veselý","osn":true},{"datum":"11-21","nazov":"Svetový deň televízie","veta":"Televízia informuje, vzdeláva a zabáva ľudí na celom svete.","ton":"veselý","osn":true},{"datum":"11-26","nazov":"Svetový deň udržateľnej dopravy","veta":"Podporuje šetrnejšie spôsoby dopravy, ako sú vlak, bicykel či chôdza.","ton":"neutrálny","osn":true},{"datum":"12-03","nazov":"Medzinárodný deň osôb so zdravotným postihnutím","veta":"Podporuje rovnaké príležitosti pre ľudí so zdravotným postihnutím.","ton":"neutrálny","osn":true},{"datum":"12-05","nazov":"Medzinárodný deň dobrovoľníkov","veta":"Poďakovanie dobrovoľníkom, ktorí pomáhajú iným bez nároku na odmenu.","ton":"veselý","osn":true},{"datum":"12-05","nazov":"Svetový deň pôdy","veta":"Zdravá pôda je základ pestovania potravín.","ton":"neutrálny","osn":true},{"datum":"12-10","nazov":"Deň ľudských práv","veta":"Pripomína prijatie Všeobecnej deklarácie ľudských práv v roku 1948.","ton":"neutrálny","osn":true},{"datum":"12-11","nazov":"Medzinárodný deň hôr","veta":"Hory sú zdrojom vody, prírodným bohatstvom a domovom mnohých ľudí.","ton":"veselý","osn":true},{"datum":"12-15","nazov":"Svetový deň rodiny turkických jazykov","veta":"Oslavuje turkické jazyky a ich spoločné kultúrne dedičstvo.","ton":"neutrálny","osn":true},{"datum":"12-18","nazov":"Deň arabského jazyka","veta":"Oslavuje arabčinu, jeden z oficiálnych jazykov OSN.","ton":"neutrálny","osn":true},{"datum":"12-20","nazov":"Medzinárodný deň ľudskej solidarity","veta":"Pripomína, že ľudia si majú pomáhať a spolupracovať.","ton":"veselý","osn":true},{"datum":"12-21","nazov":"Svetový deň meditácie","veta":"Meditácia pomáha upokojiť myseľ a nájsť chvíľu pokoja.","ton":"veselý","osn":true},{"datum":"12-21","nazov":"Svetový deň basketbalu","veta":"Basketbal je obľúbená kolektívna hra na celom svete.","ton":"veselý","osn":true},{"pravidlo":{"mesiac":10,"den_tyzdna":1,"poradie":1},"nazov":"Svetový deň bývania","veta":"Pripomína, že každý má mať právo na dôstojné bývanie a bezpečný domov.","ton":"neutrálny","osn":true},{"pravidlo":{"mesiac":11,"den_tyzdna":4,"poradie":3},"nazov":"Svetový deň filozofie","veta":"Povzbudzuje ľudí, aby sa zamýšľali nad otázkami života, poznania a spoločnosti.","ton":"neutrálny","osn":true},{"datum":"03-14","nazov":"Medzinárodný deň matematiky","veta":"Matematika je všade okolo nás, od hudby po počasie. Deň je tiež slávnostný Deň čísla pí.","ton":"veselý"},{"datum":"03-20","nazov":"Svetový deň vrabcov","veta":"Pripomína, že vrabce a ďalšie bežné mestské vtáky potrebujú našu ochranu.","ton":"veselý"},{"datum":"03-27","nazov":"Svetový deň divadla","veta":"Divadelníci po celom svete každý rok oslavujú divadlo posolstvom jedného umelca.","ton":"veselý"},{"datum":"04-02","nazov":"Medzinárodný deň detskej knihy","veta":"Pripadá na narodeniny Hansa Christiana Andersena a podporuje lásku detí k čítaniu.","ton":"veselý"},{"datum":"04-15","nazov":"Svetový deň umenia","veta":"Oslavuje tvorivosť a umenie vo všetkých podobách, od maľby po hudbu.","ton":"veselý"},{"datum":"04-18","nazov":"Medzinárodný deň pamiatok a sídel","veta":"Pripomína, že kultúrne dedičstvo treba chrániť pre budúce generácie.","ton":"neutrálny"},{"datum":"04-29","nazov":"Medzinárodný deň tanca","veta":"Tanec spája ľudí bez ohľadu na jazyk a vek.","ton":"veselý"},{"datum":"05-18","nazov":"Medzinárodný deň múzeí","veta":"Múzeá nás zoznamujú s históriou, umením aj prírodou a sú otvorené pre všetkých.","ton":"veselý"},{"datum":"05-23","nazov":"Svetový deň korytnačiek","veta":"Upozorňuje na ochranu morských aj suchozemských korytnačiek na celom svete.","ton":"veselý"},{"datum":"06-01","nazov":"Svetový deň mlieka","veta":"Pripomína, aké dôležité je mlieko vo výžive ľudí na celom svete.","ton":"veselý"},{"datum":"06-21","nazov":"Svetový deň žiráf","veta":"Pripadá na najdlhší deň roka – ako stvorený pre najvyššie zviera na súši.","ton":"veselý"},{"datum":"06-21","nazov":"Svetový deň hudby","veta":"Na ulice a námestia vychádzajú hudobníci a každý si môže zahrať alebo zaspievať.","ton":"veselý"},{"datum":"06-23","nazov":"Olympijský deň","veta":"Pripomína vznik Medzinárodného olympijského výboru a motivuje ľudí k pohybu.","ton":"veselý"},{"datum":"07-29","nazov":"Medzinárodný deň tigra","veta":"Upozorňuje na ochranu tigrov, ktorých vo voľnej prírode zostalo málo.","ton":"veselý"},{"datum":"08-08","nazov":"Medzinárodný deň mačiek","veta":"Deň pre mačky a všetkých, ktorým doma vládne mačka.","ton":"veselý"},{"datum":"08-12","nazov":"Svetový deň slonov","veta":"Upozorňuje na ochranu slonov v Afrike a Ázii.","ton":"veselý"},{"datum":"08-13","nazov":"Medzinárodný deň ľavákov","veta":"Deň pre ľudí, ktorí píšu, kreslia a jedia ľavou rukou.","ton":"veselý"},{"datum":"09-22","nazov":"Svetový deň nosorožcov","veta":"Upozorňuje na ochranu všetkých piatich druhov nosorožcov.","ton":"veselý"},{"datum":"10-04","nazov":"Svetový deň zvierat","veta":"Pripomína, že zvieratá si zaslúžia starostlivosť a dobré zaobchádzanie.","ton":"veselý"},{"datum":"10-15","nazov":"Svetový deň umývania rúk","veta":"Umývanie rúk mydlom je jednoduchý spôsob, ako chrániť zdravie.","ton":"neutrálny"},{"datum":"10-25","nazov":"Svetový deň cestovín","veta":"Oslavuje cestoviny, ktoré majú radi ľudia na celom svete.","ton":"veselý"},{"datum":"11-01","nazov":"Svetový deň vegánstva","veta":"Pripomína rastlinnú stravu a začiatky vegánskeho hnutia.","ton":"neutrálny"},{"datum":"11-13","nazov":"Svetový deň láskavosti","veta":"Vyzýva k malým milým skutkom voči rodine, susedom aj neznámym ľuďom.","ton":"veselý"},{"datum":"11-21","nazov":"Svetový deň pozdravu","veta":"Stačí pozdraviť desať ľudí a deň je hneď o kúsok príjemnejší.","ton":"veselý"},{"datum":"02-27","nazov":"Medzinárodný deň ľadového medveďa","veta":"Upozorňuje na ľadové medvede a na to, ako ich ohrozuje strata morského ľadu.","ton":"veselý"},{"pravidlo":{"mesiac":10,"den_tyzdna":5,"poradie":1},"nazov":"Svetový deň úsmevu","veta":"Jediný úsmev môže niekomu zlepšiť deň. Heslo dňa: urob jeden dobrý skutok.","ton":"veselý"},{"pravidlo":{"mesiac":10,"den_tyzdna":5,"poradie":2},"nazov":"Svetový deň vajec","veta":"Vajcia sú výživné a univerzálne jedlo, ktoré sa dá pripraviť na stovky spôsobov.","ton":"veselý"},{"pravidlo":{"mesiac":5,"den_tyzdna":7,"poradie":1},"nazov":"Svetový deň smiechu","veta":"Smiech uvoľňuje napätie a zlepšuje náladu. Deň založil Madan Kataria, tvorca smiechovej jogy.","ton":"veselý"}]/*/DNI*/;

/* keď žiadny medzinárodný deň nie je – vtipná výzva (jasne ako hra, nie fakt) */
const VLASTNY_DEN = ["Deň dobrej kávy","Deň dlhej sprchy","Deň bez žehlenia","Deň teplých ponožiek","Deň obľúbenej piesne",
  "Deň pomalých raňajok","Deň bez výčitiek","Deň dobrej knihy","Deň prechádzky bez cieľa","Deň čokoládového kúska",
  "Deň starých fotiek","Deň zapálenej sviečky","Deň vďaky","Deň hlasného smiechu","Deň bez náhlenia","Deň dobrého čaju",
  "Deň mäkkého svetra","Deň skorého spánku","Deň milej správy","Deň obľúbeného jedla"];

/* nápad na dnes – drobnosti na pár minút */
const NAPADY = [
  "Uvar si čaj a vypi ho pri okne. Bez telefónu.",
  "Napíš niekomu, na koho si dnes myslela. Stačí jedna veta.",
  "Pusti si pieseň, ktorú si mala rada ako tínedžerka. Nahlas.",
  "Päť minút vonku na čerstvom vzduchu. Aj keď je zima.",
  "Zapáľ si večer sviečku a na chvíľu zhasni hlavné svetlo.",
  "Pozri si starú fotku, na ktorej sa smeješ.",
  "Daj si niečo dobré. Bez počítania kalórií.",
  "Natiahni sa. Ruky hore, ramená dole, tri hlboké nádychy.",
  "Odlož jednu úlohu na zajtra. Svet sa nezrúti.",
  "Povedz deťom, čo sa ti na nich dnes páčilo.",
  "Pochváľ sa. Aspoň sama sebe – za jednu vec, ktorá sa dnes podarila.",
  "Otvor okno a vyvetraj. Hlavu aj izbu.",
  "Zatancuj si pri varení. Nikto sa nepozerá. (A ak áno, pridá sa.)",
  "Prečítaj si pár strán knihy namiesto správ.",
  "Zavolaj mame alebo kamarátke. Len tak.",
  "Vypi pohár vody. Teraz.",
  "Napíš si tri veci, ktoré dnes boli dobré. Aj malé sa rátajú.",
  "Daj si dlhšiu sprchu a nikam sa neponáhľaj.",
  "Objím niekoho doma. Dlhšie ako obvykle.",
  "Choď dnes spať o pol hodiny skôr.",
  "Uprac jednu malú vec – šuplík, poličku. Hneď sa uľaví.",
  "Pozri sa na oblohu. Naozaj, aspoň na minútu.",
  "Naplánuj si na víkend jednu vec len pre seba.",
  "Daj si teplé ponožky a deku. Zaslúžiš si to.",
  "Zahrajte si s deťmi niečo hlúpe. Najlepšie s pravidlami, ktoré si vymyslia.",
  "Nájdi si na internete video so zvieratkami. Jedno. Dobre, dve.",
  "Pusti si obľúbený seriál bez pocitu viny.",
  "Usmej sa na seba v zrkadle. Vyzerá to smiešne, ale funguje to.",
  "Kúp si cestou kvietok. Len tak, pre seba.",
  "Prejdi sa okolo domu a všímaj si zvuky.",
  "Dovoľ si dnes povedať nie.",
  "Uvar niečo, čo vonia. Škorica, vanilka, čokoľvek.",
  "Pošli Robovi správu s jedným srdiečkom. Uvidíš, čo príde späť.",
  "Spomeň si na najkrajšiu dovolenku. Kde to bolo a čo ste tam jedli?",
  "Nič nerob päť minút. Úplne nič. Aj to je výkon.",
  "Vyber si jednu pieseň na dnešný večer a pusti ju celej rodine.",
  "Zahoď jednu vec, ktorú už dlho nepotrebuješ.",
  "Pripomeň si, že slabší deň je len deň. Zajtra je nový.",
  "Daj si teplý kakao alebo horúcu čokoládu.",
  "Pozri sa do kalendára a nájdi niečo, na čo sa tešíš.",
];

/* víkendometer – komentáre */
// Vtip dňa: [otázka / úvod, pointa]. Čisté rodinné vtipy, striedajú sa podľa dňa v roku.
const VTIPY = [
  ["Čo povedala nula osmičke?", "„Pekný opasok!“"],
  ["Prečo sa slony schovávajú v jahodách?", "Aby ich nikto nenašiel. Videl si už niekedy slona v jahodách? No vidíš."],
  ["„Mami, môžem ísť von?“ „S tými dierami na nohaviciach?“", "„Nie, s Ferkom od susedov.“"],
  ["„Pán doktor, všetci ma ignorujú.“", "„Ďalší, prosím!“"],
  ["„Pán doktor, mám pocit, že som neviditeľný.“", "„Kto to hovorí?“"],
  ["Učiteľka: „Janko, vymenuj dve zámená.“ Janko: „Kto, ja?“", "„Výborne, sadni si.“"],
  ["Slimáka okradli dve korytnačky. Policajt sa pýta: „Ako vyzerali?“", "„Neviem, stalo sa to strašne rýchlo.“"],
  ["Dve ovce na lúke. Prvá: „Bé.“ Druhá: „Bú.“ „Čo blbneš?“", "„Učím sa cudzí jazyk.“"],
  ["Ako sa volá medveď bez zubov?", "Gumový medvedík."],
  ["Prečo majú žirafy taký dlhý krk?", "Lebo im strašne smrdia nohy."],
  ["„Pán čašník, v polievke mám muchu!“", "„Potichu, lebo ju budú chcieť všetci.“"],
  ["„Pán čašník, čo robí tá mucha v mojej polievke?“", "„Vyzerá to na znak.“"],
  ["Čo povedala jedna stena druhej?", "„Stretneme sa v rohu.“"],
  ["„Oci, pomôžeš mi s úlohou?“ „Nie, to by nebolo správne.“", "„Ja viem, ale aspoň to skús.“"],
  ["Čo dostaneš, keď kravu posadíš na trampolínu?", "Mliečny kokteil."],
  ["Čo vznikne, keď skrížiš ježka s hadom?", "Ostnatý drôt."],
  ["Čo má zuby, ale nikdy nehryzie?", "Hrebeň."],
  ["„Pán doktor, mám déjà vu.“", "„To ste mi hovorili už včera.“"],
  ["Aký je rozdiel medzi ignoranciou a apatiou?", "Neviem a je mi to jedno."],
  ["Prečo ryby nehrajú tenis?", "Boja sa siete."],
  ["Prečo je kalendár smutný?", "Lebo má zrátané dni."],
  ["Čo má krk, ale nemá hlavu?", "Fľaša."],
  ["Čo je ťažšie, kilo peria alebo kilo železa?", "Rovnako. Ale na nohu si radšej pusti to perie."],
  ["„Pán doktor, bolí ma všade. Dotknem sa hlavy a bolí, dotknem sa kolena a bolí.“", "„Máte zlomený prst.“"],
  ["„Pán doktor, strašne zabúdam.“ „A odkedy?“", "„Čo odkedy?“"],
  ["Malý ježko v tme narazí do kaktusa.", "„Mami, si to ty?“"],
  ["Prečo sa banán maže krémom na opaľovanie?", "Aby sa nelúpal."],
  ["Prečo stojí hus na jednej nohe?", "Lebo keby zdvihla aj druhú, spadla by."],
  ["Prečo husi odlietajú na zimu na juh?", "Lebo pešo by to trvalo strašne dlho."],
  ["Mama: „Čo robí Janko?“ „Nič.“ „A Peťko?“", "„Pomáha mu.“"],
  ["Prečo sa kostra nevozí na horskej dráhe?", "Nemá na to žalúdok."],
  ["Prečo nosí slon zelené ponožky?", "Lebo modré má v práčke."],
  ["Policajt vidí pána s tučniakom: „Vezmite ho do zoo!“ Na druhý deň ich stretne znova: „Nepovedal som vám, aby ste ho vzali do zoo?“", "„Áno, včera sme boli v zoo, dnes ideme do kina.“"],
  ["„Na narodeniny som dostal bubon. Najlepší darček.“ „Prečo?“", "„Mama mi dáva euro denne, aby som nebubnoval.“"],
  ["Kde trávi snehuliak leto?", "V mrazničke."],
  ["„Pani učiteľka, môže byť niekto potrestaný za niečo, čo neurobil?“ „Samozrejme, že nie.“", "„Výborne, ja som si neurobil úlohu.“"],
  ["„Oci, kde sú Alpy?“", "„Spýtaj sa mamy, tá všetko niekam odloží.“"],
  ["Ktoré zviera je najsilnejšie?", "Slimák. Celý život nosí na chrbte dom."],
  ["Koľko zeminy je v jame, ktorá má meter do hĺbky?", "Žiadna. Je to jama."],
  ["Prečo včely bzučia?", "Lebo nevedia slová."],
  ["Prečo sa pavúky tak dobre vyznajú v počítačoch?", "Lebo celý deň visia na webe."],
  ["„Vedel si, že Mŕtve more je mŕtve?“", "„Ani som nevedel, že bolo choré.“"],
  ["„Pán doktor, môj brat si myslí, že je sliepka.“ „Prečo ste ho nepriviedli?“", "„Potrebovali sme vajcia.“"],
  ["Ktorý mesiac má 28 dní?", "Všetky."],
  ["Prečo je učebnica matematiky smutná?", "Lebo má samé problémy."],
  ["Učiteľka: „Janko, prečo meškáš?“", "„Pri škole je značka Pozor, škola! Choďte pomaly.“"],
  ["Prečo prešla sliepka cez cestu?", "Aby sa dostala na druhú stranu."],
  ["Prečo si Janko zobral do školy rebrík?", "Lebo chcel ísť na vysokú školu."],
  ["„Mami, v škole ma dnes pochválili.“ „A za čo?“", "„Pani učiteľka povedala, že keby boli všetci ako ja, mohla by školu rovno zavrieť.“"],
  ["„Oci, ušetril som euro. Nešiel som autobusom, bežal som za ním.“", "„Mal si bežať za taxíkom, ušetril by si desať.“"],
];
const VK_DEN = {
  1: ["Pondelok je najťažší deň týždňa – a práve ho zdolávaš.", "Rozbeh je najťažší. Potom to už ide samo."],
  2: ["Utorok: pondelok je už len spomienka.", "Najťažší deň je za tebou. Teraz už len zrýchľuješ."],
  3: ["Streda – vrchol kopca. Odtiaľto je to už z kopca.", "Polovica týždňa za tebou. Druhá polovica býva rýchlejšia."],
  4: ["Štvrtok je vlastne malý piatok.", "Ešte jeden deň a pol. To dáš aj so zavretými očami."],
  5: ["Piatok! Posledná rovinka pred víkendom.", "Dnes už stačí dobehnúť. Víkend čaká."],
};
const VK_VOLNO = {
  5: "Piatok poobede – víkend práve začal. Nechaj starosti v práci.",
  6: "Sobota. Žiadny zhon, žiadne povinnosti navyše.",
  0: "Nedeľa – pomaly, bez náhlenia. Ešte stále je víkend.",
  1: "Ešte chvíľu spíš a týždeň počká.",
  hol: "Dnes je voľno. Užívaj si to bez výčitiek.",
};

/* ---------- pomocníci ---------- */
const mdOf = d => md(d);
const fmtN = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const daysTo = (a, b) => Math.round((new Date(ymd(b)) - new Date(ymd(a))) / 864e5);
const kedy = n => n <= 0 ? "dnes" : n === 1 ? "zajtra" : n === 2 ? "pozajtra" : n < 14 ? `o ${n} ${sk(n,"deň","dni","dní")}` : n < 60 ? `o ${Math.round(n/7)} ${sk(Math.round(n/7),"týždeň","týždne","týždňov")}` : `o ${n} dní`;
const pickBy = (arr, d, salt = 0) => arr[(Math.floor((new Date(ymd(d)) - new Date(d.getFullYear(),0,0)) / 864e5) * 7 + salt) % arr.length];
function nthWeekday(y, m, wd, n){            // wd 1=po…7=ne, n=-1 posledný
  if(n > 0){ const f = new Date(y, m-1, 1), off = (wd - (f.getDay() || 7) + 7) % 7; return new Date(y, m-1, 1 + off + (n-1)*7); }
  const l = new Date(y, m, 0), off = ((l.getDay() || 7) - wd + 7) % 7; return new Date(y, m-1, l.getDate() - off);
}
function dniDnes(d){
  return DNI.filter(x => x.ton !== "vážny" && (x.datum ? x.datum === mdOf(d)
    : x.pravidlo && ymd(nthWeekday(d.getFullYear(), x.pravidlo.mesiac, x.pravidlo.den_tyzdna, x.pravidlo.poradie)) === ymd(d)))
    .sort((a, b) => (a.ton === "veselý" ? 0 : 1) - (b.ton === "veselý" ? 0 : 1) || (b.osn ? 1 : 0) - (a.osn ? 1 : 0));
}
const dlzka = d => { const t = sunTimes(d); return (t.set - t.rise) / 60000; };   // minúty svetla
const hmin = m => `${Math.floor(m/60)} h ${Math.round(m%60)} min`;

/* ---------- víkendometer ---------- */
function tyzden(d){
  const [wdOd, hOd] = CONFIG.vikend.od, [wdDo, hDo] = CONFIG.vikend.do;
  const wd = d.getDay() || 7;                                   // 1 = pondelok
  const pondelok = addDays(new Date(d.getFullYear(), d.getMonth(), d.getDate()), 1 - wd);
  const start = atTime(addDays(pondelok, wdOd - 1), hOd), end = atTime(addDays(pondelok, wdDo - 1), hDo);
  const work = d >= start && d < end && !isHoliday(d);
  const p = Math.min(1, Math.max(0, (d - start) / (end - start)));
  let spanky = 0, obedy = 0;
  for(let x = new Date(d); x < end; x = addDays(x, 1)){
    const noc = addDays(new Date(x.getFullYear(), x.getMonth(), x.getDate()), 1);
    if(noc <= end) spanky++;
    const obed = atTime(x, "12:00"); if(obed > d && obed < end && !isHoliday(x)) obedy++;
  }
  // ďalší začiatok práce (na víkende: koľko voľna ešte ostáva)
  const nextStart = d < start ? start : addDays(start, 7);
  return {work, p, start, end, nextStart, wd, za: (d - start) / 60000, pred: (end - d) / 60000, spanky, obedy};
}
function gaugeSvg(p, weekend){
  const W = 380, H = 214, cx = 190, cy = 196, R = 160;
  const pt = (f, r) => { const a = Math.PI * (1 - f); return [cx + r*Math.cos(a), cy - r*Math.sin(a)]; };
  const arc = (f0, f1, r) => { const [x0,y0] = pt(f0, r), [x1,y1] = pt(f1, r); return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
  // hranice dní: Po 6:00 → Pi 15:00 = 105 h; polnoci po 18, 42, 66, 90 h
  const [wdOd, hOd] = CONFIG.vikend.od, [wdDo, hDo] = CONFIG.vikend.do, toH = s => { const [h,m] = s.split(":").map(Number); return h + m/60; };
  const total = (wdDo - wdOd)*24 + toH(hDo) - toH(hOd), first = 24 - toH(hOd);
  const cuts = [0]; for(let h = first; h < total; h += 24) cuts.push(h / total); cuts.push(1);
  const names = ["PO","UT","ST","ŠT","PI","SO","NE"].slice(wdOd - 1);
  let g = `<path d="${arc(0, 1, R)}" fill="none" stroke="rgba(160,120,60,.18)" stroke-width="26"/>`;
  g += `<path d="${arc(0, Math.max(.002, weekend ? 1 : p), R)}" fill="none" stroke="url(#vkG)" stroke-width="26"/>`;
  cuts.slice(1, -1).forEach(f => { const [x0,y0] = pt(f, R - 15), [x1,y1] = pt(f, R + 15); g += `<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="#f6ecd2" stroke-width="3"/>`; });
  for(let i = 0; i < cuts.length - 1; i++){ const [x,y] = pt((cuts[i] + cuts[i+1]) / 2, R - 34);
    g += `<text x="${x.toFixed(1)}" y="${(y+5).toFixed(1)}" text-anchor="middle" font-family="Jost" font-weight="600" font-size="14" letter-spacing="1.5" fill="${i === 4 ? "#b5392a" : "#8a5632"}">${names[i] || ""}</text>`; }
  for(let i = 0; i <= 40; i++){ const f = i/40, [x0,y0] = pt(f, R + 18), [x1,y1] = pt(f, R + (i % 4 ? 23 : 28)); g += `<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="#8a5632" stroke-width="${i % 4 ? 1 : 1.8}" opacity=".6"/>`; }
  const f = weekend ? 1 : p, [nx, ny] = pt(f, R - 6);
  g += `<line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#c4452c" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="11" fill="#a2694a"/><circle cx="${cx}" cy="${cy}" r="5" fill="#f0b43a"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" class="vkG"><defs><linearGradient id="vkG" x1="0" x2="1"><stop offset="0" stop-color="#e3b25c"/><stop offset=".6" stop-color="#d49a45"/><stop offset="1" stop-color="#7e9a4a"/></linearGradient></defs>${g}</svg>`;
}
function renderVikend(d){
  const t = tyzden(d);
  if(!t.work){
    const vol = (t.nextStart - d) / 3600000, hol = isHoliday(d) && t.wd <= 5;
    const txt = hol ? VK_VOLNO.hol : (t.wd === 1 ? VK_VOLNO[1] : VK_VOLNO[t.wd % 7]) || VK_VOLNO[6];
    return `<div class="head"><span class="label">Víkendometer</span><span class="sub">${hol ? "sviatok" : "voľno"}</span></div>
      ${gaugeSvg(1, true)}
      <div class="vkBig"><b>${hol ? "Voľno!" : "Víkend!"}</b></div>
      <div class="vkTxt">${esc(txt)}</div>
      ${obzor(d, t)}
      <div class="vkTiles"><div><b>${fmtN(vol)}</b><span>${sk(Math.round(vol),"hodina","hodiny","hodín")} voľna ešte pred tebou</span></div></div>`;
  }
  const dni = Math.floor(t.pred / 1440), hod = Math.floor((t.pred % 1440) / 60), min = Math.round(t.pred % 60);
  const ost = dni ? `${dni} ${sk(dni,"deň","dni","dní")} a ${hod} h` : hod ? `${hod} h ${min} min` : `${min} min`;
  const pct = Math.round(t.p * 100);
  return `<div class="head"><span class="label">Víkendometer</span><span class="sub">do piatku ${CONFIG.vikend.do[1]}</span></div>
    ${gaugeSvg(t.p, false)}
    <div class="vkBig"><b>${pct}&thinsp;%</b><span>týždňa už máš za sebou</span></div>
    <div class="vkTxt">${esc(pickBy(VK_DEN[t.wd], d))}</div>
    ${obzor(d, t)}
    <div class="vkTiles">
      <div><b>${fmtN(t.za)}</b><span>minút týždňa je už preč</span></div>
      <div><b>${ost}</b><span>a je tu víkend</span></div>
      ${t.spanky ? `<div><b>${t.spanky}</b><span>${sk(t.spanky,"spánok","spánky","spánkov")} do víkendu</span></div>` : `<div><b>dnes</b><span>začína víkend</span></div>`}
    </div>`;
}

/* ---------- víkend na obzore / zajtra ---------- */
let wxTs = null, wxAt = 0;
function wxSeries(){                          // predpoveď MET Norway z cache hlavnej stránky (wx2)
  if(Date.now() - wxAt > 600000){ wxAt = Date.now(); try{ wxTs = JSON.parse(localStorage.getItem("wx2")).properties.timeseries; }catch(e){ wxTs = null; } }
  return wxTs;
}
const deg = t => `${Math.round(t) || 0}°`.replace("-", "−");
const DEN_N = ["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"];
function obzorDen(day, max, prazdne){
  const ts = wxSeries(), s = ts && daySummary(ts, ymd(day), false), y = s && sym(s.code);
  const wx = s ? `<div class="oWx">${ICONS[y[0]] || ""}<b>${deg(s.max)}</b><small>${deg(s.min)}</small></div><div class="oSk">${esc(y[1] === "—" ? "" : y[1])}</div>`
    : `<div class="oWx"><small>predpoveď neskôr</small></div>`;
  const cal = moodCal || (typeof calData !== "undefined" ? calData : null);
  const evs = cal ? eventsForDay(day, cal) : [], shown = evs.slice(0, max), rest = evs.length - shown.length;
  const ev = prazdne ? "" : shown.length ? shown.map(e => { const x = famEvent(e, day), ico = x.h === "narodeniny" ? "♥" : x.h === "meniny" ? "❀" : /^\d/.test(x.h) ? x.h : "";
      return `<div class="oE${x.cls}">${ico ? `<i>${esc(ico)}</i>` : ""}${esc(x.n)}</div>`; }).join("") + (rest > 0 ? `<div class="oE oMore">+ ${rest} ${sk(rest,"ďalšia","ďalšie","ďalších")}</div>` : "")
    : `<div class="oE oMore">nič v pláne</div>`;
  return {html: `<div class="oDay"><div class="oN">${DEN_N[day.getDay()]} <small>${day.getDate()}. ${day.getMonth() + 1}.</small></div>${wx}<div class="oEvs">${ev}</div></div>`, n: evs.length};
}
function obzor(d, t){
  const base = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const cal = moodCal || (typeof calData !== "undefined" ? calData : null), pocet = x => cal ? eventsForDay(x, cal).length : 0;
  if(t.wd <= 5 && !isHoliday(d)){                // pracovný týždeň (aj piatok večer): sobota + nedeľa
    const so = addDays(base, 6 - t.wd), ne = addDays(so, 1), prazdne = !pocet(so) && !pocet(ne);
    return `<div class="obz"><div class="oHead">${t.work ? "Víkend na obzore" : "Víkend je tu"}</div>
      <div class="oCols">${obzorDen(so, 2, prazdne).html}${obzorDen(ne, 2, prazdne).html}</div>
      ${prazdne ? `<div class="oFree">Víkend je zatiaľ voľný, len pre vás.</div>` : ""}</div>`;
  }
  const z = addDays(base, 1);                      // víkend alebo sviatok: zajtra
  return `<div class="obz"><div class="oHead">Zajtra</div><div class="oCols one">${obzorDen(z, 3, false).html}</div></div>`;
}

/* ---------- na čo sa tešiť ---------- */
let moodCal = null;
try{ moodCal = JSON.parse(localStorage.getItem("moodCal")); }catch(e){}
function loadMoodCal(){                       // rodinné udalosti na 42 dní dopredu, raz za 6 h
  if(typeof CAL_URL === "undefined" || !CAL_URL) return;
  if(moodCal && Date.now() - (moodCal._t || 0) < 6*3600000 && moodCal._od === ymd(now())) return;
  const cb = "moodCb" + Date.now(), s = document.createElement("script");
  window[cb] = j => { delete window[cb]; s.remove(); if(j && j.ok){ j._t = Date.now(); j._od = ymd(now()); moodCal = j; try{ localStorage.setItem("moodCal", JSON.stringify(j)); }catch(e){} if(page === 1 && right === "mood") renderMood(); } };
  s.onerror = () => { delete window[cb]; s.remove(); };
  s.src = `${CAL_URL}?k=${encodeURIComponent(CAL_KEY)}&od=${ymd(now())}&dni=42&cb=${cb}&_=${Date.now()}`;
  document.head.appendChild(s);
}
function tesenie(d){
  const out = [], t = tyzden(d);
  if(t.work) out.push({n: daysTo(d, t.end), t: "Víkend", x: t.wd === 5 ? `dnes od ${CONFIG.vikend.do[1]}` : null, ico: "☀"});
  const hol = HOLIDAYS.map(s => new Date(s + "T00:00")).find(x => daysTo(d, x) > 0 && (x.getDay() % 6));
  const hol24 = hol && md(hol) === "12-24";
  if(hol) out.push({n: daysTo(d, hol), t: hol24 ? "Štedrý deň" : "Voľný deň", x: hol24 ? "voľno" : hol.toLocaleDateString("sk-SK", {weekday:"long", day:"numeric", month:"long"}), ico: hol24 ? "✶" : "✦"});
  const br = SCHOOL_BREAKS.map(b => new Date(b[0] + "T00:00")).find(x => daysTo(d, x) > 0);
  if(br && daysTo(d, br) <= 120) out.push({n: daysTo(d, br), t: "Prázdniny", x: "deti budú doma", ico: "✎"});
  const ste = new Date(d.getFullYear(), 11, 24);
  if(!hol24 && daysTo(d, ste) > 0 && daysTo(d, ste) <= 60) out.push({n: daysTo(d, ste), t: "Štedrý deň", x: null, ico: "✶"});
  if(d.getMonth() === 11 && d.getDate() >= 24 && d.getDate() < 31) out.push({n: daysTo(d, new Date(d.getFullYear(), 11, 31)), t: "Silvester", x: null, ico: "✶"});
  const cal = moodCal || (typeof calData !== "undefined" ? calData : null), seen = new Set();
  ((cal && cal.udalosti) || []).forEach(e => {
    if(!/^(Narodeniny|Meniny)\s*[–-]/.test(e.nazov)) return;
    const den = new Date(e.zaciatok.slice(0,10) + "T00:00"), n = daysTo(d, den), k = e.nazov + n;
    if(n < 0 || seen.has(k)) return; seen.add(k);
    const f = famEvent({n: e.nazov}, den);
    out.push({n, t: f.n, x: f.h === "narodeniny" ? "narodeniny" : null, ico: f.h === "narodeniny" ? "♥" : "❀"});
  });
  return out.sort((a, b) => a.n - b.n).slice(0, 5);
}

/* ---------- vykreslenie ---------- */
function renderMood(){
  const d = now();
  loadMoodCal();
  // Dnes je …
  const dn = dniDnes(d), menu = MENINY[mdOf(d)];
  let day;
  if(dn.length){
    const a = dn[0];
    day = `<div class="mKick">Dnes je</div><div class="mTitle${a.nazov.length > 42 ? " long" : ""}">${esc(a.nazov)}</div><div class="mLine">${esc(a.veta || "")}</div>`
      + (dn.length > 1 ? `<div class="mAlso">a tiež: ${dn.slice(1, 3).map(x => esc(x.nazov)).join(" · ")}</div>` : "");
  } else {
    const v = pickBy(VLASTNY_DEN, d, 3);
    day = `<div class="mKick">Dnes nie je žiadny medzinárodný deň</div><div class="mTitle">Tak si vyhlás vlastný:<br><em>${esc(v)}</em></div><div class="mLine">Pravidlá si určuješ ty.</div>`;
  }
  const yd = Math.floor((new Date(ymd(d)) - new Date(d.getFullYear(), 0, 0)) / 864e5);
  const greet = d.getHours() < 10 ? "Dobré ráno" : d.getHours() < 17 ? "Pekný deň" : "Príjemný večer";
  // svetlo
  const today = dlzka(d), y = d.getFullYear(), ys = [...Array(366)].map((_, i) => dlzka(new Date(y, 0, 1 + i)));
  const iMin = ys.indexOf(Math.min(...ys.slice(300))), iMax = ys.indexOf(Math.max(...ys));
  const dMin = new Date(y, 0, 1 + iMin), dMax = new Date(y, 0, 1 + iMax);
  let light;
  if(d < dMax && d.getMonth() < 6){
    const minPrev = Math.min(...[...Array(40)].map((_, i) => dlzka(new Date(y - 1, 11, i - 8))));   // okolo minulého slnovratu
    light = `<div class="lBig">+${fmtN(today - minPrev)}&nbsp;min</div><div class="lTxt">svetla pribudlo od najkratšieho dňa. A každý deň pribúda ďalšie.</div>`;
  } else if(d < dMin){
    light = `<div class="lBig">${daysTo(d, dMin)} ${sk(daysTo(d, dMin),"deň","dni","dní")}</div><div class="lTxt">do najkratšieho dňa v roku. Potom už bude svetla len pribúdať.</div>`;
  } else {
    light = `<div class="lBig">+${fmtN(today - ys[iMin])}&nbsp;min</div><div class="lTxt">svetla pribudlo od najkratšieho dňa. A každý deň pribúda ďalšie.</div>`;
  }
  const tes = tesenie(d), sun = sunTimes(d), hm = x => `${x.getHours()}:${pad(x.getMinutes())}`, vtip = pickBy(VTIPY, d, 23);
  $("p4").innerHTML = `<div class="cabinet mood">
    <section id="mDay" class="dial">
      <div class="head"><span class="label">${greet}</span><span class="sub">${d.toLocaleDateString("sk-SK",{weekday:"long", day:"numeric", month:"long"})} · ${yd}. deň roka${menu && !/\s\p{Ll}/u.test(menu) ? " · meniny " + esc(menu) : ""}</span></div>
      ${day}
    </section>
    <section id="mWeek" class="dial">
      <button id="mClk" class="rbtn" aria-label="Späť na hodiny"><div class="knob"><svg viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="21" fill="#fbf3df" stroke="#a2694a" stroke-width="3"/>
        <g stroke="#6d4430" stroke-width="2.4" stroke-linecap="round"><line x1="28" y1="10" x2="28" y2="14"/><line x1="46" y1="28" x2="42" y2="28"/><line x1="28" y1="46" x2="28" y2="42"/><line x1="10" y1="28" x2="14" y2="28"/></g>
        <line x1="28" y1="28" x2="28" y2="16.5" stroke="#2a1b11" stroke-width="3" stroke-linecap="round"/><line x1="28" y1="28" x2="36.5" y2="32.5" stroke="#2a1b11" stroke-width="3" stroke-linecap="round"/><circle cx="28" cy="28" r="2.6" fill="#c4452c"/>
      </svg></div></button>
      ${renderVikend(d)}
    </section>
    <section id="mLook" class="dial">
      <div class="head"><span class="label">Na čo sa tešiť</span></div>
      <div class="tRows">${tes.map(x => `<div class="tRow"><i>${x.ico}</i><span class="tn">${esc(x.t)}${x.x ? `<small>${esc(x.x)}</small>` : ""}</span><b>${kedy(x.n)}</b></div>`).join("") || `<div class="mLine">Zatiaľ nič v kalendári – je čas niečo naplánovať.</div>`}</div>
    </section>
    <section id="mLight" class="dial">
      <div class="head"><span class="label">Svetlo</span><span class="sub">dnes ${hmin(today)}</span></div>
      ${light}
      <div class="lSun"><span>☀ východ ${hm(sun.rise)}</span><span>západ ${hm(sun.set)}</span></div>
    </section>
    <section id="mIdea" class="dial">
      <div class="head"><span class="label">Nápad na dnes</span></div>
      <div class="iTxt">${esc(pickBy(NAPADY, d, 11))}</div>
      <div class="jBox"><div class="jLab">Vtip dňa</div><div class="jQ">${esc(vtip[0])}</div><div class="jA">${esc(vtip[1])}</div></div>
    </section>
  </div>`;
}

/* ---------- štýly ---------- */
document.head.insertAdjacentHTML("beforeend", `<style>
#p4{left:1280px;display:none;cursor:pointer}
.cabinet.mood{grid-template-columns:minmax(0,1fr) 404px 300px;grid-template-rows:minmax(0,1fr) minmax(0,1fr)}
.mood .dial{padding:18px 24px 16px;display:flex;flex-direction:column;min-width:0;min-height:0}
.mood .head{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex:none}
.mood .head .label{white-space:nowrap;flex:none}
.mood .sub{font-size:13px;min-width:0;color:var(--ink-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#mWeek{grid-column:2;grid-row:1 / 3}
#mLook{grid-column:1;grid-row:2}
#mLight{grid-column:3;grid-row:1}
#mIdea{grid-column:3;grid-row:2}
#mClk{right:16px;top:12px;width:70px}
#mClk .knob{width:56px;height:56px}
#mClk .knob svg{width:38px;height:38px}
#mWeek .head{padding-right:74px}
.mKick{font:600 13px/1 Jost,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--cognac);margin-top:auto}
.mTitle{font-family:Fraunces,serif;font-weight:600;font-size:40px;line-height:1.06;color:var(--ink);margin-top:10px}
.mTitle.long{font-size:33px}
.mTitle em{font-style:italic;color:var(--cognac)}
.mLine{font-size:19px;line-height:1.35;color:var(--ink-soft);margin-top:10px}
.mAlso{font-size:14px;color:var(--ink-soft);opacity:.85;margin-top:auto;padding-top:10px}
svg.vkG{display:block;width:100%;margin-top:6px}
.vkBig{display:flex;align-items:baseline;justify-content:center;gap:10px;margin-top:-6px}
.vkBig b{font-family:Fraunces,serif;font-weight:600;font-size:54px;line-height:1;color:var(--ink);font-feature-settings:"tnum" 1}
.vkBig span{font-size:17px;color:var(--ink-soft)}
.vkTxt{font-family:Fraunces,serif;font-style:italic;font-size:20px;line-height:1.3;color:var(--cognac);text-align:center;margin:12px 6px 0}
.vkTiles{display:flex;gap:10px;margin-top:auto}
.vkTiles div{flex:1;text-align:center;padding:10px 4px 8px;border-radius:12px;background:rgba(160,120,60,.11);box-shadow:inset 0 0 0 1px rgba(160,120,60,.25)}
.vkTiles b{display:block;font-family:Fraunces,serif;font-weight:600;font-size:23px;line-height:1.1;color:var(--ink);white-space:nowrap}
.vkTiles span{display:block;font-size:12.5px;line-height:1.25;color:var(--ink-soft);margin-top:4px}
.tRows{display:flex;flex-direction:column;margin-top:8px}
.tRow{display:flex;align-items:center;gap:12px;padding:7px 0;border-top:1px solid rgba(160,120,60,.25)}
.tRow:first-child{border-top:0}
.tRow i{font-style:normal;width:26px;text-align:center;font-size:18px;color:var(--brass-lo)}
.tRow .tn{flex:1;min-width:0;font-family:Fraunces,serif;font-weight:600;font-size:21px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tRow .tn small{font:400 14px Jost,sans-serif;color:var(--ink-soft);margin-left:10px}
.tRow b{font:600 15px Jost,sans-serif;color:var(--cognac);white-space:nowrap}
.lBig{font-family:Fraunces,serif;font-weight:600;font-size:46px;line-height:1;color:var(--ink);margin-top:auto}
.lTxt{font-size:16.5px;line-height:1.35;color:var(--ink-soft);margin-top:8px}
.lSun{display:flex;justify-content:space-between;font-size:14px;color:var(--ink-soft);margin-top:14px;padding-top:10px;border-top:1px solid rgba(160,120,60,.25)}
.iTxt{font-family:Fraunces,serif;font-size:20px;line-height:1.28;color:var(--ink);margin-top:10px}
.jBox{margin-top:auto;padding-top:9px;border-top:1px solid rgba(160,120,60,.25)}
.jLab{font:600 11.5px/1 Jost,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--cognac)}
.jQ{font-size:15.5px;line-height:1.3;color:var(--ink);margin-top:6px}
.jA{font-family:Fraunces,serif;font-style:italic;font-weight:600;font-size:17px;line-height:1.25;color:var(--cognac);margin-top:4px}
.obz{margin:auto 0;padding:12px 14px 13px;border-radius:12px;background:rgba(160,120,60,.08);box-shadow:inset 0 0 0 1px rgba(160,120,60,.25)}
.oHead{font:600 12.5px/1 Jost,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--cognac);text-align:center}
.oCols{display:flex;gap:14px;margin-top:10px}
.oDay{flex:1;min-width:0}
.oCols .oDay + .oDay{border-left:1px solid rgba(160,120,60,.25);padding-left:14px}
.oN{font-family:Fraunces,serif;font-weight:600;font-size:19px;line-height:1.1;color:var(--ink);text-transform:capitalize}
.oN small{font:400 13.5px Jost,sans-serif;color:var(--ink-soft);text-transform:none;margin-left:4px}
.oWx{display:flex;align-items:center;gap:7px;margin-top:6px;height:42px}
.oWx svg{width:42px;height:42px;flex:none}
.oWx b{font-family:Fraunces,serif;font-weight:600;font-size:27px;color:var(--ink)}
.oWx small{font-size:16px;color:var(--ink-soft)}
.oSk{font-size:14px;margin-top:2px;line-height:1.2;color:var(--ink-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.oE{font-size:15px;line-height:1.25;color:var(--ink);margin-top:5px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.oE i{font-style:normal;color:var(--cognac);font-weight:600;margin-right:5px}
.oE.oMore{color:var(--ink-soft)}
.oFree{font-family:Fraunces,serif;font-style:italic;font-size:17px;color:var(--cognac);text-align:center;margin-top:10px;padding-top:8px;border-top:1px solid rgba(160,120,60,.2)}
.oCols.one .oDay{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:14px;align-items:center}
.oCols.one .oN{grid-column:1 / 3}
.oCols.one .oWx,.oCols.one .oSk{grid-column:1}
.oCols.one .oEvs{grid-column:2;grid-row:2 / span 2;align-self:center;min-width:0}
.oCols.one .oE:first-child{margin-top:0}
</style>`);
setInterval(() => { if(page === 1 && right === "mood") renderMood(); }, 60000);

/* ---------- ovládanie ---------- */
$("moodBtn").addEventListener("click", e => { e.stopPropagation(); goPage(1, "mood"); });
$("p4").addEventListener("click", () => goPage(0));   // ťuk kdekoľvek = späť
if(q.get("page") === "mood") goPage(1, "mood");
