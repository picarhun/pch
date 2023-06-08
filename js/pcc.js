// Gyártó választó Begin


let startButtons = document.getElementById("config_valaszto");
let alkatreszForm = document.getElementById("alkatresz-form");

startButtons.style.display = "block";
alkatreszForm.style.display = "none";

function selectBrand(brand) {
    document.getElementById('brand-input').value = brand;
    alkatreszForm.submit();
  }

function Configurator(){
    startButtons.style.display = "none";
    alkatreszForm.style.display = "block";
}


// Gyártó választó Finish


// Lenyíló menük kezelése Begin
const MaxOssz = document.getElementById('maxossz');
const gephazSelect = document.getElementById('gephaz');
const alaplapSelect = document.getElementById('alaplap');
const cpuSelect = document.getElementById('cpu');
const cpuhutoSelect = document.getElementById('cpu_huto');
const ramSelect = document.getElementById('ram');
const gpuSelect = document.getElementById('gpu');
const hddSelect = document.getElementById('hdd');
const ssdSelect = document.getElementById('ssd');
const tapSelect = document.getElementById('tap');

// Az összes elem eltárolása
const gephazElems = document.querySelectorAll('select[id="gephaz"] option');
const alaplapElems = document.querySelectorAll('select[id="alaplap"] option');
const cpuElems = document.querySelectorAll('select[id="cpu"] option');
const cpuhutoElems = document.querySelectorAll('select[id="cpu_huto"] option');
const ramElems = document.querySelectorAll('select[id="ram"] option');
const gpuElems = document.querySelectorAll('select[id="gpu"] option');
const hddElems = document.querySelectorAll('select[id="hdd"] option');
const ssdElems = document.querySelectorAll('select[id="ssd"] option');
const tapElems = document.querySelectorAll('select[id="tap"] option');


let gephazSelectedSize= "";
let gephazSelectedGpuMeret="";
let alaplapSelectedSize= "";
let alaplapSelectedSocket = "";
let alaplapSelectedRam = "";
let cpuSelectedSocket = "";
let cpuSelectedRam = "";
let cpuhutoSelectedmeret = "";
let ramSelectedType = "";
let gpuSelectedMeret = "";
let gpuSelectedWatt= "";
let tapSelectedWatt = "";

