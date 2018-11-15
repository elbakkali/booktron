const {ipcRenderer} = require('electron')
const items = require('./items')
const menu = require('./menu')

$(document).keydown((e) => {
    switch(e.key) {
        case 'ArrowUp':
            items.changeItem('up')
            break;
        case 'ArrowDown':
            items.changeItem('down')
            break;
    }
})

$('.open-add-modal').click(() => {
    $('#add-modal').addClass('is-active')
    $('#item-input').focus()
})

$('.close-add-modal').click(() => {
    $('#add-modal').removeClass('is-active')
    $('#item-input').val('')
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
    if(items.toreadItems.length === 1) {
        $('.read-item:first()').addClass('is-active')
    }
})

$('#search').keyup((e) => {
    let filter = $(e.currentTarget).val()
    $('.read-item').each((i, el) => {
        $(el).text().toLocaleLowerCase().includes(filter) ? $(el).show() : $(el).hide()
    })
})

if(items.toreadItems.length) {
    items.toreadItems.forEach(items.addItem)
    $('.read-item:first()').addClass('is-active')
}