let challengeModule = (() => {
  let init = () => {
    // get page container
    let mainContainer = document.getElementById('container')

    // check if cart is accessible
    if (!Kjs.PB.getPbCartStorage()) {
      console.error('Kjs.PB.getPbCartStorage() instance not accessible at the moment. Try going back to the cart page then return to the home page. May need to reload page.')
      return
    }
    //---------------------- Store items in variables ----------------------
    
    let numItems = Kjs.PB.getPbCartStorage().cartItems.reduce((acc, cur) => {
      return acc + cur.quantity
    }, 0)

    let total1 = Kjs.PB.getPbCartStorage().orderSummary.total

    let img = Kjs.PB.getPbCartStorage().cartItems.map((row) => {
      return row.itemProperties.image.url
    })

    // ----------------------- Build HTML Popup  ---------------------------

    // popup container
    let popupContainer = document.createElement('div')
    popupContainer.className = 'pop-up'
    mainContainer.appendChild(popupContainer)

    // plant 1
    let plantImg1 = document.createElement('img')
    plantImg1.className = 'plant'
    plantImg1.src = 'https://i.postimg.cc/3RV9QJcH/1.png'
    popupContainer.appendChild(plantImg1)

    // plant 2
    let plantImg2 = document.createElement('img')
    plantImg2.className = 'plant-2'
    plantImg2.src = 'https://i.postimg.cc/mDdxjsXH/SWIEJKO-flora-2-18.png'
    popupContainer.appendChild(plantImg2)

    // close button
    let closeBtn = document.createElement('div')
    closeBtn.className = 'close-btn'
    closeBtn.innerHTML = 'x'
    popupContainer.appendChild(closeBtn)

    // number of items in cart
    let numItemsDisplayed = document.createElement('div')
    numItemsDisplayed.className = 'num-items'
    popupContainer.appendChild(numItemsDisplayed)

    let numH2 = document.createElement('h2')
    numH2.innerHTML = `You have ${numItems} ${
      numItems == 1 ? 'item' : 'items'
    } in your cart!`
    numItemsDisplayed.appendChild(numH2)

    // cart container
    let cartContainer = document.createElement('div')
    cartContainer.className = 'cart-container'
    popupContainer.appendChild(cartContainer)

    // cart items
    let uList = document.createElement('ul')
    uList.className = 'item-images'
    cartContainer.appendChild(uList)

    // pushes images into cart container
    Kjs.PB.getPbCartStorage().cartItems.forEach((product, i) => {
      let li = document.createElement('li')
      let image = document.createElement('img')
      image.src = img[i]
      uList.appendChild(li)
      li.appendChild(image)

      let priceContainer = document.createElement('div')
      priceContainer.className = 'price-container'
      li.appendChild(priceContainer)

      let displayPrice = document.createElement('p')
      displayPrice.className = 'display-price'
      displayPrice.innerHTML = product.itemPriceInfo.saleUnitprice
      priceContainer.appendChild(displayPrice)

      let displayQuantity = document.createElement('p')
      displayQuantity.className = 'display-quantity'
      displayQuantity.innerHTML = 'x' + product.quantity
      priceContainer.appendChild(displayQuantity)
    })

    // total
    let displayTotal = document.createElement('div')
    displayTotal.className = 'total'
    popupContainer.appendChild(displayTotal)
    let totalH4 = document.createElement('h4')
    totalH4.innerHTML = `Total = $${total1}`
    displayTotal.appendChild(totalH4)

    // cart button
    let cartBtn = document.createElement('div')
    cartBtn.className = 'go-to-cart'
    popupContainer.appendChild(cartBtn)

    // cart link
    let link = document.createElement('a')
    link.className = 'cart-link'
    link.href = 'https://www.kohls.com/checkout/shopping_cart.jsp'
    link.target = '_blank'
    link.innerHTML = 'GO TO CART'
    cartBtn.appendChild(link)

    // overlay
    let overlay = document.createElement('div')
    overlay.className = 'overlay'
    container.appendChild(overlay)

    // ----------------------------- Hide/Show Popup -------------------------

    let showPopup = function () {
      popupContainer.style.display = 'block'
      overlay.style.display = 'block'
    }

    let hidePopup = function () {
      popupContainer.style.display = 'none'
      overlay.style.display = 'none'
    }

    hidePopup()

    closeBtn.addEventListener('click', hidePopup)

    // ---------------------------- Scroll function --------------------------

    let checkScroll = function () {
      window.addEventListener('scroll', () => {
        let scrollPercent = Math.round(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100);

        console.log(scrollPercent);
        
        if (scrollPercent >= 90) {
          showPopup();
        }
      });
    };
    
    checkScroll();


    // -------------------------------- CSS ----------------------------------

    let styleElement = document.createElement('style')
    document.getElementsByTagName('head')[0].appendChild(styleElement)
    styleElement.innerText = `
      .pop-up {
        font-family: "Raleway", Helvetica, Arial, sans-serif;
        background-color: #ffffff;
        text-align: center;
        width: 1000px;
        height: 700px;
        margin-top: 30px;
        z-index: 200;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 5px solid #99d8e5;
        box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.22);
      }
      .plant{
        width: 350px;
        position: absolute;
        top: -126px;
        left: -60px;
      }
      .plant-2{
        width: 300px;
        position: absolute;
        bottom: -65px;
        right: -18px;
      }
      .close-btn {
        background-color: #30808d;
        color: white;
        font-size: 1.75rem;
        font-weight: 900;
        width: 60px;
        height: 43px;
        right: 50px;
        top: 15px;
        border-radius: 10%;
        position: absolute;
        cursor: pointer;
      }
      .num-items {
        padding-top: 60px;
        font-size: 26px;
        font-weight: 900;
        margin-bottom: 40px;
      }
      .num-items h2 {
        color: #464646;
        font-size: 33px;
        font-weight: 900;
      }
      .cart-container{
        height: 403px;
        width: 400px;
        margin: auto;
        overflow-y:auto;
      }
      .cart-container::-webkit-scrollbar{
        width: 10px;
      }
      .cart-container::-webkit-scrollbar-thumb{
        border-radius: 5px;
        background-color: #30808d;
        height: 100px;
      }
      .item-images {
        list-style: none;
        padding: 0;
      }
      .item-images li{
      font-size: .8rem;
      font-weight: 800;
      display: flex;
      justify-content: space-between;
      width: 70%;
      margin: auto;
      }
      .item-images img {
        width: 100px;
        margin-bottom: 20px;
      }
      .price-container{
      margin-top: 33px;
      }
      .display-price{
      margin: 0;
      }
      .display-quantity{
      margin-top: 7px;
      }
      .total {
        font-size: 28px;
        font-weight: 700;
        margin-top: 25px;
        margin-bottom: 12px;
      }
      .go-to-cart {
        background-color: #30808d;
        width: 200px;
        height: 40px;
        border-radius: 8px;
        margin: 0 auto;
        padding: 5px 0;
      }
      .cart-link{
        font-size: 1.59rem;
        font-weight: 700;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
      }
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 100;
        transition: all 0.5s;
      }
      `
  }
  return {
    init,
  }
})()
challengeModule.init()