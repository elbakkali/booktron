exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || []

exports.saveItems = () => {
  localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

exports.addItem = (item) => {
  $('#no-items').hide()
  let itemHTML = `<a class="panel-block read-item">
                    <figure class="image has-shadow is-64x64 thumb">
                      <img src="${item.screenshot}">
                    </figure>
                    <h2 class="title is-4 column">${item.title}</h2>
                  </a>`
  $('#read-list').append(itemHTML)
}
