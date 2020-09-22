//Recupera los datos
async function getData() {
  let response = await fetch("file.json");
  let data = await response.json();
  return data;
}

//Llena la tabla
/***/
function fill(json) {
  var tabla = document.getElementsByClassName("cuerpo")[0];
  for (var i in json) {
    persona = json[i];
    var row = tabla.insertRow(-1);
    var ln = row.insertCell(0);
    var fn = row.insertCell(1);
    var email = row.insertCell(2);

    var photo = row.insertCell(3);
    var img = document.createElement("IMG");
    img.src = persona.photo;
    photo.appendChild(img);

    var but = row.insertCell(4);
    var btn = document.createElement("btn");
    btn.className = "btn btn-primary";
    btn.innerHTML = "Eliminar fila";
    btn.onclick = function () {
      byeRow(this);
    };
    but.appendChild(btn);

    var but2 = row.insertCell(5);
    var btn2 = document.createElement("btn");
    btn2.className = "btn btn-primary";
    btn2.innerHTML = "Editar fila";
    btn2.onclick = function () {
      editRow(this);
    };
    but2.appendChild(btn2);

    ln.innerHTML = persona.last_lane;
    fn.innerHTML = persona.first_name;
    email.innerHTML = persona.email;
  }
}

/** Firme pero pa lo del botón de eliminar se queda corto :(
function fill(json) {
  var tabla = document.getElementsByClassName("cuerpo")[0];
  for (var i in json) {
    persona = json[i];
    //Fila
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var ln = document.createTextNode(persona.last_lane);
    td1.appendChild(ln);
    tr.appendChild(td1);
    var td2 = document.createElement("td");
    var fn = document.createTextNode(persona.first_name);
    td2.appendChild(fn);
    tr.appendChild(td2);
    var td3 = document.createElement("td");
    var em = document.createTextNode(persona.email);
    td3.appendChild(em);
    tr.appendChild(td3);
    var td4 = document.createElement("td");
    var img = document.createElement("IMG");
    img.src = persona.photo;
    td4.appendChild(img);
    tr.appendChild(td4);

    var td5 = document.createElement("td");
    var btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.onclick = function () {
      byeRow(this);
    };
    td5.appendChild(btn);
    tr.appendChild(td5);
    tabla.appendChild(tr);
  }
}
*/
const data = getData().then((json) => fill(json));

//Ordena :v
function myFunction(pos) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementsByClassName("cuerpo")[0];
  switching = true;
  /* Make a loop that will continue until
        no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
          first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
            one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[pos];
      y = rows[i + 1].getElementsByTagName("TD")[pos];

      // Check if the two rows should switch place:
      if (x.innerHTML > y.innerHTML) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
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
/** NO FUNCIONA ESCRIBIENDO EN JSON :(
function add() {
  getData().then((json) => {
    ln = document.getElementById("last_name").value;
    fn = document.getElementById("first_name").value;
    email = document.getElementById("email").value;
    photo = document.getElementById("photo").value;
    obj = {
      last_lane: ln,
      first_name: fn,
      email: email,
      photo: photo,
    };
    json.push(obj);
    var txtFile = new File("file.json");
    txtFile.writeln(JSON.stringify(json));
    console.log(JSON.stringify(json));
    txtFile.close();
  });
}
*/

/** FUNCIONA MELO, falta meterle lo del botón de eliminar
function add() {
  var tabla = document.getElementsByClassName("cuerpo")[0];
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  console.log(document.getElementById("last_name").value);
  var ln = document.createTextNode(document.getElementById("last_name").value);
  td1.appendChild(ln);
  tr.appendChild(td1);
  var td2 = document.createElement("td");
  var fn = document.createTextNode(document.getElementById("first_name").value);
  td2.appendChild(fn);
  tr.appendChild(td2);
  var td3 = document.createElement("td");
  var em = document.createTextNode(document.getElementById("email").value);
  td3.appendChild(em);
  tr.appendChild(td3);
  var td4 = document.createElement("td");
  var img = document.createElement("IMG");
  img.src = document.getElementById("photo").value;
  td4.appendChild(img);
  tr.appendChild(td4);
  tabla.appendChild(tr);
  return false;
}
*/

//Agrega filas
/** FUNCIONA MELO */
function add() {
  var table = document.getElementsByClassName("cuerpo")[0];
  var row = table.insertRow(-1);
  var ln = row.insertCell(0);
  var fn = row.insertCell(1);
  var email = row.insertCell(2);

  var photo = row.insertCell(3);
  var img = document.createElement("IMG");
  img.src = document.getElementById("photo").value;
  photo.appendChild(img);

  var but = row.insertCell(4);
  var btn = document.createElement("btn");
  btn.className = "btn btn-primary";
  btn.innerHTML = "Eliminar fila";
  btn.onclick = function () {
    byeRow(this);
  };
  but.appendChild(btn);

  var but2 = row.insertCell(5);
  var btn2 = document.createElement("btn");
  btn2.className = "btn btn-primary";
  btn2.innerHTML = "Editar fila";
  btn2.onclick = function () {
    editRow(this);
  };
  but2.appendChild(btn2);

  ln.innerHTML = document.getElementById("last_name").value;
  fn.innerHTML = document.getElementById("first_name").value;
  email.innerHTML = document.getElementById("email").value;

  return false;
}

//Elimina filas
function byeRow(r) {
  //Resulta que r es el botón, busca al papá dos veces para el tr.
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementsByClassName("cuerpo")[0].deleteRow(i - 1);
}

//Edita filas
function editRow(r) {
  //Resulta que r es el botón, busca al papá dos veces para el tr.
  var i = r.parentNode.parentNode.rowIndex;
  row = document.getElementsByClassName("cuerpo")[0].rows[i - 1];
  for (i = 0; i < 3; i++) {
    row.cells[i].contentEditable = "true";
  }
}

function chau() {
  parent = document.getElementsByClassName("cuerpo")[0];
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
