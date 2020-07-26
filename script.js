// Creating event listeners to make this webpage a Single Page Application (SPA)
var showHome = document.getElementById('home');
showHome.addEventListener('click', function()
{
	document.getElementById('event-info').style.display = 'block';
	document.getElementById('reg-form').style.display = 'none';
	document.getElementById('reg-table').style.display = 'none';
});

var showForm = document.getElementById('form')
showForm.addEventListener('click', function()
{
	document.getElementById('event-info').style.display = 'none';
	document.getElementById('reg-form').style.display = 'block';
	document.getElementById('reg-table').style.display = 'none';
	document.getElementById('reg-form').style.backgroundImage = "url('bg2.png')";
	document.getElementById('reg-form').style.backgroundRepeat = 'no-repeat';
	document.getElementById('reg-form').style.backgroundSize = '100% 780px';
});

var showData = document.getElementById('data');
showData.addEventListener('click', function()
{
	document.getElementById('event-info').style.display = 'none';
	document.getElementById('reg-form').style.display = 'none';
	document.getElementById('reg-table').style.display = 'block';
	document.getElementById('reg-table').style.backgroundImage = "url('bg1.png')";
	document.getElementById('reg-table').style.backgroundRepeat = 'no-repeat';
	document.getElementById('reg-table').style.backgroundSize = '100% 780px';
});

// Array to store the registrants' data in string form
var registrantData = [];

// formValidation() function will validate the form
function formValidation()
{
	// A variable which will act as a counter whenever an error is found in the form
	var access = 0;

	// Checking if the name field is empty or not
	if(document.getElementsByName('name')[0].value == '')
	{
		document.getElementById('error1').textContent = "Name Required!";
		document.getElementById('error1').style.fontSize = '12px';
		document.getElementById('error1').style.color = 'red';
		document.getElementById('error1').style.margin = '0px';
		document.getElementById('error1').style.fontWeight = 'bold';
		access++;
	}

	// Checking if the email id valid or not
	if((document.getElementsByName('email')[0].value.indexOf('@') === -1 ) && ((document.getElementsByName('email')[0].value.indexOf('.com') === -1) || (document.getElementsByName('email')[0].value.indexOf('.in') === -1)))
	{
		document.getElementById('error2').textContent = "Invalid email id!";
		document.getElementById('error2').style.fontSize = '12px';
		document.getElementById('error2').style.color = 'red';
		document.getElementById('error2').style.margin = '0px';
		document.getElementById('error2').style.fontWeight = 'bold';
		access++;
	}

	// Checking if the phone number is valid or not
	if(document.getElementsByName('phone')[0].value.length !== 10)
	{
		document.getElementById('error3').textContent = "Please enter a 10-digit number!";
		document.getElementById('error3').style.fontSize = '12px';
		document.getElementById('error3').style.color = 'red';
		document.getElementById('error3').style.margin = '0px';
		document.getElementById('error3').style.fontWeight = 'bold';
		access++;
	}

	// Checking if the age is valid or not
	if((Number(document.getElementsByName('age')[0].value) < 10) || (Number(document.getElementsByName('age')[0].value) > 100))
	{
		document.getElementById('error4').textContent = "Allowed age is between 10 to 100!";
		document.getElementById('error4').style.fontSize = '12px';
		document.getElementById('error4').style.color = 'red';
		document.getElementById('error4').style.margin = '0px';
		document.getElementById('error4').style.fontWeight = 'bold';
		access++;
	}

	// Checking if the workshop is selected or not
	if(document.getElementById('check1').checked == false && document.getElementById('check2').checked == false && document.getElementById('check3').checked == false)
	{
		document.getElementById('error5').textContent = "Please select a workshop!";
		document.getElementById('error5').style.fontSize = '12px';
		document.getElementById('error5').style.color = 'red';
		document.getElementById('error5').style.margin = '0px';
		document.getElementById('error5').style.fontWeight = 'bold';
		access++;
	}

	// Checking if the slot is selected or not
	if(document.getElementById('op1').selected == true)
	{
		document.getElementById('error6').textContent = "Please select a slot!";
		document.getElementById('error6').style.fontSize = '12px';
		document.getElementById('error6').style.color = 'red';
		document.getElementById('error6').style.margin = '0px';
		document.getElementById('error6').style.fontWeight = 'bold';
		access++;
	}
	
	// Checking whether the form should be submitted or not
	if(access == 0)
	{
		console.log('Submitted!');
		var name = document.getElementsByName('name')[0].value;
		var email = document.getElementsByName('email')[0].value;
		var phone = document.getElementsByName('phone')[0].value;
		var age = document.getElementsByName('age')[0].value;
		var workShopElements = document.getElementsByName('check');
		var workShop;
		
		// Finding the selected workshop 		
		for(let i = 0; i < workShopElements.length; i++)
		{
			if(workShopElements[i].checked == true)
			{
				workShop = workShopElements[i].value;
				break;
			}
		}

		// Finding the selected slot
		var slotElements = document.getElementsByName('option');
		var slot;
		for(let i = 0; i < slotElements.length; i++)
		{
			if(slotElements[i].selected == true)
			{
				slot = slotElements[i].value;
				break;
			}
		}

		// Calling a function which will add the registrant's data into the table and to the array
		addRegistrantData(name,email,phone,age,workShop,slot);

		// Emptying the form after submission
		document.getElementsByName('name')[0].value = '';
		document.getElementsByName('email')[0].value = '';
		document.getElementsByName('phone')[0].value = '';
		document.getElementsByName('age')[0].value = '';
		document.getElementById('error1').textContent = "";
		document.getElementById('error2').textContent = "";
		document.getElementById('error3').textContent = "";
		document.getElementById('error4').textContent = "";
		document.getElementById('error5').textContent = "";
		document.getElementById('error6').textContent = "";
		document.getElementById('check1').checked = false;
		document.getElementById('check2').checked = false;
		document.getElementById('check3').checked = false;
	}
	else
	{
		// Unable to register due to the invalid details of the registrant
		console.log("Can't submit form!");
		document.getElementById('altHeading').textContent = 'No registrations yet!';
	}
}

