//separate functions - as phone numbers are added they should be extracted
//function to separate the phone numbers, that gets called for each id
//add constants for target spreadsheet
function separatePhone() {
  let [static_indices, static_data] = BahraichApp.getData('STATIC')
  
  //get indices 
  let phone_indices = BahraichApp.getIndices('PHONE_NUMBERS')

  //empty array to collect rows
  let rowsToInsert = []

  //iterate through ids
  Object.keys(static_data).forEach(id => {
    let caseData = static_data[id].case_history;
    
    // iterate through each case data for the current ID
    caseData.forEach(row => {
      let phone = String(row[static_indices.phone_numbers]);
      let extractedPhoneNumbers = extractPhoneNumbers(phone);

      // collect information for rows
      extractedPhoneNumbers.forEach(phoneData => {
        let newRow = []; // Initialize an empty array for the row
        newRow[phone_indices.id_no] = id; // Set ID number in the row
        newRow[phone_indices.phone_number] = phoneData.phoneNumber; // Set phone number in the row
        newRow[phone_indices.description] = phoneData.description; // Set description in the row
        rowsToInsert.push(newRow)
      });
    });
  });
  BahraichApp.insertData('PHONE_NUMBERS', -1, rowsToInsert);
}

function extractPhoneNumbers(phone) {
  let phoneNumbers = [];
  let matches = phone.match(/(\d{10})(\D*)/) || [];
      
  if (matches) {
    let phoneNumber = matches[1];
    let description = matches[2];
  
    if (description == null){
      description = 'Missing';
      // Append extracted data as a row
      phoneNumbers.push({phoneNumber, description});
    }
    else{
      description = description.replace(',', '').replace('(','').replace(')', '').replace('/','').replace('-','').replace('--','').replace(',,', '');
      phoneNumbers.push({phoneNumber, description});
    }
  }

  let match_two = phone.match(/(\d{10})(\D*)(\d{10})(\D*)/)
  if (match_two) {
    let phoneNumber = match_two[3];
    let description = match_two[4].replace(',', '').replace('(','').replace(')', '').replace('/','').replace('-','').replace('--','').replace(',,', '');
    phoneNumbers.push({phoneNumber, description});
  }

  let match_three = phone.match(/(\d{10})(\D*)(\d{10})(\D*)(\d{10})(\D*)/) 
  if (match_three) {
    let phoneNumber = match_three[5];
    let description = match_three[6].replace(',', '').replace('(','').replace(')', '').replace('/','').replace('-','').replace('--','').replace(',,', '');
    phoneNumbers.push({phoneNumber, description});
  }

  let match_four = phone.match(/(\d{10})(\D*)(\d{10})(\D*)(\d{10})(\D*)(\d{10})(\D*)/)
  if (match_four) {
    let phoneNumber = match_four[7];
    let description = match_four[8].replace(',', '').replace('(','').replace(')', '').replace('/','').replace('-','').replace('--','').replace(',,', '');
    phoneNumbers.push({phoneNumber, description});
  }

  let match_five = phone.match(/(\d{10})(\D*)(\d{10})(\D*)(\d{10})(\D*)(\d{10})(\D*)(\d{10})(\D*)/)
  if (match_five) {
    let phoneNumber = match_five[9];
    let description = match_five[10].replace(',', '').replace('(','').replace(')', '').replace('/','').replace('-','').replace('--','').replace(',,', '');
    phoneNumbers.push({phoneNumber, description});
  }


  return phoneNumbers;
}
