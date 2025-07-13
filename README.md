# back-end-crypto-jwc-inl2

Hej Mikael! 

Överkomplicerade saker men mycket lärdom,    försökte skicka ut blocken separat via en egen CHANNEL
eftersom min blockkedja var för stor att broadcasta komplett via pubnub, men då skrevs blocken in 
felaktigt istället och jag fick dubbla block och deffekt blockkejda vid uppstart och noderna började
starta egna kedjor istället. Har även haft mycket strul med pöölen osv osv... 

Jag gick tillbaka till en enklare struktur och kedjan fungerar nu upp till ett visst antal block.

Jag förstår react koden , men som du säkert ser är det mesta promtat ,  jag har inte heller delat upp
strukturen och gjort fetch anropen i ett samlat dokument men jag känner personligen att jag vet att
det ska göras och jag vet vad som ska förbättras. Men jag känner också att jag kan pilla med detta i 
någon vecka till. 


Men nu fungerar iallafall, login , syncronisering , skriver till databas, central felhantering , loggning osv.. det blev mycket. Min request log låg på 12000, error: 3000  rader efter implementering :D. 

Har kommenterat på limitern eftersom den stöka lite, men den ligger där :D 

För uppstart: 

skapa config/config.env i back-end rooten: 

PORT=3000
NODE_ENV=development
PUB_KEY=<KEY>
SUB_KEY=<KEY>
SEC_KEY=<KEY>
USER_ID=<ID>
MONGODB_URI=<URI> te.x mongodb+srv://<USERINFO>@production-cluster.ziptcgy.mongodb.net/blockchain?retryWrites=true&w=majority ( ANVÄNDE ATLAS-CLOUD MEN BORDE FUNKA MED LOCAL OCKSÅ ? )
JWT_SECRET=<SECRET>
JWT_EXPIRES=7d 


npm install
npm run dev
npm run dev-node
npm run dev-node
npm run dev-node



Front end: 

npm install 
npm run dev 



