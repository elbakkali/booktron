exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || []

exports.saveItems = () => {
  localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

exports.selectItem = (e) => {
    $('.read-item').removeClass('is-active')
    $(e.currentTarget).addClass('is-active')
}

exports.changeItem = (direction) => {
    let activeItem = $('.read-item.is-active')
    let newItem = (direction === 'down') ? activeItem.next('.read-item') : activeItem.prev('.read-item')
    if(newItem.length) {
        activeItem.removeClass('is-active')
        newItem.addClass('is-active')
    }
}

window.deleteItem = (i = false) => {
    if(i === false) i = ($('.read-item.is-active').index() - 1)

    $('.read-item').eq(i).remove()
      this.toreadItems = this.toreadItems.filter((item, index) => {
      return index !== i
    })
  
    this.saveItems()
  
    if (this.toreadItems.length) {
        let newIndex = (i === 0) ? 0 : i - 1
        $('.read-item').eq(newIndex).addClass('is-active')
      } else {
      $('#no-items').show()
    }
}  

window.openInBrowser = () => {
    if(!this.toreadItems.length) {
        return
    }

    let targetItem = $('.read-item.is-active')

    require('electron').shell.openExternal(targetItem.data('url'))
}

window.openItem = () => {
    if(!this.toreadItems.length) {
        return
    }
    let targetItem = $('.read-item.is-active')
    let contentURL = encodeURIComponent(targetItem.data('url'))
    let itemIndex = targetItem.index() - 1
    let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}&itemIndex=${itemIndex}`
    let readerWin = window.open(readerWinURL, targetItem.data('title'))
}

exports.addItem = (item) => {
  $('#no-items').hide()
  let itemHTML = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
                    <figure class="image has-shadow is-64x64 thumb">
                      <img src="${item.screenshot}">
                    </figure>
                    <h2 class="title is-4 column">${item.title}</h2>
                  </a>`
    $('#read-list').append(itemHTML)
    $('.read-item')
    .off('click, dblclick')
    .on('click', this.selectItem)
    .on('dblclick', window.openItem)
}
