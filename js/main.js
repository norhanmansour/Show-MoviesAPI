// get data from API
var allData;
const apiKey = '978e78abb24a4a96e6d401aad2542b97';
async function getMovies(id) {
    if (id !== 'trending') {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1`)
        let data = await response.json();
        data = await data.results;
        allData = data;

        displayData()

    } else if (id == 'trending') {
        let response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
        let data = await response.json();
        data = await data.results;
        allData = data;
        displayData()
    }
    console.log(allData);
}

async function Show() {
    await getMovies('trending');
    displayData();
}
Show()




// ////////////////////////////////////////////////////////////search MOVIES by including letters
let searchIput = document.getElementById('searchByword');
searchIput.addEventListener('keyup', function() {

    let containAllData = '';
    for (var i = 0; i < allData.length; i++) {
        if (allData[i].title.toLowerCase().includes((searchIput.value).toLowerCase())) {
            containAllData +=
                `
                <div class="col-md-4 mb-4">
                <div id="imgContainer">
                <img class="w-100 h-100"  src="https://image.tmdb.org/t/p/w500/${allData[i].poster_path}"></img>
                <div class="img-layer d-flex flex-column  justify-content-center">       
                <h4 class="">${allData[i].title}</h4>
                <p>${allData[i].overview}</p>
                <p>rate:${allData[i].vote_average}</p>
                <p>${allData[i].release_date }</p>
                 </div>
                </div>
                </div>

            `
            document.getElementById('data').innerHTML = containAllData;
        }
    }
})

// ////////////////////////////////////////////////////////search by search api all movies

let searchLetters = document.getElementById('searchLetters');
searchLetters.addEventListener('keyup', async function(e) {
    console.log(e.key)
    if (e.key !== 'Backspace') {
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=978e78abb24a4a96e6d401aad2542b97&query=${searchLetters.value}`)
        let data = await response.json();
        allData = data.results
        console.log(allData)
    }
    let containAllData = '';
    for (var i = 0; i < allData.length; i++) {
        if (allData[i].title.toLowerCase().includes((searchLetters.value).toLowerCase()) && allData[i].poster_path !== '') {
            containAllData +=
                `
        <div class="col-md-4 mb-4">
        <div id="imgContainer">
        <img class="w-100 h-100"  src="https://image.tmdb.org/t/p/w500/${allData[i].poster_path}"></img>
        <div class="img-layer d-flex flex-column  justify-content-center">       
        <h4 class="">${allData[i].title}</h4>
        <p>${allData[i].overview}</p>
        <p>rate:${allData[i].vote_average}</p>
        <p>${allData[i].release_date }</p>
         </div>
        </div>
        </div>

        `
            document.getElementById('data').innerHTML = containAllData;
        }
    }
})




////////////////////////////////////////////DISPLAY DATA
function displayData() {
    let containAllData = '';

    for (let i = 0; i < allData.length; i++) {
        containAllData +=
            `
        <div class="col-md-4 mb-4">
        <div id="imgContainer">
        <img class="w-100 h-100"  src="https://image.tmdb.org/t/p/w500/${allData[i].poster_path}"></img>
        <div class="img-layer d-flex flex-column  justify-content-center">       
        <h4 class="">${allData[i].title }</h4>
        <p>${allData[i].overview}</p>
        <p>rate:${allData[i].vote_average}</p>
        <p>${allData[i].release_date}</p>
         </div>
        </div>
        </div>
      
        `
        document.getElementById('data').innerHTML = containAllData;

    }
}

// //////////////////////////////////////////////////////////END DISPLAY DATA




