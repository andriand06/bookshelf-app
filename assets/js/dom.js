const listBukuBelumSelesai = document.getElementById("belumselesai");
const listBukuSelesai = document.getElementById("sudahselesai");
const buku_id = "bukuId";
function addBuku(){
    const judul = document.getElementById("judul").value;
    const penulis = document.getElementById("penulis").value;
    const tahun = document.getElementById("tahun").value;
    const isChecked = document.getElementById("selesai").checked;
    
    console.log("Judul = " + judul );
    console.log("penulis = " + penulis );
    console.log("tahun = " + tahun );
   
    if(isChecked) {
    const makeListBuku = makeBuku(judul,penulis,tahun,isChecked);
    
    const bukuObjek = composeBuku(judul,penulis,tahun,isChecked);

    console.log(bukuObjek);
    makeListBuku[buku_id] = bukuObjek.id;
    buku.push(bukuObjek);
    listBukuSelesai.append(makeListBuku);
    updateDataToStorage();
    } else
    {    
    const makeListBuku = makeBuku(judul,penulis,tahun,false);
    const bukuObjek = composeBuku(judul,penulis,tahun,false);
    makeListBuku[buku_id] = bukuObjek.id;
    buku.push(bukuObjek);
    listBukuBelumSelesai.append(makeListBuku);
    updateDataToStorage();
   
}
    
}

function makeBuku(judul,penulis,tahun,isComplete){
    
    const judulBuku = document.createElement("h2");
    judulBuku.innerText = judul;


    const labelPenulis = document.createElement("label");
    labelPenulis.innerText = "Penulis : ";
    const penulisBuku = document.createElement("p");
    penulisBuku.style.display = "inline";
    penulisBuku.innerText = penulis;

    const penulisContainer = document.createElement("div");
    penulisContainer.append(labelPenulis,penulisBuku);

    const labelTahun = document.createElement("label");
    labelTahun.innerText = "Tahun : ";
    const tahunBuku = document.createElement("p");
    tahunBuku.style.display = "inline";
    tahunBuku.innerText = tahun;

    const textContainer = document.createElement("div");
    textContainer.classList.add("textContainer");
    
    textContainer.append(judulBuku,penulisContainer,labelTahun,tahunBuku);
    if(isComplete) {
        const buttonContainer = document.createElement("div");
        buttonContainer.append(createUnreadButton());
        buttonContainer.append(createDeleteButton());
        textContainer.append(buttonContainer);
    } else {
        const buttonContainer = document.createElement("div");
        buttonContainer.append(createReadButton());
        buttonContainer.append(createDeleteButton());
        textContainer.append(buttonContainer);
    }
    const container = document.createElement("div");
    container.classList.add("container")
    
    container.append(textContainer);

    return container;
}

function createButton(buttonClass,text,eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonClass);
    button.innerText = text;
    button.addEventListener("click",function(event){
        eventListener(event);
    });
    return button;
}
function createReadButton(){
    return createButton("read-button","Selesai dibaca",function (event) {
        addBukuSelesai(event.target.parentElement.parentElement.parentElement);
    })
}
function createUnreadButton() {
    return createButton("unread-button","Belum  dibaca",function (event) {
        undoBukuSelesai(event.target.parentElement.parentElement.parentElement);
    })
}

function createDeleteButton() {
    return createButton("delete-button","Hapus Buku",function (event) {
        deleteBuku(event.target.parentElement.parentElement.parentElement);
    })
}
function deleteBuku(taskElement) {
    
    const bukuPosisi = findBukuIndex(taskElement[buku_id]);
    console.log(taskElement[buku_id]);
    buku.splice(bukuPosisi,1);
   var r = confirm("Yakin ingin menghapus data?");
   if (r ===  true) {
       taskElement.remove();
       updateDataToStorage();
   } else {
       // error code supaya ketika dicancel tidak remove element 
        taskElement.push();
       alert("Batal menghapus data");
       updateDataToStorage();
   }
}
    

function addBukuSelesai(taskElement){

    const unreadJudul = document.querySelector(".textContainer > h2").innerText;
    const unreadPenulis = document.querySelector(".textContainer >  div > p").innerText;
    const unreadTahun = document.querySelector(".textContainer > p").innerText;
    const newMakeBuku = makeBuku(unreadJudul,unreadPenulis,unreadTahun,true);
    

    const isi = findBuku(taskElement[buku_id]);
    console.log(taskElement[buku_id]);
    isi.isCompleted = true;
    newMakeBuku[buku_id] = isi.id;
    listBukuSelesai.append(newMakeBuku);
    taskElement.remove();
    updateDataToStorage();
}
function undoBukuSelesai(taskElement) {
    const readJudul = document.querySelector(".textContainer > h2").innerText;
    const readPenulis = document.querySelector(".textContainer >  div > p").innerText;
    const readTahun = document.querySelector(".textContainer > p").innerText;

    const newMakeBuku = makeBuku(readJudul,readPenulis,readTahun,false);
    const isi = findBuku(taskElement[buku_id]);
    console.log(taskElement[buku_id]);
    isi.isCompleted = false;
    newMakeBuku[buku_id] = isi.id;
    listBukuBelumSelesai.append(newMakeBuku);
    taskElement.remove()
    updateDataToStorage();

}
