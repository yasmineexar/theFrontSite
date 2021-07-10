if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var addToCartButtons = document.getElementsByClassName('coeur')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    var removeCartItemButtons = document.getElementsByClassName('fa-trash-o')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var removeIconeButtons = document.getElementsByClassName('fa-pencil-square-o')
    for (var i = 0; i < removeIconeButtons.length; i++) {
        var button = removeIconeButtons[i]
        button.addEventListener('click', removeIcone)
    }
}

function removeIcone(event) {
    if (confirm(`\nTu es sur le point d\'envoyer ta candidature à l\'entreprise qui a publié cette offre. \n \nEs-tu sur de vouloir continuer ?`)) {
        var buttonClicked = event.target
        let x = $(event.target.parentElement.parentElement)
        buttonClicked.remove()
        x.html(`<button><i class="fa fa-download"></i></button>`);
        document.body.append(x);
    } else {
        return
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
}

function addToCartClicked(event) {
    var button = event.target
    var cardHeader = button.parentElement.parentElement
    var title = cardHeader.getElementsByClassName('card-title')[0].innerText
    var imageSrc = cardHeader.getElementsByClassName('card-image')[0].src
    addItemToCart(title, imageSrc)
}

function addItemToCart(title, imageSrc) {
    var cartRow = document.createElement('tr')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    console.log(cartItemNames.innerText)
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('\nCette offre est déja dans tes favoris !')
            return
        }
    }
    var cartRowContents = `
        <td class="cart-item-image"><a href="Entreprise.html"> <img width='40px' height='40px'
            src="${imageSrc}" class="img-thumbnail rounded-circle navbar-brand pdp" alt="User">
        </a></td>
        <td class="cart-item-title">${title}</td>
        <td>Confirmé</td>
        <td class="cart-item-icon"><button><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
        <td><button><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('fa-pencil-square-o')[0].addEventListener('click', removeIcone)
    cartRow.getElementsByClassName('fa-trash-o')[0].addEventListener('click', removeCartItem)
}
