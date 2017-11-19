function toggleMemeEditorPopup(){
    var elMemeEditorPopup = document.querySelector('.memeEditorPopup');
    if (elMemeEditorPopup.classList.contains('hidden')) {
        elMemeEditorPopup.classList.remove('hidden');
    }else{
        elMemeEditorPopup.classList.add('hidden');
    }
}