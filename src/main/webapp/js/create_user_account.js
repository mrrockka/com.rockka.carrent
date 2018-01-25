'user strict'

function createUserAccount(){
    showAccount();
}

function showAccount(){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var info = "", json = JSON.parse(this.responseText);
            info =
            "<form id=\"user_info\" class=\"container\">"
            +"<img src=\"/thumbs/users/" + json.username + ".jpg\" class=\"img-rounded thumb\" alt=\"user image\">"
            +"<label for=\"username\" >Username: </label><input id=\"username\" type=\"text\" value=\""
            + json.username + "\" readonly>"
            +"<label for=\"firstname\">First name: </label><input id=\"firstname\" type=\"text\" value=\""
            + json.firstname + "\" readonly>"
            +"<label for=\"secondname\">Second name: </label><input id=\"secondname\" type=\"text\" value=\""
            + json.secondname + "\" readonly>"
            +"<label for=\"lastname>Last nameL: </label><input id=\"lastname\" type=\"text\" value=\""
            + json.lastname + "\" readonly>"
            +"<label for=\"address\">Address: </label><input id=\"address\" type=\"text\" value=\""
            + json.address + "\" readonly>"
            +"<label for=\"birthday\">Birthday: </label><input id=\"birthday\" type=\"text\" value=\""
            + json.birthday + "\" readonly>"
            +"<label for=\"about_me\">About me: </label><input id=\"about_me\" type=\"text\" value=\""
            + json.about_me + "\" readonly>"
            +"<input id=\"user_info_btn\" class=\"btn btn-lg btn-secondary\""
            +"type=\"button\" value=\"Edit\" onclick=\"setEnabled()\">"
            + "</form>";
            document.getElementById("info_div").innerHTML = info;
        }
    }

    xhr.open("GET", '/user/info', true);
    xhr.send();
}

function setEnabled(){

    var form = document.getElementById("user_info");
    var i;
    for(i=0; i<form.length; i++){
        var element = form.elements[i];
        if(element.type != "button"){

            if(element.id == "birthday"){
                var inner = element.value;
                element.type = "date";
                element.value = inner;
            }

            element.readOnly = false;
        }
    }

//  now it's button
    element = document.getElementById("user_info_btn");
    element.value = "Submit";
    element.onclick = "updateAccount()";
}

function updateAccount(){
    var xhr = new XMLHttpRequest(), url = '/user/update/';

    var form = document.getElementById("info_user");

    var i, element;

    for(i = 0; i<form.length; i++){
        element = form.elements[i];

        url += element.id + "/" + element.value;
    }

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var text = this.responseText;
            showAccount();
            alert(text);
        }
    }

    xhr.open("POST", url, true);
    xhr.send();
}

function showOrders(){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var json = JSON.parse(this.responseText);

            var info = "<table class=\"table table-striped\"><h2 class=\"form-std-heading\">Orders</h2>"
                    +"<thead> <tr>"
                    +"<th>Id</th> <th>Car</th> <th>Starts</th>"
                    +"<th>Expires</th> <th>Price</th> <th>Status</th>"
                    +"</tr> </thead>"
                    +"<tbody>";

            var json = JSON.parse(this.responseText);

            for(i = 0; i<json.length; i++){
                info += "<tr>"
                    + "<td><a href=\"#\" onclick=\"showOrderById("
                    +json[i].order_id + ");return false;\">"+json[i].order_id+"</a></td>"
                    + "<td><a href=\"#\" onclick=\"showOrderById("
                    +json[i].order_id + ");return false;\">"+json[i].car_name+"</a></td>"
                    + "<td><a href=\"#\" onclick=\"showOrderById("
                    +json[i].order_id + ");return false;\">"+json[i].starts_at+"</a></td>"
                    + "<td><a href=\"#\" onclick=\"showOrderById("
                    +json[i].order_id + ");return false;\">"+json[i].expires_at+"</a></td>"
                    + "<td><a href=\"#\" onclick=\"showOrderById("
                    +json[i].order_id + ");return false;\">"+json[i].order_price+"</a></td>"
                    + "<td><a href=\"#\" onclick=\"showOrderById("
                    +json[i].order_id + ");return false;\">"+json[i].orderStatus+"</a></td>"
                    + "</tr>";
            }

            info += "</tbody></table>";

            document.getElementById("info_div").innerHTML = info;
        }
    }

    xhr.open("GET", '/user/order/show_all', true);
    xhr.send();
}

function showOrderById(id){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            var i, json = JSON.parse(this.responseText);

            var info = "<div class=\"container\">"
                    +"<h2>Rent car order</h2>"
                    +"<p>Order id: "+json.order_id + "</p>"
                    +"<p>Birthday: "+ json.birthday +"</p>"
                    +"<pCar name: >"+json.car_name+"</p>"
                    +"<p>Car price: " + json.car_price+"</p>"
                    +"<p>Starts: "+ json.starts_at+"</p>"
                    +"<p>Expires: "+ json.expires_at+"</p>"
                    +"<p>Order price: " + json.order_price+"</p>"
                    +"<p>Description: "+ json.description +"</p>"
                    +"<p>Status: "+json.orderStatus +"</p>";

            if(json.status >0 && json.status<3){
                if(json.status != 6){
                    info += "<input type=\"button\" value=\"close order?\" onclick=\"changeOrderStatus("+id +", 6)\">";
                }
            } else {
                if(json.status == 6){
                    info += "<input type=\"button\" value=\"open order?\" onclick=\"changeOrderStatus("+id +", 2)\">";
                }
            }

            info += "</div>";

            document.getElementById("info_div").innerHTML = info;
        }

    }
    xhr.open("GET", 'user/order/'+id, true);
    xhr.send();
}

function changeOrderStatus(id, status){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert(text);
            showOrderById(id);
        }
    }
//    6 - is CLOSED in OrderStatus enum
    xhr.open("POST", '/user/order/update/'+id+'/status/'+status, true);
    xhr.send();


}

