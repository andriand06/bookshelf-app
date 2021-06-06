const STORAGE_KEY = "list_buku";

let buku = [];

function  isStorageExist() {
    if(typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function  saveData() {
    const parsed = JSON.stringify(buku);
    localStorage.setItem(STORAGE_KEY,parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data !== null)
        buku = data;
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
    saveData();
}

function composeBuku(judul,penulis,tahun,isCompleted) {
    return {
        id : +new Date(),
        judul,
        penulis,
        tahun,
        isCompleted
    };
}

function findBuku(idBuku) {
    for(isi of buku) {
        if(isi.id === idBuku)
            return isi;
    }
    return null;
}

function  findBukuIndex(idBuku) {
    let index = 0;
    for (isi of buku){
        if(isi.id === idBuku)
            return index;


        index++;

    }
    return -    1;
}

function  refreshDataFromBuku() {
    const listBukuBelumSelesai = document.getElementById("belumselesai");
    let listBukuSelesai = document.getElementById("sudahselesai");

    for(isi of buku) {
        const newMakeBuku = makeBuku(isi.judul,isi.penulis,isi.tahun,isi.isCompleted);
        newMakeBuku[buku_id] = isi.id;

        if(isi.isCompleted) {
            listBukuSelesai.append(newMakeBuku);
        } else {
            listBukuBelumSelesai.append(newMakeBuku);
        }
    }
}

function searchBuku() {
    const cari = document.getElementById("cari").value;
    let filter = cari.toUpperCase();
    
    const container = document.querySelectorAll(".container");

    for (var i=0;i < container.length; i++) {
        let textContainer = container[i].getElementsByClassName("textContainer");
        for(var j=0;j < textContainer.length;j++) {
            h2 = textContainer[j].querySelectorAll("h2")[0];
            text = h2.innerText;
            
            if (text.toUpperCase().indexOf(filter) > -1) {
                container[i].style.display = "";
            } else {
                container[i].style.display = "none";
            }
        }
      
    }   
    
}