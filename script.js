
const map=L.map('map').setView([31,5],5);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// IMPORTANT : mapping noms corrects
function normalize(name){
if(name==="Morocco") return "Morocco";
if(name==="Algeria") return "Algeria";
if(name==="Tunisia") return "Tunisia";
return null;
}

fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
.then(res=>res.json())
.then(data=>{
let selected=data.features.filter(f=>{
return ["Morocco","Algeria","Tunisia"].includes(f.properties.ADMIN);
});

L.geoJSON(selected,{
style:{color:"#22c55e",fillColor:"#22c55e",fillOpacity:0.4},
onEachFeature:(feature,layer)=>{
layer.on('mouseover',()=>layer.setStyle({fillOpacity:0.7}));
layer.on('mouseout',()=>layer.setStyle({fillOpacity:0.4}));
layer.on('click',()=>{
let name=feature.properties.ADMIN;
showCountry(name);
});
}
}).addTo(map);
});

function showCountry(name){
const d=countries[name];
if(!d)return;
document.getElementById("info").innerHTML=
`<h2>${d.name}</h2>
<img src="${d.image}">
<div class="card">${d.infos}</div>
<div class="card">${d.desc}</div>`;
}
