console.log('hello world');
let clicks = 0;
function onClick() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
  };
//document.getElementById("clicks")--->looks for html id "clicks"
//.innerHTML---> allows html element with id "clicks" to be modified
//.innerHTML = clicks; ---> assigns a value to the inner html property with id "click" value. 
//The value being assigned is represented by the variable clicks.