function filterElements() {
    gephazSelectedSize = gephazSelect.options[gephazSelect.selectedIndex].dataset.keywords;
    alaplapSelectedSize = alaplapSelect.options[alaplapSelect.selectedIndex].dataset.keywords.split(';')[0];
    alaplapSelectedSocket = alaplapSelect.options[alaplapSelect.selectedIndex].dataset.keywords.split(';')[1];
    alaplapSelectedRam = alaplapSelect.options[alaplapSelect.selectedIndex].dataset.keywords.split(';')[2];
    cpuSelectedSocket = cpuSelect.options[cpuSelect.selectedIndex].dataset.keywords.split(';')[0];
    cpuSelectedRam = cpuSelect.options[cpuSelect.selectedIndex].dataset.keywords.split(';')[1];
    cpuhutoSelectedmeret = cpuhutoSelect.options[cpuhutoSelect.selectedIndex].dataset.keywords;
    ramSelectedType = ramSelect.options[ramSelect.selectedIndex].dataset.keywords;
    gpuSelectedMeret = gpuSelect.options[gpuSelect.selectedIndex].dataset.keywords.split(';')[1];
    gpuSelectedWatt = gpuSelect.options[gpuSelect.selectedIndex].dataset.keywords.split(';')[3];
    tapSelectedWatt = tapSelect.options[tapSelect.selectedIndex].dataset.keywords.split(';')[1];

    if(gephazSelectedSize == undefined){
        gephazSelectedSize="";
    }
    if(alaplapSelectedSize == undefined){
        alaplapSelectedSize="";
    }
    if(alaplapSelectedSocket == undefined){
        alaplapSelectedSocket="";
    }
    if(alaplapSelectedRam == undefined){
        alaplapSelectedRam="";
    }
    if(cpuSelectedSocket == undefined){
        cpuSelectedSocket="";
    }
    if(cpuSelectedRam == undefined){
        cpuSelectedRam="";
    }
    if(ramSelectedType == undefined){
        ramSelectedType="";
    }
    if(gpuSelectedMeret == undefined){
        gpuSelectedMeret="";
    }
    if(gpuSelectedWatt == undefined){
        gpuSelectedWatt="";
    }
    if(tapSelectedWatt == undefined){
        tapSelectedWatt="";
    }

    //Gépház tömb
    let tmb = gephazSelectedSize.split(';');
    //console.log(tmb);

gephazElems.forEach(elem => {
    let gephazmeret = elem.dataset.keywords.split(';');

    if(gephazmeret.includes(alaplapSelectedSize) || alaplapSelectedSize==''){
        elem.style.display = 'block';

    } else {
        elem.style.display = 'none';
    }
});


alaplapElems.forEach(elem => {
    let keywords = elem.dataset.keywords.split(';');
    let size = keywords[0];
    let socket = keywords[1];
    let ram = keywords[2];

    let van = false;

    for(let i = 0; i<tmb.length;i++){
        if(tmb[i]===size){
            van = true;
        }
    }
    if(van===true){
        if (socket===cpuSelectedSocket || cpuSelectedSocket === '') {
            if (ram===ramSelectedType || ramSelectedType === '') {
                elem.style.display = 'block';
                } else {
                    elem.style.display = 'none';
                }
            } else {
                elem.style.display = 'none';
            }
    } else {
        elem.style.display = 'none';
    }
});


cpuElems.forEach(elem => {
    let keywords = elem.dataset.keywords.split(';');
    let socket = keywords[0];
    let ram = keywords[1];

    if (socket===alaplapSelectedSocket || alaplapSelectedSocket === '') {
        if (ram===ramSelectedType || ramSelectedType === '') {
            elem.style.display = 'block';

            } else {
                elem.style.display = 'none';
            }
    } else {
        elem.style.display = 'none';
    }
});

cpuhutoElems.forEach(elem => {
    let huto = elem.dataset.keywords.split(';');
    let hmagassag = huto[0];
    //console.log("Proci hűtő foglalatok: "+huto);
    //console.log("Proci hűtő magassága: "+hmagassag);
    if(huto.includes(cpuSelectedSocket) || cpuSelectedSocket===''){
        elem.style.display = 'block';

    } else {
        elem.style.display = 'none';
    }

    if(tmb[1] >= hmagassag){
        elem.style.display = 'block';

    } else if (hmagassag === 0){
        elem.style.display = 'block';

    } else {
        elem.style.display = 'none';
    }
});

ramElems.forEach(elem => {
    let ram = elem.dataset.keywords;
    //console.log(ram);
    if (ram === alaplapSelectedRam || alaplapSelectedRam === '') {
        elem.style.display = 'block';

    } else {
        elem.style.display = 'none';
    }
    if (ram === cpuSelectedRam || cpuSelectedRam === '') {
        elem.style.display = 'block';

    } else {
        elem.style.display = 'none';
    }
});

gpuElems.forEach(elem => {
    let keywords = elem.dataset.keywords.split(';');
    let meret = keywords[1];
    //console.log("GPU méret: "+meret);

    if(tmb[0] >= meret){
        elem.style.display = 'block';

    } else if(tmb=='') {
        elem.style.display = 'block';

    } else {
        elem.style.display = 'none';
    }
});

tapElems.forEach(elem => {
    let keywords = elem.dataset.keywords.split(';');
    let watt = parseInt(keywords[1]);

    //console.log("Táp: " + watt);

    if (watt >= parseInt(gpuSelectedWatt) || gpuSelectedWatt === '') {
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }
});

// Képek láthatóvá tétele Begin
// Az aktuálisan kiválasztott termékek értékének lekérése
    const selectedGephaz = gephazSelect.value;
    const selectedAlaplap = alaplapSelect.value;
    const selectedCPU = cpuSelect.value;
    const selectedCpuHuto = cpuhutoSelect.value;
    const selectedRam = ramSelect.value;
    const selectedgpu = gpuSelect.value;
    const selectedhdd = hddSelect.value;
    const selectedssd = ssdSelect.value;
    const selectedtap = tapSelect.value;

// Képek div elemének lekérése
    const gephazKepDiv = document.getElementById('gephazkep');
    const alaplapKepDiv = document.getElementById('alaplapkep');
    const CPUKepDiv = document.getElementById('cpukep');
    const cpuhutoKepDiv = document.getElementById('cpuhutokep');
    const ramKepDiv = document.getElementById('ramkep');
    const gpuKepDiv = document.getElementById('gpukep');
    const hddKepDiv = document.getElementById('hddkep');
    const ssdKepDiv = document.getElementById('ssdkep');
    const tapKepDiv = document.getElementById('tapkep');

// Mini leírás div elemének lekérése
    const gephazMiniDiv = document.getElementById('gephazmini');
    const alaplapMiniDiv = document.getElementById('alaplapmini');
    const CPUMiniDiv = document.getElementById('cpumini');
    const cpuhMiniDiv = document.getElementById('cpuhmini');
    const ramMiniDiv = document.getElementById('rammini');
    const gpuMiniDiv = document.getElementById('gpumini');
    const hddMiniDiv = document.getElementById('hddmini');
    const ssdMiniDiv = document.getElementById('ssdmini');
    const tapMiniDiv = document.getElementById('tapmini');

// Az összes kép elem eltárolása
    const gephazkepElems = document.querySelectorAll('#gephazkep img');
    const alaplapkepElems = document.querySelectorAll('#alaplapkep img');
    const cpukepElems = document.querySelectorAll('#cpukep img');
    const cpuhutokepElems = document.querySelectorAll('#cpuhutokep img');
    const ramkepElems = document.querySelectorAll('#ramkep img');
    const gpukepElems = document.querySelectorAll('#gpukep img');
    const hddkepElems = document.querySelectorAll('#hddkep img');
    const ssdkepElems = document.querySelectorAll('#ssdkep img');
    const tapkepElems = document.querySelectorAll('#tapkep img');

// Az összes rövid leírás eltárolása
    const gephazminiElems = document.querySelectorAll('#gephazmini p');
    const alaplapminiElems = document.querySelectorAll('#alaplapmini p');
    const cpuminiElems = document.querySelectorAll('#cpumini p');
    const cpuhminiElems = document.querySelectorAll('#cpuhmini p');
    const ramminiElems = document.querySelectorAll('#rammini p');
    const gpuminiElems = document.querySelectorAll('#gpumini p');
    const hddminiElems = document.querySelectorAll('#hddmini p');
    const ssdminiElems = document.querySelectorAll('#ssdmini p');
    const tapminiElems = document.querySelectorAll('#tapmini p');

// Minden kép elem rejtése
    gephazkepElems.forEach(elem => {
        elem.style.display = 'none';
    });
    alaplapkepElems.forEach(elem => {
        elem.style.display = 'none';
    });
    cpukepElems.forEach(elem => {
        elem.style.display = 'none';
    });
    cpuhutokepElems.forEach(elem => {
        elem.style.display = 'none';
    });
    ramkepElems.forEach(elem => {
        elem.style.display = 'none';
    });
    gpukepElems.forEach(elem => {
        elem.style.display = 'none';
    });
    hddkepElems.forEach(elem => {
        elem.style.display = 'none';
    });
    ssdkepElems.forEach(elem => {
        elem.style.display = 'none';
    });
    tapkepElems.forEach(elem => {
        elem.style.display = 'none';
    });

// Minden termék mini leírás elrejtése
gephazminiElems.forEach(elem => {
    elem.style.display = 'none';
});
alaplapminiElems.forEach(elem => {
    elem.style.display = 'none';
});
cpuminiElems.forEach(elem => {
    elem.style.display = 'none';
});
cpuhminiElems.forEach(elem => {
    elem.style.display = 'none';
});
ramminiElems.forEach(elem => {
    elem.style.display = 'none';
});
gpuminiElems.forEach(elem => {
    elem.style.display = 'none';
});
hddminiElems.forEach(elem => {
    elem.style.display = 'none';
});
ssdminiElems.forEach(elem => {
    elem.style.display = 'none';
});
tapminiElems.forEach(elem => {
    elem.style.display = 'none';
});

// Kiválasztott termékhez tartozó kép megjelenítése
    const selectedGephazElem = gephazKepDiv.querySelector(`img[alt="${selectedGephaz}"]`);
    if (selectedGephazElem) {
        selectedGephazElem.style.display = 'inline';
    }

    const selectedAlaplapElem = alaplapKepDiv.querySelector(`img[alt="${selectedAlaplap}"]`);
    if (selectedAlaplapElem) {
        selectedAlaplapElem.style.display = 'inline';
    }
    const selectedCPUElem = CPUKepDiv.querySelector(`img[alt="${selectedCPU}"]`);
    if (selectedCPUElem) {
        selectedCPUElem.style.display = 'inline';
    }
    const selectedcpuhutoElem = cpuhutoKepDiv.querySelector(`img[alt="${selectedCpuHuto}"]`);
    if (selectedcpuhutoElem) {
        selectedcpuhutoElem.style.display = 'inline';
    }
    const selectedramElem = ramKepDiv.querySelector(`img[alt="${selectedRam}"]`);
    if (selectedramElem) {
        selectedramElem.style.display = 'inline';
    }
    const selectedgpuElem = gpuKepDiv.querySelector(`img[alt="${selectedgpu}"]`);
    if (selectedgpuElem) {
        selectedgpuElem.style.display = 'inline';
    }
    const selectedhddElem = hddKepDiv.querySelector(`img[alt="${selectedhdd}"]`);
    if (selectedhddElem) {
        selectedhddElem.style.display = 'inline';
    }
    const selectedssdElem = ssdKepDiv.querySelector(`img[alt="${selectedssd}"]`);
    if (selectedssdElem) {
        selectedssdElem.style.display = 'inline';
    }
    const selectedtapElem = tapKepDiv.querySelector(`img[alt="${selectedtap}"]`);
    if (selectedtapElem) {
        selectedtapElem.style.display = 'inline';
    }

//Kiválasztott termékhez tartozó leírás megjelenítése
    const selectedgephazElem2 = gephazMiniDiv.querySelector(`p[id="${selectedGephaz}"]`);
    if (selectedgephazElem2) {
        selectedgephazElem2.style.display = 'block';
    }
    const selectedalaplapElem2 = alaplapMiniDiv.querySelector(`p[id="${selectedAlaplap}"]`);
    if (selectedalaplapElem2) {
        selectedalaplapElem2.style.display = 'block';
    }
    const selectedcpuElem2 = CPUMiniDiv.querySelector(`p[id="${selectedCPU}"]`);
    if (selectedcpuElem2) {
        selectedcpuElem2.style.display = 'block';
    }
    const selectedcpuhElem2 = cpuhMiniDiv.querySelector(`p[id="${selectedCpuHuto}"]`);
    if (selectedcpuhElem2) {
        selectedcpuhElem2.style.display = 'block';
    }
    const selectedramElem2 = ramMiniDiv.querySelector(`p[id="${selectedRam}"]`);
    if (selectedramElem2) {
        selectedramElem2.style.display = 'block';
    }
    const selectedgpuElem2 = gpuMiniDiv.querySelector(`p[id="${selectedgpu}"]`);
    if (selectedgpuElem2) {
        selectedgpuElem2.style.display = 'block';
    }
    const selectedhddElem2 = hddMiniDiv.querySelector(`p[id="${selectedhdd}"]`);
    if (selectedhddElem2) {
        selectedhddElem2.style.display = 'block';
    }
    const selectedssdElem2 = ssdMiniDiv.querySelector(`p[id="${selectedssd}"]`);
    if (selectedssdElem2) {
        selectedssdElem2.style.display = 'block';
    }
    const selectedtapElem2 = tapMiniDiv.querySelector(`p[id="${selectedtap}"]`);
    if (selectedtapElem2) {
        selectedtapElem2.style.display = 'block';
    }
}
// Képek láthatóvá tétele Finish

