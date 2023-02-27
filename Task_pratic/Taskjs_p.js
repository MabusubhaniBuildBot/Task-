  let img_input = document.querySelector('#imgfile');
  
        let upload_img = "";
        img_input.addEventListener("change", function () {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
                upload_img = reader.result;
                document.querySelector('#displayImage').style.backgroundImage = `url(${upload_img}`;
                document.querySelector('#displayImage').style.backgroundSize = 'contain';
                document.querySelector('#displayImage').style.backgroundRepeat = 'no-repeat';

            });
            reader.readAsDataURL(this.files[0]);
        });

var totalPrize = 0;
var previousPrize = 0;
let selectedRow = null;
function onFormSubmit() {
    let formdata = readFormdata();
    if (selectedRow == null) {
        inseRnewrec(formdata)
    }
    else {
        updateData(formdata);
    }
    resetForm();
    readCardarray()
};
//Getting the data from the form input
function readFormdata() {
    let formdata = {};
    formdata["displayImage"] = document.getElementById("displayImage").value;
    formdata["imgfile"] = document.getElementById("imgfile").value;
    formdata["p_bRand"] = document.getElementById("p_bRand").value;
    formdata["p_nAme"] = document.getElementById("p_nAme").value;
    formdata["p_Model"] = document.getElementById("p_Model").value;
    formdata["p_color"] = document.getElementById("p_color").value;
    formdata["prize"] = document.getElementById("prize").value;
    formdata["textarea"] = document.getElementById("textarea").value;

    return (formdata);
}
function inseRnewrec(data) {
    let table = document.getElementById("table-data").getElementsByTagName('tbody')[0]
    let newRow = table.insertRow(table.length);

    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.upload_img;

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.p_bRand;

    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.p_nAme;

    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.p_Model;


    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.p_color;

    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.prize;

    let cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.textarea;

    let cell8 = newRow.insertCell(7);;
    cell8.innerHTML = `<button onclick="onEdit(this)">Edit</button> `

    let cell9 = newRow.insertCell(8);;
    cell9.innerHTML = `<button onclick="onDelete(this)">Delete</button> <button onclick="displayProducts()">Card</button>`



    totalPrize += parseInt(data.prize)
    document.getElementById("totalvalue").innerHTML = totalPrize;
}

//Edit the form
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    previousPrize = selectedRow.cells[5].innerHTML
    totalPrize = totalPrize - previousPrize
    document.getElementById("displayImage").value = selectedRow.cells[0].innerHTML;
    document.getElementById("p_bRand").value = selectedRow.cells[1].innerHTML;
    document.getElementById("p_nAme").value = selectedRow.cells[2].innerHTML;
    document.getElementById("p_Model").value = selectedRow.cells[3].innerHTML;
    document.getElementById("p_color").value = selectedRow.cells[4].innerHTML;
    document.getElementById("prize").value = selectedRow.cells[5].innerHTML;
    document.getElementById("textarea").value = selectedRow.cells[6].innerHTML;
    document.getElementById("totalvalue").innerHTML = totalPrize;
}
function updateData(formdata) {
    selectedRow.cells[0].innerHTML = formdata.imgfile;
    selectedRow.cells[1].innerHTML = formdata.p_bRand;
    selectedRow.cells[2].innerHTML = formdata.p_nAme;
    selectedRow.cells[3].innerHTML = formdata.p_Model;
    selectedRow.cells[4].innerHTML = formdata.p_color;
    selectedRow.cells[5].innerHTML = formdata.prize;
    selectedRow.cells[6].innerHTML = formdata.textarea;
    totalPrize += parseInt(formdata.prize);
    document.getElementById("totalvalue").innerHTML = totalPrize;
}

//delete r remove 
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        //console.log("mytable",row.cells[4].innerHTML)
        document.getElementById("table-data").deleteRow(row.rowIndex);
        let a = row.cells[5].innerHTML
        totalPrize -= parseInt(a)
        document.getElementById("totalvalue").innerHTML = totalPrize;
        resetForm();
    }
    resetForm();
}
// Reset function
function resetForm() {
    document.getElementById("imgfile").value = " ";
    document.getElementById("displayImage").value = " ";
    document.getElementById("p_details").value = " ";
    document.getElementById("p_bRand").value = " ";
    document.getElementById("p_nAme").value = " ";
    document.getElementById("p_Model").value = " ";
    document.getElementById("p_color").value = " ";
    document.getElementById("prize").value = " ";
    document.getElementById("totalvalue").value = " ";
    document.getElementById("textarea").value = " ";
    selectedRow = null;
}
//Displau card
function readCardarray() {
    let products = [];
    let objdata = {};
    objdata["imgfile"] = document.getElementById("imgfile").value;
    objdata["p_bRand"] = document.getElementById("p_bRand").value;
    objdata["p_nAme"] = document.getElementById("p_nAme").value;
    objdata["p_Model"] = document.getElementById("p_Model").value;
    objdata["p_color"] = document.getElementById("p_color").value;
    objdata["prize"] = document.getElementById("prize").value;
    objdata["textarea"] = document.getElementById("textarea").value;

    products.push(objdata);

    console.log(products)

}
function displayProducts() {
    const productContainer = document.querySelector("#product-container");

    let html = "";

    products.forEach(product => {
        html += `
        <div class="product">
          <img src="${product.imgfile}" alt="${product.name}">
          <h3>${product.p_bRand}</h3>
          <p>$${product.p_nAme}</p>
          <p>$${product.p_Model}</p>
          <p>$${product.p_color}</p>
          <p>$${product.prize}</p>
        </div>
      `;
    });

    productContainer.innerHTML = html;
}