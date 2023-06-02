const overlay = $("#overlay");
const btnUpload = $("#btn-upload");
const dropZoneElm = $("#drop-zone");
const mainElm = $('main');

const REST_API_URL = `http://localhost:8080/gallery`;
const cssLoaderHtml = `<div class="lds-facebook"><div></div><div></div><div></div></div>`


loadAllImages();

btnUpload.on('click',()=> overlay.removeClass('d-none'));
overlay.on('click',(eventData)=>{
    if (eventData.target===overlay[0]) overlay.addClass('d-none');
});
$(document).on('keydown',(evt)=>{
    if (evt.key === 'Escape')
        overlay.addClass('d-none');
});

dropZoneElm.on('dragover',(evt)=>{
    evt.preventDefault();
});

dropZoneElm.on('drop',(evt)=>{
    evt.preventDefault();
    const droppedFiles = evt.originalEvent.dataTransfer.files;
    ///filter image Files and print it
  const imageFiles = Array.from(droppedFiles).filter(file => file.type.startsWith("image/"));
    if (!imageFiles.length) return;
    overlay.addClass("d-nome");
    uploadImages(imageFiles);



});

function uploadImages(imageFiles) {
    imageFiles.forEach(imageFile=>{
        const divElm = $(`<div class="image"></div>`);
        mainElm.append(divElm);
    })
}
overlay.on('dragover', (evt) => evt.preventDefault());
overlay.on('drop', (evt) => evt.preventDefault());



function loadAllImages(){
    const jqxhr = $.ajax(`${REST_API_URL}/images`);
    jqxhr.done((imageUrlList)=>{
        imageUrlList.forEach(imageUrl=>{
            const divElm =$(`<div class="image">
                                 <div class="d-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-down" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"/>
                                      <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
                                    </svg>
                                 </div>  
                               </div>`);
            divElm.css('background-image',`url(${imageUrl})`);
            $('main').prepend(divElm);
        });
    });
}
const imgElm = $('.image');
imgElm.on('mouseover',()=>{

    $('.image>div').removeClass("d-none");

})
