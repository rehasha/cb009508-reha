
//Variables available to all code
let amount;
let Dontype;
let name ;
let email ;
let address; 
let country ;
let cardNumber; 
let pinNumber ;
let cardholderName ;
let monthInput  ;
let yearInput ;

const form = document.querySelector("form");
const cost = document.getElementsByName("amount");
const donation = document.getElementById("donation")
const fullname = document.getElementById("fname");
const mail = document.getElementById("email");
const addr_pattern = document.getElementById("address");
const coun = document.getElementById("country");
const txtNumber = document.getElementById("cardN");
const pin = document.getElementById("cvv");
const txtName = document.getElementById("cardh");
const month = document.getElementById("monthInput");
const year = document.getElementById("yearInput");
const btnSubmit = document.getElementById("Submit");

btnSubmit.addEventListener("click",submit);

function submit(evt){
  evt.preventDefault();
  donationsChecked = false;
  if (cost.forEach(  c => {
    if (c.checked) {
      donationsChecked = true;
    }
  }));
  if (form.checkValidity()) {
    if (donationsChecked) {
      alert("Thank You for the donation. You will get an email.");
      resetForm();
    } else {
      alert("Please select a donation amount");
    }
    
  } else {
    alert("Please check all the fields");
  }
  
}

function resetForm() {
  cost.forEach(a => a.checked = false);
  donation.value="";
  year.value = 'year';
  month.value='month';
 [fullname,mail,addr_pattern,coun,txtNumber,pin,txtName].forEach(input => {
    input.value = '';
  });

}

   