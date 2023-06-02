const overlay = $("#overlay");
const btnUpload = $("#btn-upload");
const REST_API_URL = `http://localhost:8080/gallery`;

loadAllImages();

btnUpload.on('click',()=> overlay.removeClass('d-none'))
overlay.on('click',(eventData)=>{
    if (eventData.target===overlay[0]) overlay.addClass('d-none');
})
$(document).on('keydown',(evt)=>{
    if (evt.key === 'Escape')
        overlay.addClass('d-none');
})

function loadAllImages(){
    const jqxhr = $.ajax(`${REST_API_URL}/images`);
    jqxhr.done((imageUrlList)=>{
        imageUrlList.forEach(imageUrl=>{
            const divElm =$(`<div class="image"></div>`);
            divElm.css('background-image',`url(${imageUrl})`);
            $('main').append(divElm);
        });
    });
}