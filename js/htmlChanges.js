function toggleMemeEditorPopup(){
    var elMemeEditorPopup = document.querySelector('.memeEditorPopup');
    if (elMemeEditorPopup.classList.contains('hidden')) {
        elMemeEditorPopup.classList.remove('hidden');
    }else{
        elMemeEditorPopup.classList.add('hidden');
    }
}

function toggleColorEditorPopup(){
    var elMemeEditorPopup = document.querySelector('.colorEditorPopup');
    if (elMemeEditorPopup.classList.contains('hidden')) {
        elMemeEditorPopup.classList.remove('hidden');
    }else{
        elMemeEditorPopup.classList.add('hidden');
    }
}