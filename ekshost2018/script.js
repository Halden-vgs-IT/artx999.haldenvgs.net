// Variables
const page = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)

// Gives the document a title
function giveTitle(name) {
    document.getElementsByTagName("title")[0].innerHTML = name;
}

window.onload = function () {
    // Checks if age or days are interacted with and activates changeVal()
    if (page === "lift-pass.php") {
        document.querySelectorAll("input").forEach(function (item) {
            item.addEventListener("keyup", changeVal)
            item.addEventListener("change", changeVal)
            item.addEventListener("propertychange", changeVal)
            item.addEventListener("click", changeVal)
            item.addEventListener("input", changeVal)
            item.addEventListener("paste", changeVal)
        })
    }
    // Code for cabins
    if (page === "cabins.php") {
        // Opens info about selected cabin
        document.querySelectorAll(".available").forEach(function (item) {
            item.addEventListener("click", function () {
                const container2 = document.getElementById("container2")
                this.parentElement.style.display = "none"
                container2.style.display = "block"
                let cabin = capitalizeFirstLetter(this.id)
                let xhttp = new XMLHttpRequest()
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        let cabinData = JSON.parse(this.responseText)[cabin]
                        document.getElementById("cabin").innerHTML = cabin
                        document.getElementById("beds").innerHTML = "Sengeplasser: " + cabinData["Sengeplasser"]
                        document.getElementById("standard").innerHTML = "Standard: " + cabinData["Standard"]
                        if (cabinData["Badstue"]) document.getElementById("sauna").innerHTML = "Badstue: Ja"
                        else document.getElementById("sauna").innerHTML = "Badstue: Nei"
                        document.getElementById("book").innerHTML =
                            'Book ' + cabin + ' for ' + cabinData["Ukepris"] + ',- per dag'
                        // Opens page for booking
                        document.getElementById("book").addEventListener("click", function () {
                            this.parentElement.style.display = "none"
                            document.getElementById("container3").style.display = "flex"
                            document.getElementById("cabin2").innerHTML = cabin
                            document.getElementById("back2").addEventListener("click", function () {
                                this.parentElement.style.display = "none"
                                container1.style.display = "block" // Somehow fucking works xD Its not even defined
                            })
                            let holidays = document.getElementById("holidays").getElementsByTagName("th")
                            let array = Array.from(holidays)
                            array.forEach(function (item) {
                                let status = document.getElementById("status").getElementsByTagName("td")
                                if (cabinData["Utleid"][item.innerHTML]) {
                                    status[array.indexOf(item)].innerHTML = "Booket"
                                    status[array.indexOf(item)].classList = "rented"
                                }
                                else {
                                    status[array.indexOf(item)].innerHTML = "Ledig"
                                    status[array.indexOf(item)].classList = "available"
                                    status[array.indexOf(item)].addEventListener("click", function () {
                                        document.getElementById("info").innerHTML =
                                            "Ønsker du å booke " + cabin + " i " + lowercaseFirstLetter(item.innerHTML) + "?"
                                        document.getElementById("book2").style.display = "block"
                                        document.getElementById("book2").addEventListener("click", function () {
                                            var xhttp = new XMLHttpRequest();
                                            xhttp.onreadystatechange = function() {
                                                if (this.readyState === 4 && this.status === 200) {
                                                    alert("Du har nå booket " + cabin + " i " + lowercaseFirstLetter(item.innerHTML) + "!");
                                                    container2.style.display = "none"
                                                    document.getElementById("container3").style.display = "none"
                                                    document.getElementById("container1").style.display = "block"
                                                }
                                            };
                                            xhttp.open("GET", "book-cabin-backend.php?cabin=" + cabin + "&holiday=" + item.innerHTML, true);
                                            xhttp.send();
                                        })
                                    })
                                }

                            })
                        })
                        document.getElementById("slideshow-container").innerHTML =
                            '<a class="next" onclick="plusSlides(1)">&#10095;</a>' +
                            '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>'
                        if (Array.isArray(cabinData["Bilder"])) {
                            cabinData["Bilder"].forEach(function (item) {
                                document.getElementById("slideshow-container").innerHTML +=
                                    '<div class="mySlides fade">' +
                                    '   <img src="images/' + item + '" alt="' + item + '">' +
                                    '</div>'
                            })
                        }
                        showSlides(slideIndex);
                    }
                }
                xhttp.open("GET", "cabins.json", true)
                xhttp.send()
            })
        })
        // Closes info about selected cabin
        document.getElementById("back").addEventListener("click", function () {
            this.parentElement.style.display = "none"
            container1.style.display = "block" // Somehow fucking works xD Its not even defined
        })
        // Displays available cabins based on holiday
        document.getElementById("select").addEventListener("change", function () {
            let select = this.value
            let xhttp = new XMLHttpRequest()
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    let cabinData = JSON.parse(this.responseText)
                    Object.keys(cabinData).forEach(function (item) {
                        let cabin = cabinData[item]
                        let element = document.getElementById(lowercaseFirstLetter(item))
                        if(cabin["Utleid"][select]) {
                            element.classList = "rented"
                            element.innerHTML = '<i class="uil uil-multiply"></i>'
                        }
                        else {
                            element.classList = "available"
                            element.innerHTML = ""
                        }
                    })
                }
            }
            xhttp.open("GET", "cabins.json", true)
            xhttp.send()
        })
    }
}
// Takes the values from the inputs and calculates prices and shows information about it
function changeVal() { // Change name
    // Variables
    const age = document.querySelector("#age")
    const ageInfo = document.querySelector("#ageInfo")
    const days = document.querySelector("#days")
    const priceOut = document.querySelector("#priceOut")
    const discount = document.querySelector("#discount")
    // Checks if age and days are within the boundaries
    if (age.value > 100) {
        age.value = 100
        alert("Du må være mellom 0 og 100 år!")
    }
    if (age.value < 0 && age.value !== "") {
        age.value = 0
        alert("Du må være mellom 0 og 100 år!")
    }
    if (age.value === "") ageInfo.innerHTML = ""
    else if (age.value <= 12) ageInfo.innerHTML = " (Barn)"
    else ageInfo.innerHTML = " (Voksen)"
    if (days.value > 7) {
        days.value = 7
        alert("Du kan bare bestille intill 7 dager!")
    }
    if (days.value < 0 && days.value !== "") days.value = 0
    // Calculates price
    if (age.value === "") var price = ""
    else if (age.value > 12) price = 200
    else price = 100
    if (price !== "" && days.value !== "") {
        let totalPrice = price * days.value
        if (days.value > 5){
            let oldTotalPrice = totalPrice
            totalPrice = 5 * price
            discount.innerHTML = Math.round((1- (totalPrice/oldTotalPrice))*100) + "% avslag!"
        }
        else discount.innerHTML = ""
        priceOut.innerHTML = totalPrice
    }
    else {
        priceOut.innerHTML = ""
        discount.innerHTML = ""
    }
}

// Capitalize the first letter in a given string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1)
}
// Slideshow
let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) slideIndex = 1
    if (n < 1) slideIndex = slides.length
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}