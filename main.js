function updatePhoto() {
  var updatedGlaze = document.getElementById("option-title--glaze").value;
  //   var image = document.getElementsByClassName("product-photo");
  var image = document.getElementById("large-photo");
  image.src = "images/menu_original_" + updatedGlaze + ".jpg";
  // console.log(image.src);
}

function updatePrice(selectedQty) {
  //   var price = document.getElementsByClassName("option-content")[2];
  var price = document.getElementById("totalPrice");

  if (selectedQty == "1") {
    price.innerHTML = "$3.50";
  } else if (selectedQty == "3") {
    price.innerHTML = "$10.50";
  } else if (selectedQty == "6") {
    price.innerHTML = "$21.00";
  } else if (selectedQty == "12") {
    price.innerHTML = "$42.00";
  }
}

function foodItem(name, glazing, price, photo, qty) {
  this.name = name;
  this.glazing = glazing;
  this.price = price;
  this.photo = photo;
  this.qty = qty;
}

function addedQty() {
  let qtyOption = document.getElementsByTagName("input");
  let value;
  for (let i = 0; i < qtyOption.length; i++) {
    if (qtyOption[i].type === "radio" && qtyOption[i].checked) {
      return (value = qtyOption[i].value);
    }
  }
}

var cartArray = [];

function addToCart(name) {
  currentPrice = document.getElementById("totalPrice").innerHTML.replace(/(\r\n|\n|\r)/gm, "");

  currentGlazing = document.getElementById("option-title--glaze").value;
  //   console.log("Current glazing: " + currentGlazing);

  currentPhoto = document.getElementById("large-photo").src;

  currentQty = addedQty();
  console.log(currentQty);

  currentName = name;

  var newItem = new foodItem(name, currentGlazing, currentPrice, currentPhoto, currentQty);

  cartArray = JSON.parse(localStorage.getItem("addedItem") || "[]");
  cartArray.push(newItem);
  // console.log(cartArray);

  localStorage.setItem("addedItem", JSON.stringify(cartArray));
  // console.log(localStorage.getItem("addedItem"));

  updateCartLabel();
}

function updateCartLabel() {
  cartArray = JSON.parse(localStorage.getItem("addedItem") || "[]");

  var cartSize = cartArray.length;

  if (cartSize > 0) {
    var cartLabel = document.getElementById("navBarCart");
    cartLabel.innerHTML = "Cart (" + cartSize + ")";
  }
}
updateCartLabel();

/////////////////////////////////////////////////////////////////////

//update cart-item
function updateCartItem() {
  cartArray = JSON.parse(localStorage.getItem("addedItem") || "[]");
  // console.log(cartArray);
  var item = document.getElementById("cart-item");
  console.log(item);
  item.textContent = "";

  for (let i = 0; i < cartArray.length; i++) {
    // var cartItemPhoto = document.getElementById("cart-item__photo--id");
    // // var cartItemName = document.getElementById("cart-item__title--id");
    // var cartItemPrice = document.getElementById("cart-item__price--id");
    // var cartItemGlaze = document.getElementById("cart-item__glaze--id");
    // var cartItemQty = document.getElementById("cart-item__qty__dropdown--id");

    // cartItemPhoto.src = cartArray[i].photo;
    // cartItemPrice.innerHTML = cartArray[i].price;
    // cartItemGlaze.innerHTML = cartArray[i].glazing;
    // cartItemQty.innerHTML = cartArray[i].qty;

    item.append(
      `
      <div class="cart-item__column">
        <div class="cart-item__checkbox">
            <img id="cart-item__checkbox--activated" src="images/btn_checkbox_activated.jpg">
        </div>
      </div>

      <div class="cart-item__column">
        <img class="cart-item__photo" id="cart-item__photo--id" src="images/menu_original.jpg" alt="photo of cart added items">
      </div>
  
      <div class="cart-item__column">
        <div class="cart-item__option--price">
          <div class="cart-item__option--title" id="cart-item__title--id">
              Original 
          </div>
          <div class="cart-item__option--price" id="cart-item__price--id">
              $3.75
          </div>
        </div>
        <div class="cart-item__option">
          Glaze: &nbsp; <span id="cart-item__glaze--id">None</span>
        </div>
        <div class="cart-item__option">
          Qty: &nbsp; <span id="cart-item__qty__dropdown--id">1</span>
        </div>
        <div class="cart-item__option">
          Free delivery
        </div>
        <div class="cart-item__remove">
          Remove 
       </div> 
      </div>
      `
    );
  }
  if (cartArray.length == 0) {
    item.append(
      `
      <span>Empty!</span>
      `
    );
  }
}

updateCartItem();

//remove cart-item
