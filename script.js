 // Import the functions you need from the SDKs you need
 import { initializeApp} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
 import { getDatabase, set, get, ref,update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyAGKm12Z_bFfN_bQvzIZR5Gpbzup4QM6j0",
   authDomain: "realtime1st.firebaseapp.com",
   projectId: "realtime1st",
   storageBucket: "realtime1st.appspot.com",
   messagingSenderId: "422988285758",
   appId: "1:422988285758:web:e2163eb8f11a8d22708e6f",
   measurementId: "G-RJSQKJSBJK"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db= getDatabase(app);
 var dataForm=document.getElementById('dataForm');
 var view=document.getElementById('view');

 //generate an token
 dataForm.addEventListener('submit',(e)=>{
   e.preventDefault();
   if(document.getElementById('gender').value==='none'){
     document.querySelector('.error').style.display='block';
   setTimeout(()=>{document.querySelector('.error').style.display='none';},1200);
   }
   else{
     var id=Date.now();
   var name=document.getElementById('name');
   var age=document.getElementById('age');
   var gender=document.getElementById('gender');
   var date=new Date;
   set(ref(db,'patients/'+id),{
       Age:age.value,
       Name:name.value,
       Gender:gender.value,
       Date:date.toLocaleDateString(),
       Chekup:'pending...'
   });
   document.querySelector('.success').style.display='block';
   setTimeout(()=>{document.querySelector('.success').style.display='none';},1000);
   dataForm.reset();
   }
 });

 //view all appointment
 view.addEventListener('click',(e2)=>{
    
   
   var list=document.getElementById('list');
   list.innerHTML='';
   document.getElementById('showAll').style.display='block';
   
   get(ref(db,'patients/')).then((Id)=>{
     const iD=Id.val();
     var ids=Object.keys(iD);
     for(var a=ids.length-1;a>=0;a--){
       get(ref(db,'patients/'+ids[a])).then((patientList)=>{
         var patient=patientList.val();
         var li=document.createElement('li');
         li.setAttribute('class','li1');
       li.innerHTML=`<div class=listDivs>
       <table>
           <tr><td>Date</td><td>:</td><td>${patient.Date}</td></tr>
           <tr><td>Name</td><td>:</td><td>${patient.Name}</td></tr>
           <tr><td>Age</td><td>:</td><td>${patient.Age}</td></tr>
           <tr><td>Gender</td><td>:</td><td>${patient.Gender}</td></tr>
       </table>
           <div class='check'>${patient.Chekup}</div>
       </div><br>`;
       list.appendChild(li);
       })
     }
   })
 });

 //Login
 var login=document.getElementById('loginForm');
 var doctorName=document.getElementById('doctorName');
 var recepName=document.getElementById('recepName');
 var err2=document.getElementById('err2');
 var logEmail=document.getElementById('logEmail');
 var logPassword=document.getElementById('logPassword');
 login.addEventListener('submit',(e)=>{
   e.preventDefault();
   get(ref(db,'users/')).then((snapshot)=>{
     const data=snapshot.val();
     var ids=Object.keys(data);

     for(var i=ids.length-1;i>=0;i--){
       get(ref(db,'users/'+ids[i])).then((snapChild)=>{
         const dataChild=snapChild.val();
         var nam=dataChild.Name;
         var email=dataChild.Email;
         var password=dataChild.Password;
         var designation=dataChild.Designation;
         if(email===logEmail.value && password===logPassword.value){
           if(designation==='doctor'){
             doctorName.innerHTML=nam;
             document.querySelector('.doctor').style.display='block';
           }else if(designation==='receptionist'){
             recepName.innerHTML=nam;
             document.querySelector('.recep').style.display='block';
           }
           login.reset();
           sessionStorage.setItem('name',nam);
           sessionStorage.setItem('post',designation);
           document.getElementById('main').style.display='none';
         }else if(i<=0){err2.style.display='block';setTimeout(()=>{
           err2.style.display='none';
         },1000)}
       })
     }
   })
 })

 //submit data for signup
 var signup=document.getElementById('signupForm');
 signup.addEventListener('submit',(e)=>{
   e.preventDefault();
   if(document.getElementById('designation').value==='none'){
     document.querySelector('.error0').style.display='block';
   setTimeout(()=>{document.querySelector('.error0').style.display='none';},1000);
   }
   else{
   var id=Date.now();
   var signName=document.getElementById('signName');
   var signDOB=document.getElementById('signDOB');
   var signEmail=document.getElementById('signEmail');
   var signPassword=document.getElementById('signPassword');
   var signdesignation=document.getElementById('designation');
   var date=new Date;
   var path='users/'+id;
   set(ref(db,path),{
       Name:signName.value,
       DOB:signDOB.value,
       Email:signEmail.value,
       Password:signPassword.value,
       Designation:signdesignation.value,
       id:id
   });
   document.querySelector('.success0').style.display='block';
   setTimeout(()=>{document.querySelector('.success0').style.display='none';},1000);
   signupForm.reset();
   }
 });

 
var tokens=document.getElementById('viewTokens');
 tokens.addEventListener('click',(e2)=>{
   var list2=document.getElementById('tokens');
   list2.innerHTML='';
   document.getElementById('showTokens').style.display='block';
   
   get(ref(db,'patients/')).then((Id)=>{
     const iD=Id.val();
     var ids=Object.keys(iD);
     for(var a=ids.length-1;a>=0;a--){
       get(ref(db,'patients/'+ids[a])).then((patientList,ids)=>{
         var patient=patientList.val();
         var li2=document.createElement('li');
         li2.setAttribute('class','li2');
         if(patient.Chekup==="pending..."){
            var txt='Mark Completed';var color='red';
         }else{
            var txt='Completed &#10003;';var color='green';
         }
       li2.innerHTML=`<div class='listDivs'>
       <table>
           <tr><td>Date</td><td>:</td><td>${patient.Date}</td></tr>
           <tr><td>Name</td><td>:</td><td>${patient.Name}</td></tr>
           <tr><td>Age</td><td>:</td><td>${patient.Age}</td></tr>
           <tr><td>Gender</td><td>:</td><td>${patient.Gender}</td></tr>
       </table>
           <div>
                <button style='color:${color};' class='check2' id='${patient.id}'>${txt}</button>
           </div>
       </div><br>`;
       list2.appendChild(li2);
       })
     }
   })
 });
 document.addEventListener('click',(e)=>{
    var id=e.target.id;
    var cls=e.target.className;
    
    if(cls==='check2'){
        update(ref(db,'patients/'+id),{Chekup:'Completed &#10003;'}).then((data)=>{
            var list2=document.getElementById('tokens');
            list2.innerHTML='';
            document.getElementById('showTokens').style.display='block';
            
            get(ref(db,'patients/')).then((Id)=>{
              const iD=Id.val();
              var ids=Object.keys(iD);
              for(var a=ids.length-1;a>=0;a--){
                get(ref(db,'patients/'+ids[a])).then((patientList,ids)=>{
                  var patient=patientList.val();
                  var li2=document.createElement('li');
                  li2.setAttribute('class','li2');
                  if(patient.Chekup==="pending..."){
                    var txt='Mark Completed';var color='red';
                 }else{
                    var txt='Completed &#10003;';var color='green';
                 }
                li2.innerHTML=`<div class='listDivs'>
                <table>
                    <tr><td>Date</td><td>:</td><td>${patient.Date}</td></tr>
                    <tr><td>Name</td><td>:</td><td>${patient.Name}</td></tr>
                    <tr><td>Age</td><td>:</td><td>${patient.Age}</td></tr>
                    <tr><td>Gender</td><td>:</td><td>${patient.Gender}</td></tr>
                </table>
                    <div>
                         <button class='check2' style='color:${color};' id='${patient.id}'>${txt}</button>
                    </div>
                </div><br>`;
                list2.appendChild(li2);
                })
              }
            })
        });
    }
 })

