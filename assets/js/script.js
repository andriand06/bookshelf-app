document.addEventListener("DOMContentLoaded",function(){
    const formBuku = document.getElementById("inputBuku");
    const isComplete = document.getElementById("selesai");
    
  
    formBuku.addEventListener("submit",function(event){
        event.preventDefault();
        
        addBuku();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved",() => {
    console.log("data berhasil disimpan");
});

document.addEventListener("ondataloaded",() => {
    refreshDataFromBuku();
})