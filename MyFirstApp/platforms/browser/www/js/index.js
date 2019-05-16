// window.alert("siadlo");
// var mainText = document.getElementById("mainText").value;
// var mainSubmit = document.getElementById("submitButton");

var tittleTable = [];
var filmsTable = [];
var filteredFilms = [];

function showTableTittle(table){
  var allTittle = '';
  for (var i=0; i<table.length; i++) {
    allTittle = allTittle + table[i] + ', ';
  }
  document.getElementById("mainText").value = allTittle;
}

function showFilmsData(filmstable){
  // for (var i=0; i<table.length; i++) {
  //   allTittle = allTittle + table[i] + ', ';
  // }
  document.getElementById("mainText").value = filmstable[2].filmYear;
}

function clickSecondSubmit(){
  // showTableTittle(tittleTable);
  showFilmsData(filmsTable);
}

function filterYear(minYear,maxYear){
  for (var i=0; i<filmsTable.length; i++) {
    if(filmsTable[i].filmYear >= minYear && filmsTable[i].filmYear <= maxYear){
      filteredFilms.push(filmsTable[i]);
    }
  }

  for (var i=0; i<filteredFilms.length; i++) {
    document.getElementById("mainText").value = document.getElementById("mainText").value + filteredFilms[i].filmTittle + ' - ' + filteredFilms[i].filmYear +'\n';
  }
  window.alert('wielkość tablicy początkowej: '+ filmsTable.length);
  window.alert('wielkość tablicy po filtrowaniu: '+ filteredFilms.length);
}

function clickFilterYear() {
  filterYear(2002,2012);
}

function clickRandomFilm() {
  var random = Math.floor(Math.random()*(filteredFilms.length-1)+1);
  document.getElementById("randomFilm").value = filteredFilms[random].filmTittle + ' - ' + filteredFilms[random].filmYear;
}


function clickSubmit(){  
  try{
    var rootRef = firebase.database().ref().child("films");
    rootRef.on("child_added", snap => {
      
      var time = snap.child("time").val();
      var tittle = snap.child("tittle").val();
      var year = snap.child("year").val();
      tittleTable.push(tittle);

      var film = {
        filmTittle: tittle,
        filmTime: time,
        filmYear: year
        };  
      filmsTable.push(film);
    })

    window.alert("dane wczytane");

  }catch(e){ 
    console.error(e); 
  }
}



    //****dodanie pojedynczego wpisu do firebase */
    // var mainText = document.getElementById("mainText").value;
    // var firebaseRef = firebase.database().ref();
    // firebaseRef.child("text").set(mainText); 