// Lenyíló menük változásának figyelése
gephazSelect.addEventListener('change', filterElements);
alaplapSelect.addEventListener('change', filterElements);
cpuSelect.addEventListener('change', filterElements);
cpuhutoSelect.addEventListener('change', filterElements);
ramSelect.addEventListener('change',filterElements);
gpuSelect.addEventListener('change', filterElements);
hddSelect.addEventListener('change', filterElements);
ssdSelect.addEventListener('change', filterElements);
tapSelect.addEventListener('change',filterElements);

filterElements();
// Lenyíló menük kezelése Finish


// Minimum táp megjelenítő Begin
function minimumTap(){
    gpuSelectedWatt = gpuSelect.options[gpuSelect.selectedIndex].dataset.keywords.split(';')[3];
    

    if(gpuSelectedWatt === undefined){
        gpuSelectedWatt = 0;
    }
    document.getElementById('minimum_tap').innerHTML = '<p>Kiválasztott videókártya ajánlott táp igénye: ' + '<u class="red">' + gpuSelectedWatt + '</u>' + 'W</hp>';
}
document.getElementById('alkatresz-form').addEventListener('change',minimumTap);
minimumTap();
// Minimum táp megjelenítő Finish


// Konfigurátor kiválasztott termékek összegzője Begin
function osszegzes() {
    let gephazAr = parseInt(gephazSelect.options[gephazSelect.selectedIndex].dataset.price);
    let alaplapAr = parseInt(alaplapSelect.options[alaplapSelect.selectedIndex].dataset.price);
    let cpuAr = parseInt(cpuSelect.options[cpuSelect.selectedIndex].dataset.price);
    let cpuHutoAr = parseInt(cpuhutoSelect.options[cpuhutoSelect.selectedIndex].dataset.price);
    let ramAr = parseInt(ramSelect.options[ramSelect.selectedIndex].dataset.price);
    let gpuAr = parseInt(gpuSelect.options[gpuSelect.selectedIndex].dataset.price);
    let hddAr = parseInt(hddSelect.options[hddSelect.selectedIndex].dataset.price);
    let ssdAr = parseInt(ssdSelect.options[ssdSelect.selectedIndex].dataset.price);
    let tapAr = parseInt(tapSelect.options[tapSelect.selectedIndex].dataset.price);

    let osszeg = gephazAr + alaplapAr + cpuAr + cpuHutoAr + ramAr + gpuAr + hddAr + ssdAr + tapAr;

    document.getElementById('osszeg').innerHTML = '<h2 class="cim">Kiválasztott termékek összege: ' + osszeg + ' Ft</h2>';
}

