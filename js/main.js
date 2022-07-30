var siteName=document.getElementById('siteName');
var siteUrl=document.getElementById('siteUrl');
var addBtn=document.getElementById('addBtn');
var search=document.getElementById('search');
var inputs=document.querySelectorAll('input');
var siteList=[];
var currentIndex;
var nameDanger=document.getElementById('nameDanger');
var urlDanger=document.getElementById('urlDanger');

if(JSON.parse(localStorage.getItem('siteInfo'))!=null){
   siteList=JSON.parse(localStorage.getItem('siteInfo'));
   displayInfo()
}
addBtn.onclick=function()
{
if(addBtn.innerHTML=='Add Bookmark')
{
  if(siteName.value=='' || siteUrl.value=='')
  {
    document.getElementById('requiedInputs').classList.remove('d-none');
    addBtn.disabled='true';
  }
  else{
        document.getElementById('requiedInputs').classList.add('d-none');
        addInfo();
        displayInfo();
        resetSite();
      }
    }
else
{
  updateSiteInfo();
  displayInfo();
  resetSite();
}
}


function addInfo()
{
    var site={
        name:siteName.value,
        url:siteUrl.value
    }
    siteList.push(site)
    localStorage.setItem('siteInfo',JSON.stringify(siteList))
}

function displayInfo()
{
    var box=``
    for(var i=0;i<siteList.length;i++)
     {
        box+=`
        <tr>
        <td colspan="2"><h3 class="bookName ms-2">${siteList[i].name}</h3></td>
        <td>
          <a href='${siteList[i].url}'  target='_blank' class="btn visitBtn">Visit</a>
          <button onclick='getSiteInfo(${i})' class="btn ms-2 editBtn">Edit</button>
          <button onclick='deleteSite(${i})' class="btn ms-2 deleteBtn">Delete</button>
        </td>
      </tr>   `
     }
     document.getElementById('tableBody').innerHTML=box;
}


function resetSite()
{
    for(var i=0;i<inputs.length;i++)
    {
        inputs[i].value=''
    }
}


function deleteSite(index)
{
    siteList.splice(index,1)
    displayInfo()
    localStorage.setItem('siteInfo',JSON.stringify(siteList))
}



function searchSite(searchTxt)
{
  var box=``
  for(var i=0;i<siteList.length;i++)
  if(siteList[i].name.toLowerCase().includes(searchTxt.toLowerCase())){
   {
      box+=`
      <tr>
      <td colspan="2"><h3 class="bookName ms-2">${siteList[i].name}</h3></td>
      <td>
        <button class="btn visitBtn">Visit</button>
        <button onclick='getSiteInfo(${i})' class="btn ms-2 editBtn">Edit</button>
        <button onclick='deleteSite(${i})' class="btn ms-2 deleteBtn">Delete</button>
      </td>
    </tr>   `
   }
}
   document.getElementById('tableBody').innerHTML=box;

}


function getSiteInfo(index)
{
  currentIndex=index;
  var currentSite=siteList[index];
  siteName.value=currentSite.name;
  siteUrl.value=currentSite.url;
  addBtn.innerHTML='Update Bookmark'

}

function updateSiteInfo()
{
    var site={
        name:siteName.value,
        url:siteUrl.value
    }
    siteList[currentIndex]=site;
    localStorage.setItem('siteInfo',JSON.stringify(siteList))
}


siteName.onkeyup=function()
{
  var regexName=/^[A-Z][a-zA-Z0-9]{3,10}$/
  if(regexName.test(siteName.value))
  {
     siteName.classList.add('is-valid')
     siteName.classList.remove('is-invalid')
     nameDanger.classList.add('d-none')
     addBtn.removeAttribute('disabled')
  }
  else{
    siteName.classList.remove('is-valid')
    siteName.classList.add('is-invalid')
    nameDanger.classList.remove('d-none')
    addBtn.disapled=true
  }
}

siteUrl.onkeyup=function()
{
  var regexUrl=/^((http|https):\/\/www.)[a-zA-Z0-9]{2,}(.com|.org|.net)$/
  if(regexUrl.test(siteUrl.value))
  {

     siteUrl.classList.add('is-valid')
     siteUrl.classList.remove('is-invalid')
     urlDanger.classList.add('d-none')
     addBtn.removeAttribute('disabled')
  }
  else{
    siteUrl.classList.remove('is-valid')
    siteUrl.classList.add('is-invalid')
    urlDanger.classList.remove('d-none')
    addBtn.disapled=true
  }
}

