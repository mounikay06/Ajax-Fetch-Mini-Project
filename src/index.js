async function loadTable(){
    document.getElementById("content").innerHTML = '';
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
            document.getElementById("content").innerHTML = this.responseText;   
        }
    };
    xhttp.open("GET","./views/__booklist.html",true);
    xhttp.send();
      

    let bookList = [];
    await fetch("http://localhost:3000/books")
    .then(resolve => resolve.json())
    .then(data => {
        bookList = data;
        let tablebody = document.getElementById("tablebody");
        // let dropdown = document.getElementById("selection");
        let row ="";
        for(let i=0;i<bookList.length;i++){
           row+= `<tr>
            <td>${bookList[i].id}</td>       
            <td>${bookList[i].title}</td>
            <td>${bookList[i].author}</td>
            <td>${bookList[i].price}</td>
            <td>${bookList[i].rating}</td>
            <td>
               <span  onclick="deleteBook();"> <i id="${bookList[i].id}" class="fa fa-trash"></i></span>
            </td>
            </tr>` ;
            /* let opt = document.createElement('option');
            opt.value = bookList[i].id;
            opt.innerHTML = bookList[i].id;
            dropdown.append(opt); */
        }
        tablebody.innerHTML = row;
        console.log(data)})
}

function loadAddBooks(){
    document.getElementById("content").innerHTML = '';
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
            document.getElementById("content").innerHTML = this.responseText;   
        }
    };
    xhttp.open("GET","./views/__bookadd.html",true);
    xhttp.send();
}

async function loadDetails(){
    //console.log(event.target.id.split('-')[1]);
    //let detailsId = event.target.id.split('-')[1];
  /*   var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status ==200){
        document.getElementById("content").innerHTML = this.responseText;   
    }
    };
    xhttp.open("GET","./views/__bookdetails.html",true);
    xhttp.send(); */

   let detailsId = document.getElementById("inputdata").value;
   let result = await  fetch(`http://localhost:3000/books/${detailsId}`,{
       method : 'GET',
       mode : 'cors'
   });
    loadTable();
}



async function addbooks(){
    let id = document.getElementById("id").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    let title = document.getElementById("title").value;
    let rating = document.getElementById("rating").value;
    let book ={
        _id:id,
        id:id,
        title:title,
        author:author,
        price:price,
        rating:rating
    }
    let response =await fetch("http://localhost:3000/books",{
        method: 'POST',
        mode:'cors',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(book)
        
    });
    document.getElementById("content").innerHTML = '';
    console.log(response);
    await loadTable();
}
async function deleteBook(){
    // let trash = document.getElementById("bookid");
    console.log(event.target.id)
    //console.log(event.target.id.split('-'));
    let deleteBookId = event.target.id;
    let result = await fetch(`http://localhost:3000/books/${deleteBookId}`,{
        method : 'DELETE',
        mode : 'cors'
    });
    document.getElementById("content").innerHTML = '';
    await loadTable();
}

/* async  function selectId(){
   let tablebody = document.getElementById("tablebody");
    let dropdown = document.getElementById("selection").value;
    let inputtext = document.getElementById("searching").value;
    //console.log(dropdown);
    if(dropdown != 'select'){
    let response = await fetch(`http://localhost:3000/books?id=${dropdown}`)
   // console.log(response);
    let data = await response.json();
    //console.log(data);
    let row = `<tr>
        <td>${data[0].id}</td>
        <td>${data[0].title}</td>
        <td>${data[0].author}</td>
        <td>${data[0].price}</td>
        <td>${data[0].rating}</td>
        <td>
            <span  onclick="deleteBook();"> <i id="${data[0].id}" class="fa fa-trash"></i></span>
        </td>
        </tr>`
    tablebody.innerHTML = row;
    }
    else{
        loadTable();
    }
} */

async function resultTable(data){
    let row = '';
    for(let i = 0 ; i < data.length ; i++){
        row += `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].title}</td>
            <td>${data[i].author}</td>
            <td>${data[i].price}</td>
            <td>${data[i].rating}</td>
            <td>
                <span  onclick="deleteBook();"> <i id="${data[0].id}" class="fa fa-trash"></i></span>
            </td>
            </tr>`
    }
    tablebody.innerHTML = row;
}

async function search(){
    let option = document.getElementById("selection").value;
    let textInput = document.getElementById("searching").value;
    console.log(option);
    switch(option){
        case "id":
            let id1 = await searchById(textInput);
            if(id1.length == 0){
                alert('No Data Found');
                await loadTable();
            }
            resultTable(id1);
            break;
        case "title":
            let title1 = await searchByTitle(textInput);
            if(title1.length == 0){
                alert('No Data Found');
                await loadTable();
            }
            resultTable(title1);
            break;
        case "author":
            let author1 = await searchByAuthor(textInput);
            if(author1.length == 0){
                alert('No Data Found');
                await loadTable();
            }
            resultTable(author1);
            break;
        case "price":
            let price1 = await searchByPrice(textInput);
            if(price1.length == 0){
                alert('No Data Found');
                await loadTable();
            }
            resultTable(price1);
            break;
        case "rating":
            let rating1 = await searchByRating(textInput);
            if(rating1.length == 0){
                alert('No Data Found');
                await loadTable();
            }
            resultTable(rating1);
            break;
        default:
            break;        
    }
}

async function searchById(textInput){
    console.log(textInput);
    let response = await fetch(`http://localhost:3000/books?id=${textInput}`)
    response = await response.json();
    console.log(response);
    return response;
}

async function searchByTitle(textInput){
    console.log(textInput);
    let response = await fetch(`http://localhost:3000/books?title_like=${textInput}`)
    response = await response.json();
    console.log(response);
    return response;
}

async function searchByAuthor(textInput){
    console.log(textInput);
    let response = await fetch(`http://localhost:3000/books?author_like=${textInput}`)
    response = await response.json();
    console.log(response);
    return response;
}

async function searchByPrice(textInput){
    console.log(textInput);
    let response = await fetch(`http://localhost:3000/books?price_lte=${textInput}`)
    response = await response.json();
    console.log(response);
    return response;
}

async function searchByRating(textInput){
    console.log(textInput);
    let response = await fetch(`http://localhost:3000/books?rating_lte=${textInput}`)
    response = await response.json();
    console.log(response);
    return response;
}