/////////////////////////////////////////////////////SIDENAV
let navlinksWidth = $('#navLinks').outerWidth();
console.log(navlinksWidth)
$('#openNav').click(function() {
    $('#navLinks').animate({ left: '250px' }, 1000),
        $('#ocordion').animate({ left: navlinksWidth }, 1000),
        $('#closeIcon').css({ 'display': 'block' }, 10),
        $('#openNav').css({ 'display': 'none' }, 10),
        $('#now_playing').animate({ opacity: '1', paddingTop: "25px" }, 500),
        $('#popular').animate({ opacity: '1', paddingTop: "25px" }, 500),
        $('#top_rated').animate({ opacity: '1', paddingTop: "25px" }, 500),
        $('#trending').animate({ opacity: '1', paddingTop: "25px" }, 500),
        $('#upcoming').animate({ opacity: '1', paddingTop: "25px" }, 500),
        $('#contactUs').animate({ opacity: '1', paddingTop: "25px" }, 500)


})


$('#closeIcon').click(function() {
    $('#navLinks').animate({ left: '0px' }, 1000)
    $('#closeIcon').css({ 'display': 'none' }, 10)
    $('#openNav').css({ 'display': 'block' }, 10)
    $('#now_playing').animate({ opacity: '0', paddingTop: "500px" }, 500),
        $('#popular').animate({ opacity: '0', paddingTop: "500px" }, 500),
        $('#top_rated').animate({ opacity: '0', paddingTop: "500px" }, 500),
        $('#trending').animate({ opacity: '0', paddingTop: "500px" }, 500),
        $('#upcoming').animate({ opacity: '0', paddingTop: "500px" }, 500),
        $('#contactUs').animate({ opacity: '0', paddingTop: "500px" }, 500)
})


// ////////////////////get movies {trnding ,popular ........}

$('#navLinks li').click(function() {
    let id = $(this).attr('id')
    if (id == 'contactUs') {
        let conoffset = $('#contact').offset().top
        $("body,html").animate({ scrollTop: conoffset }, 1000)

    } else {

        getMovies(id)
    }
    console.log(id)
})

// ////////////////////////////////////////////////////////////////////////END Navigation


// **********************************************VALIDATIONS*****************************************//

// //////////////////////////////////////////////////////////////////REJEX for Name


let namerejex = /^[a-z]{3,10}$/
var userName = document.getElementById('userName')
userName.addEventListener('keyup', function() {
    if (namerejex.test(userName.value)) {
        $('#alertName').addClass('d-none');

    } else {
        $('#alertName').removeClass('d-none');
    }

})

// //////////////////////////////////////////////////////////////////REJEX for Email


var emailRejex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var userEmail = document.getElementById('email')
userEmail.addEventListener('keyup', function() {
    if (emailRejex.test(userEmail.value)) {
        $('#alertEmail').addClass('d-none');
    } else {
        $('#alertEmail').removeClass('d-none');
    }

})


// ////////////////////////////////////////////////////////////////rejex for phone

var phoneRejex = /^01[50296][0-9]{8}$/;
var userPhone = document.getElementById('phone')
userPhone.addEventListener('keyup', function() {
    if (phoneRejex.test(userPhone.value)) {
        $('#alertPhone').addClass('d-none');
    } else {
        $('#alertPhone').removeClass('d-none');
    }
})

// //////////////////////////////////////////////////////////////////rejex for age
var ageRejex = /^[1-9][0-9]$/;
var userAge = document.getElementById('age')
userAge.addEventListener('keyup', function() {
    if (ageRejex.test(userAge.value) && userAge.value >= 18) {
        $('#alertAge').addClass('d-none');
    } else {
        $('#alertAge').removeClass('d-none');
    }

})

// /////////////////////////////////////////////////////////////////////rejex for password
var passwordRejex = /^[A-Z][a-z0-9]{7,12}$/;
var userPassword = document.getElementById('password')
userPassword.addEventListener('keyup', function() {
    if (passwordRejex.test(userPassword.value)) {
        $('#alertPassword').addClass('d-none');
    } else {
        $('#alertPassword').removeClass('d-none');
    }

})
let submitBtn = document.getElementById('submitBtn')
var userrePassword = document.getElementById('repassword')

userrePassword.addEventListener('keyup', function() {
    if (userPassword.value == userrePassword.value && userPassword.value != 0 && userrePassword.value != 0) {
        submitBtn.removeAttribute('disabled')
    } else {
        submitBtn.disabled = 'true'
    }
})