const {ipcRenderer} = require('electron')

$('.open-add-modal').click(() => {
    $('#add-modal').addClass('is-active')
})

$('.close-add-modal').click(() => {
    $('#add-modal').removeClass('is-active')
})

$('#add-button').click(() => {
    let newItemUrl = $('#item-input').val()
    // todo: validate url
    if(newItemUrl) {
        $('#item-input').prop('disabled', true)
        $('#add-button').addClass('is-loading')
        $('.close-add-modal').addClass('is-disabled')

        ipcRenderer.send('new-item', newItemUrl)
    }
})

$('#item-input').keyup((e) => {
    if(e.key === 'Enter') {
        $('#add-button').click()
    }
})

ipcRenderer.on('new-item-success', (e, item) => {
    $('#add-modal').removeClass('is-active')
    $('#item-input').prop('disabled', false).val('')
    $('#add-button').removeClass('is-loading')
    $('.close-add-modal').removeClass('is-disabled')
})