document.getElementById('alkatresz-form').addEventListener('change',osszegzes);
osszegzes();
// Konfigurátor kiválasztott termékek összegzője Finish


//Összegek Összehasonlító Begin

function comparePrices() {
    let maxOssz = parseInt(MaxOssz.value);
  
    // Gyűjtsd össze az aktuálisan kiválasztott termékek árait
    const selectedGephazPrice = parseInt(gephazSelect.options[gephazSelect.selectedIndex].dataset.price);
    const selectedAlaplapPrice = parseInt(alaplapSelect.options[alaplapSelect.selectedIndex].dataset.price);
    const selectedCpuPrice = parseInt(cpuSelect.options[cpuSelect.selectedIndex].dataset.price);
    const selectedCpuHutoPrice = parseInt(cpuhutoSelect.options[cpuhutoSelect.selectedIndex].dataset.price);
    const selectedRamPrice = parseInt(ramSelect.options[ramSelect.selectedIndex].dataset.price);
    const selectedGpuPrice = parseInt(gpuSelect.options[gpuSelect.selectedIndex].dataset.price);
    const selectedHddPrice = parseInt(hddSelect.options[hddSelect.selectedIndex].dataset.price);
    const selectedSsdPrice = parseInt(ssdSelect.options[ssdSelect.selectedIndex].dataset.price);
    const selectedTapPrice = parseInt(tapSelect.options[tapSelect.selectedIndex].dataset.price);

    let lowestPrices = {
        gephaz: { price: Infinity, azon: '' },
        alaplap: { price: Infinity, azon: '' },
        cpu: { price: Infinity, azon: '' },
        cpuhuto: { price: Infinity, azon: '' },
        ram: { price: Infinity, azon: '' },
        gpu: { price: Infinity, azon: '' },
        hdd: { price: Infinity, azon: '' },
        ssd: { price: Infinity, azon: '' },
        tap: { price: Infinity, azon: '' }
    };
  
  
    // Lenyíló menükön végigmegyünk, és az eltárolt legalacsonyabb árú termékeket frissítjük
    gephazElems.forEach(elem => {
      const price = parseInt(elem.dataset.price);
      if (elem.style.display === 'block' && price < lowestPrices.gephaz.price && elem.dataset.price != '0') {
        lowestPrices.gephaz.price = price;
        lowestPrices.gephaz.azon = elem.value;
    }
    });
  
    alaplapElems.forEach(elem => {
      const price = parseInt(elem.dataset.price);
      if (elem.style.display === 'block' && price < lowestPrices.alaplap.price && elem.dataset.price != '0') {
        lowestPrices.alaplap.price = price;
        lowestPrices.alaplap.azon = elem.value;
    }
    });
  
    cpuElems.forEach(elem => {
      const price = parseInt(elem.dataset.price);
      if (elem.style.display === 'block' && price < lowestPrices.cpu.price && elem.dataset.price != '0') {
        lowestPrices.cpu.price = price;
        lowestPrices.cpu.azon = elem.value;
    }
    });
  
    cpuhutoElems.forEach(elem => {
      const price = parseInt(elem.dataset.price);
      if (elem.style.display === 'block' && price < lowestPrices.cpuhuto.price && elem.dataset.price != '0') {
        lowestPrices.cpuhuto.price = price;
        lowestPrices.cpuhuto.azon = elem.value;
    }
    });
  
    ramElems.forEach(elem => {
      const price = parseInt(elem.dataset.price);
      if (elem.style.display === 'block' && price < lowestPrices.ram.price && elem.dataset.price != '0') {
        lowestPrices.ram.price = price;
        lowestPrices.ram.azon = elem.value;
    }
    });
  
    gpuElems.forEach(elem => {
      const price = parseInt(elem.dataset.price);
      if (elem.style.display === 'block' && price < lowestPrices.gpu.price && elem.dataset.price != '0') {
        lowestPrices.gpu.price = price;
        lowestPrices.gpu.azon = elem.value;
    }
    });

    hddElems.forEach(elem => {
        const price = parseInt(elem.dataset.price);
        if (elem.style.display === 'block' && price < lowestPrices.hdd.price && elem.dataset.price != '0') {
            lowestPrices.hdd.price = price;
            lowestPrices.hdd.azon = elem.value;
        }
    });

    ssdElems.forEach(elem => {
        const price = parseInt(elem.dataset.price);
        if (elem.style.display === 'block' && price < lowestPrices.ssd.price && elem.dataset.price != '0') {
            lowestPrices.ssd.price = price;
            lowestPrices.ssd.azon = elem.value;
        }
    });
  
    tapElems.forEach(elem => {
      const price = parseInt(elem.dataset.price);
      if (elem.style.display === 'block' && price < lowestPrices.tap.price && elem.dataset.price != '0') {
        lowestPrices.tap.price = price;
        lowestPrices.tap.azon = elem.value;
    }
    });
  
    // Az aktuálisan kiválasztott termékek árainak összegzése
    const totalSelectedPrice =
      selectedGephazPrice +
      selectedAlaplapPrice +
      selectedCpuPrice +
      selectedCpuHutoPrice +
      selectedRamPrice +
      selectedGpuPrice +
      selectedHddPrice +
      selectedSsdPrice +
      selectedTapPrice;

  
    if (totalSelectedPrice > maxOssz) {
        gephazElems.forEach(elem => {
            if(elem.value === lowestPrices.gephaz.azon && !elem.classList.contains('minimum')){
                elem.classList.add("minimum");
            }
        })

        alaplapElems.forEach(elem => {
            if(elem.value === lowestPrices.alaplap.azon && !elem.classList.contains('minimum')){
                elem.classList.add("minimum");
            }
        })

        cpuElems.forEach(elem => {
            if(elem.value === lowestPrices.cpu.azon && !elem.classList.contains('minimum')){
                elem.classList.add("minimum");
            }
        })

        cpuhutoElems.forEach(elem => {
            if(elem.value === lowestPrices.cpuhuto.azon && !elem.classList.contains('minimum')){
                elem.classList.add("minimum");
            }
        })

        ramElems.forEach(elem => {
            if(elem.value === lowestPrices.ram.azon && !elem.classList.contains('minimum')){
                elem.classList.add("minimum");
            }
        })

        gpuElems.forEach(elem => {
            if(elem.value === lowestPrices.gpu.azon && !elem.classList.contains('minimum')){
                elem.classList.add("minimum");
            }
        })

        hddElems.forEach(elem => {
            if(elem.value === lowestPrices.hdd.azon && !elem.classList.contains('minimum')){
                elem.classList.add("minimum");
            }
        })

        ssdElems.forEach(elem => {
            if(elem.value === lowestPrices.ssd.azon && !elem.classList.contains('minimum')){
                elem.classList.add("minimum");
            }
        })

        tapElems.forEach(elem => {
            if(elem.value === lowestPrices.tap.azon && !elem.classList.contains('minimum')){
                elem.classList.add("minimum");
            }
        })
        document.getElementById('osszalert').innerHTML = '<h2 class="cim">A zöld színű betűvel ellátott termékeket ajánljuk figyelmébe! </h2>';
    
    } else {

        gephazElems.forEach(elem => {
            if(elem.value === lowestPrices.gephaz.azon && elem.classList.contains('minimum')){
                elem.classList.remove("minimum");
            }
        })

        alaplapElems.forEach(elem => {
            if(elem.value === lowestPrices.alaplap.azon && elem.classList.contains('minimum')){
                elem.classList.remove("minimum");
            }
        })

        cpuElems.forEach(elem => {
            if(elem.value === lowestPrices.cpu.azon && elem.classList.contains('minimum')){
                elem.classList.remove("minimum");
            }
        })

        cpuhutoElems.forEach(elem => {
            if(elem.value === lowestPrices.cpuhuto.azon && elem.classList.contains('minimum')){
                elem.classList.remove("minimum");
            }
        })

        ramElems.forEach(elem => {
            if(elem.value === lowestPrices.ram.azon && elem.classList.contains('minimum')){
                elem.classList.remove("minimum");
            }
        })

        gpuElems.forEach(elem => {
            if(elem.value === lowestPrices.gpu.azon && elem.classList.contains('minimum')){
                elem.classList.remove("minimum");
            }
        })

        hddElems.forEach(elem => {
            if(elem.value === lowestPrices.hdd.azon && elem.classList.contains('minimum')){
                elem.classList.remove("minimum");
            }
        })

        ssdElems.forEach(elem => {
            if(elem.value === lowestPrices.ssd.azon && elem.classList.contains('minimum')){
                elem.classList.remove("minimum");
            }
        })

        tapElems.forEach(elem => {
            if(elem.value === lowestPrices.tap.azon && elem.classList.contains('minimum')){
                elem.classList.remove("minimum");
            }
        })
        document.getElementById('osszalert').innerHTML = '<h2 class="cim">Kiválasztott termékek összege a kívánt érték alatt van!</h2>';
    }
  
    // Eredmény kiíratása
    
    //console.log(result);
    // vagy tetszőleges módon megjelenítés a felületen
  }

MaxOssz.addEventListener('change',comparePrices)
gephazSelect.addEventListener('change', comparePrices);
alaplapSelect.addEventListener('change', comparePrices);
cpuSelect.addEventListener('change', comparePrices);
cpuhutoSelect.addEventListener('change', comparePrices);
ramSelect.addEventListener('change',comparePrices);
gpuSelect.addEventListener('change', comparePrices);
hddSelect.addEventListener('change', comparePrices);
ssdSelect.addEventListener('change', comparePrices);
tapSelect.addEventListener('change',comparePrices);
//Összegek Összehasonlító Finish