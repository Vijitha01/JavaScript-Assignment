const tables=document.querySelectorAll(".card"),
menu=document.querySelectorAll(".cardprice");
let demo=document.querySelector("#table1");
let demo2=document.querySelector("#table2");
let demo3=document.querySelector("#table3");
demo.addEventListener('click',()=>demo.style.backgroundColor='orange')
demo2.addEventListener('click',()=>demo2.style.backgroundColor='orange')
demo3.addEventListener('click',()=>demo3.style.backgroundColor='orange')
for (const card1 of menu){
    card1.addEventListener("dragstart",(e)=>{
        e.dataTransfer.setData("text/plain",card1.id);
    });
}
for (const table of tables){
    table.addEventListener("dragover",(e)=>{
        e.preventDefault();
    });

    table.addEventListener("drop",(e)=>{
        e.preventDefault();
        const card1Id=e.dataTransfer.getData("text/plain");
        const itemcosttext=parseInt(document.getElementById(card1Id).nextElementSibling.textContent);
        const tableId=table.id;
        const countitem=document.getElementById(`${tableId}-count`);
        const count=parseInt(countitem.textContent);
        const newcount=count+1;
        countitem.textContent=newcount;

        const costitem=document.getElementById(`${tableId}-cost`);
        const cost=parseInt(costitem.textContent);
        const newcost=cost+itemcosttext;
        costitem.textContent=newcost;
        addItems(table,card1Id,itemcosttext);
    });
    table.addEventListener("click", () => {
        const countitem = document.getElementById(`${table.id}-count`);
        const count = parseInt(countitem.textContent);
        const costitem = document.getElementById(`${table.id}-cost`);
        const cost = parseInt(costitem.textContent);
        const popup = document.getElementById("table-popup");
        const popupTitle = document.querySelector(".order-summary-popup-title");
        const popupMessage = document.querySelector(".order-summary-total");
        popupTitle.textContent = `Table-${table.id.slice(5)} | Order Details`;   
        popup.style.display = "block";
        popupMessage.textContent =  `Total Amount Rs.${cost}`;
      
        const rows = document.querySelectorAll(".order-summary-table tr");
        let counter = 1;
        rows.forEach((row) => {
            if ((row.getAttribute("tableno") === table.id) ){
              row.style.display = "table-row";
              row.querySelector(".serial").innerHTML=`${counter}`;
              counter++;
            } 
            else {
              if(row.getAttribute("class")==="order-summary-head"){
                row.style.display = "table-row";
                
              }
              else{
              row.style.display = "none";
              }
            }
          });
    });
}
function addItems(table,card1Id,itemcosttext){
    const addeditem = document.querySelector(".order-summary-table");
    const existingRow = Array.from(addeditem.rows).find(row =>
      row.getAttribute("tableno") == table.id &&
      row.querySelector("[type='name']").textContent === document.getElementById(card1Id).textContent
    );
    if (existingRow) {
        const noOfServingsCell = existingRow.querySelector("[type='no_servings']");
        noOfServingsCell.textContent = parseInt(noOfServingsCell.textContent) + 1;
      } else {
        const childrow = addeditem.insertRow();
        childrow.setAttribute("tableno", table.id);
    
        const serial = childrow.insertCell();
        serial.setAttribute("class", "serial");
        serial.innerHTML = addeditem.rows.length - 1;
    
        const name = document.getElementById(card1Id).textContent;
        const childcolumn1 = childrow.insertCell();
        childcolumn1.setAttribute("type", "name");
        childcolumn1.innerHTML = name;
    
        const childcolumn2 = childrow.insertCell();
        childcolumn2.setAttribute("type", "price");
        childcolumn2.innerHTML = itemcosttext;
    
        const no_of_servings = 1;
        const childcolumn3 = childrow.insertCell();
        childcolumn3.setAttribute("type", "no_servings");
        childcolumn3.innerHTML = no_of_servings;

        const plusButton = document.createElement("button");
        plusButton.innerHTML = "+";
        plusButton.style.marginRight = "5px"; 
        plusButton.addEventListener("click", () => {
        const noOfServingsCell = childrow.querySelector("[type='no_servings']");
        const noOfServings = parseInt(noOfServingsCell.textContent) + 1;
        noOfServingsCell.textContent = noOfServings;
  
        const countitem = document.getElementById(`${table.id}-count`);
        const count = parseInt(countitem.textContent);
        countitem.textContent = count + 1;
  
        const costitem = document.getElementById(`${table.id}-cost`);
        const cost = parseInt(costitem.textContent);
        costitem.textContent = cost + itemcosttext;
  
        const popupMessage = document.querySelector(".order-summary-total");
        popupMessage.textContent = `Total Amount Rs.${cost + itemcosttext}`;
      });
  const minusButton = document.createElement("button");
    minusButton.innerHTML = "-";
    minusButton.style.marginRight = "5px"; 
    minusButton.addEventListener("click", () => {
      const noOfServingsCell = childrow.querySelector("[type='no_servings']");

      if (parseInt(noOfServingsCell.textContent) > 0) {
        const noOfServings = parseInt(noOfServingsCell.textContent) - 1;
        noOfServingsCell.textContent = noOfServings;

        const countitem = document.getElementById(`${table.id}-count`);
        const count = parseInt(countitem.textContent);
        countitem.textContent = count - 1;

        const costitem= document.getElementById(`${table.id}-cost`);
        const cost = parseInt(costitem.textContent);
        costitem.textContent = cost - itemcosttext;

        const popupMessage = document.querySelector(".order-summary-total");
        popupMessage.textContent = ` Total Amount Rs.${cost - itemcosttext}`;
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.id = 'delete-button';
    // create img add it to delete-button
    const deleteImage = document.createElement('img');
    deleteImage.src = 'delete.svg';
    deleteButton.appendChild(deleteImage);
    deleteButton.style.marginRight = "5px"; // Add
    deleteButton.addEventListener("click", () => {
      childrow.remove();
      const noOfServingsCell = childrow.querySelector("[type='no_servings']");
      const countitem = document.getElementById(`${table.id}-count`);
      const count = parseInt(countitem.textContent);
      countitem.textContent = count - 1;
    
      const costitem = document.getElementById(`${table.id}-cost`);
      const cost = parseInt(costitem.textContent);
      costitem.textContent = cost - (itemcosttext* parseInt(noOfServingsCell.textContent));
    
      const popupMessage = document.querySelector(".order-summary-total");
      popupMessage.textContent = ` Total Amount Rs.${cost - (itemcosttext * parseInt(noOfServingsCell.textContent))}`;

      
    });
        
    const childcolumn4=document.createElement("td");
    childcolumn4.setAttribute("type", "buttons");
    childrow.appendChild(childcolumn4);
    childcolumn4.appendChild(plusButton);
    childcolumn4.appendChild(minusButton);
        const childcolumn5 = document.createElement("td");
        childcolumn5.setAttribute("type", "buttons");
        childrow.appendChild(childcolumn5);
        childcolumn5.appendChild(deleteButton);

    }
}
function closeTablePopup() {
    const popup = document.getElementById("table-popup");
    popup.style.display = "none";
 }
 function closeSession() {
  const orderSummaryPopup = document.getElementById('table-popup');
  orderSummaryPopup.style.display = 'none';
}
let popup=document.getElementById("popup");
function openPopup(){
  popup.classList.add("open-popup");
}
function closePopup(){
  popup.classList.remove("open-popup");
}
const searchInput = document.querySelector( ".search-container input" );
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
    const searchTerm =searchInput.value.toLowerCase();

    cards.forEach((card) => {
        const title = card
            .querySelector(".itemname")
            .textContent.toLowerCase();

        if (title.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

const searchmenu=document.getElementById("search-item")
searchmenu.addEventListener("input",searchMenu);
function searchMenu(){
    const input=document.querySelector("#search-item input");
    const filter=input.value.toUpperCase();
    const items=document.querySelectorAll(".card1");
    items.forEach(item=>{
        const itemtype=item.querySelector(".cardprice").getAttribute("itemtype");
        const name=item.querySelector(".cardprice").textContent.toUpperCase();
        if(name.includes(filter)||itemtype.toUpperCase()===filter){
            item.style.display="";
        }
        else{
            item.style.display="none";
        }
    });
}
 
