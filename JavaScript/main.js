let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('create');
let update = document.getElementsByClassName('update');
let del = document.getElementsByClassName('delete');
let search = document.getElementById('search');


let mode = "create";
let tmp;
// Steps we want to do

// 1. get total
function getTotal() {
    if (price.value !== '') {
        let result = +price.value + +tax.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    } else {
        total.style.backgroundColor = 'rgb(129, 13, 13)';
        total.innerHTML = '';
    }
}
// 2. create product
let dataProduct;

if (localStorage.getItem('product') !== null) {
    dataProduct = JSON.parse(localStorage.getItem('product'));
} else {
    dataProduct = [];
}

submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    // 8. count
    if (title.value !== '' && price.value !== '' && category.value !== '' && count.value <= 100) {
        if (mode === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[tmp] = newProduct;
            mode = "create";
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        } clearData();
    }

    // 3. save in local storage
    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData();
}
// 4. clear inputs
clearData = function () {
    title.value = '';
    price.value = '';
    tax.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.backgroundColor = 'rgb(129, 13, 13)';
}
// 5. read product
showData = function () {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tax}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" class="update">update</button></td>
            <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
        </tr>`;
    }
    if (table !== '') {
        document.getElementById('delete').innerHTML = `<button onclick="deleteAll()" style="width:100% ; padding:5px 4px">Delete All (${dataProduct.length})</button>`;
    } else {
        document.getElementById('delete').innerHTML = '';
    }
    document.getElementById('tbody').innerHTML = table;
}
showData();


// 6. delete product
deleteData = function (e) {
    dataProduct.splice(e, 1);
    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData();
}

del.onclick = function () {

}
// 7. delete all product in one click

deleteAll = function () {
    dataProduct = [];
    localStorage.clear();
    showData();
}

// 8. update product
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    tax.value = dataProduct[i].tax;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update';
    mode = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// 10. search product

let searchMode = 'title';

function getSearchMode(e) {
    if (e === 'searchTitle') {
        searchMode = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMode = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
}


function searchData(value) {
    let table = '';
    if (searchMode === 'title') {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value)) {
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].tax}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" class="update">update</button></td>
                    <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                    </tr>`;
            }
        }
    } else {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value)) {
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].tax}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" class="update">update</button></td>
                    <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                    </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}



// 11. clean data