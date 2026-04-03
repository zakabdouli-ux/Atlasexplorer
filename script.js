
const map=L.map('map').setView([31,5],5);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// GeoJSON réel via CDN (fonctionne sur serveur)
fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
.then(res=>res.json())
.then(data=>{
let filtered=data.features.filter(f=>
["Morocco","Algeria","Tunisia"].includes(f.properties.ADMIN)
);

L.geoJSON(filtered,{
style:{color:"#22c55e",fillColor:"#22c55e",fillOpacity:0.4},
onEachFeature:(f,l)=>{
l.on('click',()=>showCountry(f.properties.ADMIN));
}
}).addTo(map);
});

function showCountry(name){
let d=countries[name];
if(!d)return;
document.getElementById("info").innerHTML=
`<h2>${d.name}</h2>
<img src="${d.image}">
<div class="card">${d.desc}</div>`;
}

// villes
const citiesList=[
["Marrakech",31.63,-8],
["Alger",36.75,3.06],
["Tunis",36.8,10.18]
];

citiesList.forEach(c=>{
let m=L.marker([c[1],c[2]]).addTo(map);
m.on('click',()=>{
let d=cities[c[0]];
document.getElementById("info").innerHTML=
`<h2>${c[0]}</h2>
<img src="${d.img}">
<div class="card">${d.desc}</div>`;
});
});
