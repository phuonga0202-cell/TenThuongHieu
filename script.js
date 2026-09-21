let cart = [];


/* =========================
   THÊM SẢN PHẨM VÀO GIỎ
========================= */

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    openCart();

    showToast(`${name} đã được thêm vào giỏ hàng`);
}


/* =========================
   CẬP NHẬT GIỎ HÀNG
========================= */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    let totalItems = 0;
    let totalPrice = 0;


    cartItems.innerHTML = "";


    /* GIỎ TRỐNG */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Giỏ hàng đang trống.
            </p>
        `;

    }


    /* CÓ SẢN PHẨM */

    cart.forEach((item, index) => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    ${formatPrice(item.price)}
                </span>


                <div class="quantity-control">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>


            <div class="cart-item-right">

                <strong>
                    ${formatPrice(
                        item.price * item.quantity
                    )}
                </strong>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    Xóa

                </button>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        formatPrice(totalPrice);
}


/* =========================
   TĂNG SỐ LƯỢNG
========================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


/* =========================
   GIẢM SỐ LƯỢNG
========================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


/* =========================
   XÓA SẢN PHẨM
========================= */

function removeFromCart(index) {

    const productName =
        cart[index].name;

    cart.splice(index, 1);

    updateCart();

    showToast(
        `${productName} đã được xóa`
    );
}


/* =========================
   MỞ GIỎ HÀNG
========================= */

function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");

    document
        .getElementById("cart-overlay")
        .classList.add("active");
}


/* =========================
   ĐÓNG / MỞ GIỎ
========================= */

function toggleCart() {

    document
        .getElementById("cart")
        .classList.toggle("active");

    document
        .getElementById("cart-overlay")
        .classList.toggle("active");
}


/* =========================
   FORMAT GIÁ
========================= */

function formatPrice(price) {

    return price.toLocaleString("vi-VN") + "₫";
}


/* =========================
   THÔNG BÁO
========================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);
}


/* =========================
   MUA HÀNG
========================= */

function checkout() {

    if (cart.length === 0) {

        showToast(
            "Bạn chưa chọn sản phẩm nào!"
        );

        return;
    }


    let total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    alert(
        "Đặt hàng thành công!\n\n" +
        "Tổng tiền: " +
        formatPrice(total) +
        "\n\n" +
        "Đây là bản demo."
    );
}