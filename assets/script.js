var selectedRow = null;

//show alert
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 1000);
}   

//clear all fields
function clearFields(){
    document.querySelector("#FirstName").value = "";
    document.querySelector("#LastName").value = "";
    document.querySelector("#rollNo").value = "";
}

//add data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // get form value
    const FirstName = document.querySelector("#FirstName").value;
    const LastName = document.querySelector("#LastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    //validate
    if(FirstName == "" || LastName == "" || rollNo == ""){
        showAlert("tolong di isi semua", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${FirstName}</td>
            <td>${LastName}</td>
            <td>${rollNo}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">EDIT</a>
                <a href="#" class="btn btn-danger btn-sm delete">DELETE</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student added", "success");            
        }
        else{
            selectedRow.children[0].textContent = FirstName;
            selectedRow.children[1].textContent = LastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert("student info edit", "info")
        }
        clearFields();
    }
});

//edit data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#FirstName").value = selectedRow.children[0].textContent;
        document.querySelector("#LastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
    }
})

//delete data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student data delete", "danger");
    }
});