// addRegistrantData() function will add the registrant's data into the table as well as into the array
function addRegistrantData(name,email,phone,age,workShop,slot)
{
	var dataTable = document.getElementById('data-table');
	var tHeader = document.createElement('thead');
	dataTable.style.display = 'block';
	dataTable.style.borderWidth = '4px';
	dataTable.style.borderColor = 'black';
	dataTable.style.borderStyle = 'solid';
	var timeStamp = currentTime();

	// Checking whether the table has any pre-existing data or not
	if(dataTable.tHead == null)
	{
		document.getElementById('altHeading').textContent = '';
		var tablePage = document.getElementById('reg-table');
		
		// Creating the table head and adding the registrant's data into the row
		var tHTime = document.createElement('th');
		var tHName = document.createElement('th');
		var tHEmail = document.createElement('th');
		var tHPhone = document.createElement('th');
		var tHAge = document.createElement('th');
		var tHWorkShop = document.createElement('th');
		var tHSlot = document.createElement('th');
		var tRow = document.createElement('tr');
		var tTime = document.createElement('td');
		var tName = document.createElement('td');
		var tEmail = document.createElement('td');
		var tPhone = document.createElement('td');
		var tAge = document.createElement('td');
		var tWorkShop = document.createElement('td');
		var tSlot = document.createElement('td');

		tHTime.textContent = 'Time';
		tHName.textContent = 'Name';
		tHEmail.textContent = 'Email ID';
		tHPhone.textContent = 'Phone no.';
		tHAge.textContent = 'Age';
		tHWorkShop.textContent = 'Workshop';
		tHSlot.textContent = 'Batch';
		tTime.textContent = timeStamp;
		tName.textContent = name;
		tEmail.textContent = email;
		tPhone.textContent = phone;
		tAge.textContent = age;
		tWorkShop.textContent = workShop;
		tSlot.textContent = slot;

		tHeader.appendChild(tHTime);
		tHeader.appendChild(tHName);
		tHeader.appendChild(tHEmail);
		tHeader.appendChild(tHPhone);
		tHeader.appendChild(tHAge);
		tHeader.appendChild(tHWorkShop);
		tHeader.appendChild(tHSlot);
		tRow.appendChild(tTime);
		tRow.appendChild(tName);
		tRow.appendChild(tEmail);
		tRow.appendChild(tPhone);
		tRow.appendChild(tAge);
		tRow.appendChild(tWorkShop);
		tRow.appendChild(tSlot);

		dataTable.appendChild(tHeader);
		dataTable.appendChild(tRow);
		tablePage.appendChild(dataTable);

		// Collecting and storing the registrant's data into an object
		var registrant =
		{
			time: timeStamp,
			name: name,
			email: email,
			phone: phone,
			age: age,
			workshop: workShop,
			slot: slot
		}

		// Converting the object into a string and storing it into the array
		registrantData.push(JSON.stringify(registrant));
		console.log(registrantData);
	}
	else
	{
		// Creating a row to add the registrant's data
		var tRow = document.createElement('tr');
		var tTime = document.createElement('td');
		var tName = document.createElement('td');
		var tEmail = document.createElement('td');
		var tPhone = document.createElement('td');
		var tAge = document.createElement('td');
		var tWorkShop = document.createElement('td');
		var tSlot = document.createElement('td');		

		tTime.textContent = timeStamp;
		tName.textContent = name;
		tEmail.textContent = email;
		tPhone.textContent = phone;
		tAge.textContent = age;
		tWorkShop.textContent = workShop;
		tSlot.textContent = slot;

		tRow.appendChild(tTime);
		tRow.appendChild(tName);
		tRow.appendChild(tEmail);
		tRow.appendChild(tPhone);
		tRow.appendChild(tAge);
		tRow.appendChild(tWorkShop);
		tRow.appendChild(tSlot);

		dataTable.appendChild(tRow);

		// Collecting and storing the registrant's data into an object 
		var registrant =
		{
			time: timeStamp,
			name: name,
			email: email,
			phone: phone,
			age: age,
			workshop: workShop,
			slot: slot
		}
		
		// Converting the object into a string and storing it into the array
		registrantData.push(JSON.stringify(registrant));
		console.log(registrantData);
	}
}

// checkedBox() function will check whether only one checkbox is checked or not
function checkedBox(checkbox)
{
    var checkboxes = document.getElementsByName('check');
    checkboxes.forEach(function(item) 
    {
    	if (item !== checkbox) 
    	{
    		item.checked = false;
    	}
    });
}

// currentTime() function will return the timestamp of the registration
function currentTime()
{
	var d = new Date();
	var n = d.toLocaleTimeString() + ' ' + d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate();
	return n;
}
