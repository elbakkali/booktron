const {ipcRenderer} = require('electron')
const items = require('./items')

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
    items.toreadItems.push(item)
    items.saveItems()
    items.addItem(item)
    
    $('#add-modal').removeClass('is-active')
    $('#item-input').prop('disabled', false).val('')
    $('#add-button').removeClass('is-loading')
    $('.close-add-modal').removeClass('is-disabled')
})

$('#search').keyup((e) => {
    let filter = $(e.currentTarget).val()
    $('.read-item').each((i, el) => {
        $(el).text().toLocaleLowerCase().includes(filter) ? $(el).show() : $(el).hide()
    })
})

if(items.toreadItems.length) {
    items.toreadItems.forEach(items.addItem)
}