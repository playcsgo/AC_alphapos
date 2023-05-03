// Constructor function for Drink
function Drink (name, sugar, ice) {
  this.name = name,
  this.ice = ice,
  this.sugar = sugar
}
// let blackTea = new Drink('Black Tea', 'Half Sugar', 'No Ice')
// console.log(blackTea);
// console.log(blackTea.price());



// AlphaPos Constructor Function
function AlphaPos () {}

AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(option => {
    if (option.checked) {
      selectedOption = option.value
    }
  })
  return selectedOption
}

// price methods: get price according to the drink
Drink.prototype.price = function() {
  switch(this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green':
        return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}

AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(drink => {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}

AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(card => {
    card.remove()
  })
}

const orderLists = document.querySelector('[data-order-lists]')
AlphaPos.prototype.addDrink = function(drink) {
  let orderListsCard =`
<div class="card mb-3">
  <div class="card-body pt-3 pr-3">
    <div class="text-end">
      <span data-alpha-pos="delete-drink">x</span>
    </div>
    <h6 class="card-title mb-1">${drink.name}</h6>
    <div class="card-text">${drink.ice}</div>
    <div class="card-text">${drink.suger}</div>
  </div>
  <div class="card-footer text-end py-2">
    <div class="card-text text-muted">
      $ <span data-drink-price>${drink.price()}</span>
    </div>
  </div>
</div>
`

orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

// // 取得品名
// let allDrinkOptions = document.querySelectorAll('input[name="drink"]')
// allDrinkOptions.forEach(option => {
//   if (option.checked) {
//     console.log(`${option.value}: ${option.checked}`);
//   }
// })
// // 取得冰塊
// let allIceOptions = document.querySelectorAll('input[name="ice"]')
// allIceOptions.forEach(option => {
//   if (option.checked) {
//     console.log(`${option.value}: ${option.checked}`);
//   }
// })
// // 取得甜度
// let allSugarOptions = document.querySelectorAll('input[name="sugar"]')
// allSugarOptions.forEach(option => {
//   if (option.checked) {
//     console.log(`${option.value}: ${option.checked}`);
//   }
// })

const alphaPos = new AlphaPos()
const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
addDrinkButton.addEventListener('click', () => {
  
  // 1. 取得店員選取的飲料品項
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  console.log(`${drinkName}, ${ice}, ${sugar}`)
  // 2. 如果沒有選擇飲料, 跳出顯示
  if (!drinkName) {
    alert('飲料沒選')
    return
  }
  // 3. 建立飲料實例, 並取得飲料價格
  const drink = new Drink(drinkName, ice, sugar)
  console.log(drink);
  console.log(drink.price());
  // 4. 將飲料實例產生在左側訂單區畫面
  alphaPos.addDrink(drink)
})
orderLists.addEventListener('click', event => {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) return
  // get card element
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')
checkoutButton.addEventListener('click', () => {
  // 1. 計算訂單總金額
  alert(`Total amount: $${alphaPos.checkout()}`)

  // 2. 清空訂單
  alphaPos.clearOrder(orderLists)
})


