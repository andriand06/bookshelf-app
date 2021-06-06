document.addEventListener("DOMContentLoaded",function(){
    const formBuku = document.getElementById("inputBuku");
    const isComplete = document.getElementById("selesai");
    const searchForm = document.getElementById("searchForm");
  
    formBuku.addEventListener("submit",function(event){
        event.preventDefault();
        
        addBuku();
    });

    searchForm.addEventListener("submit",function (e) {
        e.preventDefault();
        searchBuku();
        
    })
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