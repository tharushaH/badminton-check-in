//query selector for the table information
const tbody = document.querySelector('tbody');
//onclick function for the upload button
const uploadConfirm = document.getElementById('uploadConfirm').addEventListener('click', function(){
    //Call the function to remove all the old entries from the table
    removeData();
    
    //Try and catch block that ensures that the user adds a file.
    try {
      //Works with PapaParse https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js
      Papa.parse(document.getElementById('uploadFile').files[0],{
        download : true,
        //Read through the csv file not including the header line
        header: true,
        //Skip the empty lines of the csv file
        skipEmptyLines: true,
        complete: function(results){
            for(i=0; i<results.data.length;i++){
                tbody.innerHTML += `<tr>
                                        <td>${results.data[i]['Full Name']}</td>
                                        <td>${results.data[i]['Student ID']}</td>
                                        <td>${results.data[i]['Ranking']}</td>
                                    </tr>`;
            }
        }
    });
    }
    catch(err) {
      alert("Please add a file.");
    }
    
});


//Variables for the search function
const searchList = document.getElementById("search-results");
searchList.addEventListener('click', checkInPlayer);


/*Function call is on the index.html page, function call on key press 
  The parameters are:
  Event: the event is the key that has been pressed.
*/ 
function searchFunction(event){
  //input from the search-bar
  let input = event.value.toLowerCase();
  //clarification on the table
  rows = tbody.rows;
  
  //Removes all the members included inside the search box
  while(searchList.firstChild){
    searchList.removeChild(searchList.firstChild);
  }

  //After clearing the board the function returns if the search bar is empty
  if(input==''){
    return
  }

  //Loop through to find the names that include the letters from the input
  for(i=0;i<(rows.length);i++){
    let curr = rows[i].getElementsByTagName('td')[0].innerHTML.toLowerCase();
    if(curr.includes(input)){
      //Current Search DIV
      let currSearch = document.createElement('div');
      currSearch.classList.add('curr-search');

      //Create a paragraph element with the 
      let searchMember = document.createElement('p');
      searchMember.innerText = curr.toUpperCase() + ' || ' + rows[i].getElementsByTagName('td')[1].innerHTML + ' || ' + rows[i].getElementsByTagName('td')[2].innerHTML;
      searchMember.classList.add('search-Member');
      currSearch.appendChild(searchMember);

      //Check mark button
      const checkIN = document.createElement('button');
      checkIN.innerHTML = '<i class= "fas fa-check"></li>';
      checkIN.classList.add('check-in-button');
      currSearch.appendChild(checkIN);

      //append the new div 
      searchList.appendChild(currSearch);
    }
  }
}

//This function checks in the player, removing the player information from both the search list and the the table.
function checkInPlayer(event){
  let item = event.target;


  //On button click removes the player from search and the table
  if (item.classList[0] == 'fas'){
    //Call function to remove from the table
    removeFromTable(item.parentElement.parentElement.getElementsByTagName('p')[0].innerHTML, rows);
    //Remove element from the search list
    item.parentElement.parentElement.remove();
  } else if(item.classList[0] == 'check-in-button'){
    removeFromTable(item.parentElement.getElementsByTagName('p')[0].innerHTML, rows);
    item.parentElement.remove();
  }
  
  
}

//Function to remove the player from the table
function removeFromTable(information, rows){
  //Splits the information into an array using the styling from before
  let strInfo = information.split(' || ');
  for(i=0;i<rows.length;i++){
    if(rows[i].getElementsByTagName('td')[1].innerHTML.toLowerCase() == strInfo[1]){
      console.log(i);
      rows[i].remove();
    }
  }
}


//variables for the sort functions and onclick functions
let ascFullName = false;
let ascRanking = false;

//onclick method for fullName text element
document.getElementById("fullName").onclick=function(){
    //Changes ranking ascending variable back to default (descending)
    ascRanking = false;
    //Calls the sort function that sorts the table by full name
    sortTable(0, false, ascFullName);
    //Changes ascending to descending or vice versa
    if(ascFullName){
      ascFullName = false;
    } else{
      ascFullName = true;
    }
}

//onclick method for ranking text element
document.getElementById("ranking").onclick=function(){
    //Changes full name ascending variable back to default (descending)
    ascFullName = false;
    //Calls the sort function that sorts the table by ranking
    sortTable(2, true, ascRanking);
    //Changes ascending to descending or vice versa
    if(ascRanking){
      ascRanking = false;
    } else{
      ascRanking = true;
    }
};

/*Function call sorts the table by either their full name or their ranking in either ascending or descending order. 
  The parameters are:
  index: sort of the index chosen
  rankingBool: decides if we its sorting by ranking or not
  ascendingBool: decides if the sort is ascending or not
*/ 
function sortTable(index, rankingBool, ascendingBool){
  let rows, switching, i, x, y, shouldSwitch;
  //Start with switching true to start the loop
  switching = true;
  //Loop until no switching needs to be completed
  while (switching) {
    //Switching is inactive so no swithces will happen until it is flipped
    switching = false;
    rows = tbody.rows;
    /* Loop through all table rows in tbody*/
    for (i = 0; i < (rows.length)-1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[index];
      y = rows[i + 1].getElementsByTagName("td")[index];
      //converts x and y to value corresponding to rank (since expert is higher than advance but advance appears would appear first)
      if(rankingBool){
        //Changes the x and y to lower case
        x = x.innerHTML.toLowerCase();
        y = y.innerHTML.toLowerCase();

        //Changes values to corresponding ranking
        if(x.includes('beginner',0)){
          x = 0;
        } else if(x.includes('novice')){
          x = 1;
        } else if(x.includes('intermediate')){
          x = 2;
        } else if(x.includes('advance')){
          x = 3;
        } else if(x.includes('expert')){
          x = 4;
        }
        //Changes values to corresponding ranking
        if(y.includes('beginner',0)){
          y = 0;
        } else if(y.includes('novice')){
          y = 1;
        } else if(y.includes('intermediate')){
          y = 2;
        } else if(y.includes('advance')){
          y = 3;
        } else if(y.includes('expert')){
          y = 4;
        }
        
        if(ascendingBool){
          if (x < y) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else{
          if (x > y) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
        
      } else{
        if(ascendingBool){
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else{
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
        
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

//Removes all entries from the table
function removeData(){
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }
}