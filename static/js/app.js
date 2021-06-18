// whole list in the database 
document.addEventListener("DOMContentLoaded", function() {
   
    $.ajax({  
        
        url: 'https://student-regapp.herokuapp.com//api/student-list/',  
        cache: false,
        type: 'GET',  
        dataType: 'json',  
        
        success: function (data){

            $.each(data.all_student, function (i, item) {
                // console.log(item.id);
                
                $("#tbody").append(
                    "<tr>"
                    + "<td>" + item.id + "</td>"
                    + "<td>" + item.fname + "</td>"
                    + "<td>" + item.lname + "</td>"
                    + "<td>"+`<button value=${item.id} id="edit-btn" type="button" class="btn btn-outline-dark btn-sm mx-1 editBtn" data-toggle="modal" data-target="#update">Update</button>`+
                    `<button value=${item.id} id = "delete-btn" type="button" class="btn btn-outline-dark btn-sm mx-1 delBtn">Delete</button>`
                 +"</td>"
                    + "</tr>" )
                });
            }
    });  
});

// deletebtn
$("body").on("click",".delBtn", function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "https://student-regapp.herokuapp.com//delete/",
        data: { 
            id: $(this).val(),
           
        },
        success: function(result) {
            window.top.location = window.top.location;

            // alert('Deleted!');
        },
        error: function(result) {
            alert('error');
        }
    });
});

// add records
$("body").on("click",".addsub", function(e) {
    e.preventDefault();
    // console.log(e)
    $.ajax({
        type: "POST",
        url: "https://student-regapp.herokuapp.com//add/",
        dataType:'json',
        data: { 
            fname:$('#fname').val(),
            lname:$('#lname').val()
        },
        success: function(data) {
        window.top.location = window.top.location;
            
        },
        error: function(result) {
            alert("Not Added!");
        }
    });
});

// Predefined update values
$("body").on("click",".editBtn", function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "https://student-regapp.herokuapp.com//api/single/",
        data: { 
            id: $(this).val(),
        },
        success: function(result) {
            $('#fnameup').val(result.fname);
            $('#lnameup').val(result.lname);
            
     }
    });
});

// update button
$("body").on("click",".updtbtn", function(e) {
    e.preventDefault();
    
    $.ajax({
        type: "POST",
        url: "https://student-regapp.herokuapp.com//edit/",
        dataType:'json',
        data: { 
            id : $('#edit-btn').val(),
            fname:$('#fnameup').val(),
            lname:$('#lnameup').val()
        },
        success: function(data) {
        window.top.location = window.top.location;
            
        },
        error: function(result) {
            alert("Not Updated!");
        }
    });
});

// fetch records
$("body").on("click",".idbtn", function(e) {
    // alert($('#id').val());
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "https://student-regapp.herokuapp.com//api/single/",
        data: { 
            id: $('#id').val(),
        },
        success: function(result) {
            $("#lim-id").html('Student Info!')
            $("#tbodysingle").empty();
            
                $("#tbodysingle").append(
                    "<thead>"+
                    "<tr>"+
                      "<th scope='col'>Id</th>"+
                      "<th scope='col'>First Name</th>"+
                      "<th scope='col'>Last Name</th>"+
                   " </tr>"+
                  "</thead>"+
                  "<tbody >"+
                  "<tr>"
                  + "<td>" + result.id + "</td>"
                  + "<td>" + result.fname + "</td>"
                  + "<td>" + result.lname + "</td>"+
                  "</tr>"+
              
                  "</tbody>")



        },
        error: function(result) {
            alert("Missing record!");
        }
    });
});

// limit-records
$("body").on("click",".limbtn", function(e) {
    // alert($('#id').val());
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "https://student-regapp.herokuapp.com//api/limit/",
        data: { 
            lim: $('#lim').val(),
        },
        success: function(result) {
            $("#lim-id").html('Fetched records!');
            $("#tbodysingle").empty();
            $("#tbodysingle").append(
                "<thead>"+
                "<tr>"+
                  "<th scope='col'>Id</th>"+
                  "<th scope='col'>First Name</th>"+
                  "<th scope='col'>Last Name</th>"+
               " </tr>"+
              "</thead>"+
              "<tbody id='limrec'>"+
              "</tbody>")
            $.each(result.all_student, function (i, item) {
               
                $("#limrec").append(
                    "<tr>"
                    + "<td>" + item.id + "</td>"
                    + "<td>" + item.fname + "</td>"
                    + "<td>" + item.lname + "</td>"
                    + "</tr>" )
                });
        },
        error: function(result) {
            alert("Out of bound record!");
        }
    });
});

//  Modal Closures
$("#idsbtbtn").click(function(){
    $("#idmodal").modal('hide');
});

$("#addsub").click(function(){
    $("#add").modal('hide');
});

$("#updatebtn").click(function(){
    $("#update").modal('hide');
});

$("#limsbtbtn").click(function(){
    $("#limmodal").modal('hide');
});