(function(){
    'use strict'

    var forms=document.querySelectorAll('.need-validation');

    Array.prototype.slice.call(forms).forEach(function(form){
        forEach.addEventListener("submit", function(event){
            if(!form.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
                
            }

            form.classList.add('was-validated');
        }, false);
    });
})();

var Email=document.getElementById("txtEmail");
var Password=document.getElementById("txtPassword");

var txtEmailModal=document.getElementById("txtEmailModal");
var txtPasswordModal=document.getElementById("txtPasswordModal");

var botton=document.getElementById("btnsubmit");
var btnActualizar=document.getElementById("btnActualizar");
var cuerpoTabla=document.getElementById("tabla-cuerpo");

document.addEventListener("DOMContentLoaded", (event)=>{
    obtenerMensajes();
  });

  botton.addEventListener("click",(e)=>{
    alert(`info:
    ${Email.value}
    ${Password.value}`);

  var mensaje={
    "Email":Email.value,
    "password":Password.value,
  };

  var jsonString=JSON.stringify(mensaje);

  fetch("https://apt-base-default-rtdb.firebaseio.com/3%2C1.json",{
    method:"POST",
    headers:{
        "Content-Type":"application/json; charset=utf-8"
    },
    body:jsonString
  })
  .then((respuesta)=>{return respuesta.json()})
  .then((info)=>{console.log(info)})
  .catch((e)=>{console.error(e)});

});

boton.addEventListener("click",(e)=>{
    alert(`info:
    ${Email.value}
    ${password.value}`);

  var mensaje={
    "Email":Email.value,
    "password":password.value
  };

  var jsonString=JSON.stringify(mensaje);

  fetch("https://apt-base-default-rtdb.firebaseio.com/3%2C1.json",{
    method:"POST",
    headers:{
        "Content-Type":"application/json; charset=utf-8"
    },
    body:jsonString
  })
  .then((respuesta)=>{return respuesta.json()})
  .then((info)=>{console.log(info)})
  .catch((e)=>{console.error(e)});



});

function obtenerMensajes(){
  cuerpoTabla.innerHTML="",
  fetch("https://apt-base-default-rtdb.firebaseio.com/3%2C1.json",{
    method:"Get",
    headers:{
      "Content-Type":"application/json; charset=utf-8"
    }
  })
  .then((respuesta)=>{return respuesta.json()})
  .then((datos)=>{
    console.log(datos);
    //Recorrer  el objeto JSON
    Object.entries(datos).forEach(([key, value])=>{
      let fila=document.createElement('tr');
      fila.innerHTML=`
                      <td>${value.Email}</td>
                      <td>${value.password}</td>
                      <td>
                      <button type="button" class"btn btn-warning" data-bs-toggle="modal" data-bs-target="#form-update" onclick="javascript:reescribir_datos('${value.Email}','${value.Password}');">
                              <i class="bi bi-pencil-square"></i>
                          </button>
                      
                      </td>
                      <td>
                          <button type="button" class"btn btn-danger" onclick="javascript:eliminarMensaje('${key}');">
                                  <i class="bi bi-trash3-fill"></i>
                           </button>
                      </td>
                      `;
      cuerpoTabla.appendChild(fila);
    });
  })
  .catch((err)=>{console.error(err)});
}

function eliminarMensaje(clave){
    //alert("Elimando..."+clave);
    fetch("https://apt-base-default-rtdb.firebaseio.com/3%2C1/"+clave+".json",{
     method:"DELETE",
     headers:{
       "Content-type":"application/json; charset=utf-8"
     }
    })
    .then((res)=>{return res.json()})
    .then((datos)=>{console.log(datos)})
    .catch((err)=>{console.error(err)})
 
    obtenerMensajes();
 
 }

 function reescribir_datos(Email, password){
  EmailModal.value=Email;
  PasswordModal.value=Password;
}

 