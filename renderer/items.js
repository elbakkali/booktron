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
    console.log(direction)
    if(newItem.length) {
        activeItem.removeClass('is-active')
        newItem.addClass('is-active')
    }
}

exports.openItem = () => {
    if(!this.toreadItems.length) {
        return
    }
    let targetItem = $('.read-item.is-active')
    let contentURL = targetItem.data('url')
    console.log('opening item')
    console.log(contentURL)
}

exports.addItem = (item) => {
  $('#no-items').hide()
  let itemHTML = `<a class="panel-block read-item" data-url="${item.url}">
                    <figure class="image has-shadow is-64x64 thumb">
                      <img src="${item.screenshot}">
                    </figure>
                    <h2 class="title is-4 column">${item.title}</h2>
                  </a>`
    $('#read-list').append(itemHTML)
    $('.read-item')
    .off('click, dblclick')
    .on('click', this.selectItem)
    .on('dblclick', this.openItem)
}
