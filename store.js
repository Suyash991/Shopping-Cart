if(document.readyState==='loading')
{
    document.addEventListener("DOMContentLoaded",ready)

}else{
    ready()
}

function ready()
{
    let removeItemButtons= document.getElementsByClassName("btn-danger");

    
    for(let i=0;i<removeItemButtons.length;i++)
    {
        var button =removeItemButtons[i];
        button.addEventListener('click',removecartItem)
    }
    var quantityInputs=document.getElementsByClassName('cart-quantity-input');
    for(let i=0;i<quantityInputs.length;i++)
    {
        let input=quantityInputs[i];
        input.addEventListener('click',quantityChanged)
    }
     let addToCartButtons=document.getElementsByClassName('shop-item-button');
     for(let i=0;i<addToCartButtons.length;i++)
     {
        let button=addToCartButtons[i]
        button.addEventListener('click',addToCartCliked)
     }
         document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseItems)

}

function purchaseItems()
{
    alert("Item are pusrchase");
    var cartItems=document.getElementsByClassName('cart-items')[0]
   while(cartItems.hasChildNodes())
   {
      cartItems.removeChild(cartItems.firstChild);
   }
   updateCartTotal();
}

function addToCartCliked(event)
{
    let button=event.target;
    var shopItem=button.parentElement.parentElement
    var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imagesrc=shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title,price,imagesrc);
    addTocardItem(title,price,imagesrc);
    updateCartTotal();
    
}

function addTocardItem(title,price,imagesrc)
{
    let newCartRow= document.createElement('div');
     
    let cartItem =document.getElementsByClassName('cart-items')[0];
    
    let cartItemNames=document.getElementsByClassName('cart-item-title')

    for(let i=0;i<cartItemNames.length;i++)
    {
        if(cartItemNames[i].innerText==title)
        {
            alert("This Item is already in the cart")
            return
        }
    }

   let cartRowContent=`
   <div class="cart-row">
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>
                </div>`
     newCartRow.innerHTML=cartRowContent;

    cartItem.append(newCartRow);
    newCartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removecartItem);
    newCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click',quantityChanged)
}

function quantityChanged(event)
{
 let input=event.target;
 
 if(isNaN((input.value))||input.value<=0)
 {
    input.value=1;
    
 }
 updateCartTotal();
}
function removecartItem(event)
{
    var buttonclick= event.target;
    buttonclick.parentElement.parentElement.remove();
    updateCartTotal();
}


function updateCartTotal()
{
  var cartItemContainer=document.getElementsByClassName('cart-items')[0];
  var cartrows=cartItemContainer.getElementsByClassName('cart-row')  ;
  var total=0;
  for(let i=0;i<cartrows.length;i++)
  {
    var cartrow= cartrows[i];
    var priceElement= cartrow.getElementsByClassName('cart-price')[0];
    var quantityElement=cartrow.getElementsByClassName('cart-quantity-input')[0];
    
    var price=parseFloat(priceElement.innerHTML.replace('$',''));
    
    var quantity=quantityElement.value;
    
    total=total+quantity*price;
  }
  total=((Math.round(total*100))/100)
  document.getElementsByClassName('cart-total-price')[0].innerText= '$'+total;
  
}