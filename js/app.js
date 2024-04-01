
let cl = console.log;


const showMovieModel = document.getElementById("showMovieModel");
const movieModel = document.getElementById("movieModel");
const backDrop = document.getElementById("backDrop");
const hideMovieModel = [...document.querySelectorAll(".hideMovieModel")];
const movieForm = document.getElementById("movieForm");
const titleControl = document.getElementById("title");
const imageUrlControl = document.getElementById("imageUrl");
const overviewControl = document.getElementById("overview");
const ratingControl = document.getElementById("rating");
const movieContainer = document.getElementById("movieContainer");
const updateBtn = document.getElementById("updateBtn");
const submitBtn = document.getElementById("submitBtn");




const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

let movieArr = [
    {
        title: `Heart of the Hunter`,
        imageUrl: `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/n726fdyL1dGwt15bY7Nj3XOXc4Q.jpg`,
        overview: `A retired assassin is pulled back into action when his friend uncovers a dangerous conspiracy at the heart of the South African government.`,
        rating: 3,
        movieId: generateUuid()
    },
    {
        title: `Godzilla x Kong: The New Empire`,
        imageUrl: `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/gmGK5Gw5CIGMPhOmTO0bNA9Q66c.jpg`,
        overview: `Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.`,
        rating: 4,
        movieId: generateUuid()
    },
    {
        title: `The Wages of Fear`,
        imageUrl: `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/jFK2ZLQUzo9pea0jfMCHDfvWsx7.jpg`,
        overview: `When an explosion at an oil well threatens hundreds of lives, a crack team is called upon to make a deadly desert crossing with nitroglycerine in tow.`,
        rating: 3,
        movieId: generateUuid()
    }
];



const movieModelToggle = () => {
    movieModel.classList.toggle("active");
    backDrop.classList.toggle("active")
}

const movieTemplating = (arr) => {
    let result = ``;
    arr.forEach(ele => {
        result += `<div class="col-md-4 mt-4">
                    <div class="card">
                        <figure id="${ele.movieId}" class="movieCard mb-0">
                            <div class="movieImg">
                                <img src="${ele.imageUrl}"
                                    alt="${ele.title}" title="${ele.title}">
                            </div>
                            <figcaption>
                                <div class="ratingSection text-white">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-6">
                                            <div class="movieName">
                                                <h4>${ele.title}</h4>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6 text-center">
                                            <div class="rating">
                                            ${ele.rating>4?`<p class = "bg-success">${ele.rating}</p>`:
                                            ele.rating>=2&&ele.rating<=4 ?`<p class = "bg-warning">${ele.rating}</p>`:
                                            `<p class = "bg-danger">${ele.rating}</p>`
                                        }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="overviewSection">
                                    <h4>${ele.title}</h4>
                                    <em>Overview</em>
                                    <p>${ele.overview}</p>
                                    <div class="action">
                                        <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                                        <button class="btn btn-success" onclick="onEdit(this)">Edit</button>
                                    </div>

                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>`
    });
    movieContainer.innerHTML = result;

}

if (localStorage.getItem("movieArr")) {
    movieArr = JSON.parse(localStorage.getItem("movieArr"));
    movieTemplating(movieArr);
}

const addMovie = (obj) => {
    let card = document.createElement("div");
    card.id = obj.movieId;
    card.className = `col-md-4 mt-4`;
    card.innerHTML = `<div class="card">
                        <figure id="${obj.movieId}" class="movieCard mb-0">
                            <div class="movieImg">
                                <img src="${obj.imageUrl}"
                                    alt="${obj.title}" title="${obj.title}">
                            </div>
                            <figcaption>
                                <div class="ratingSection text-white">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-6">
                                            <div class="movieName">
                                                <h4>${obj.title}</h4>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6 text-center">
                                            <div class="rating">
                                            ${obj.rating>4?`<p class = "bg-success">${obj.rating}</p>`:
                                            obj.rating>=2&&obj.rating<=4 ?`<p class = "bg-warning">${obj.rating}</p>`:
                                            `<p class = "bg-danger">${obj.rating}</p>`
                                        }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="overviewSection">
                                    <h4>${obj.title}</h4>
                                    <em>Overview</em>
                                    <p>${obj.overview}</p>
                                    <div class="action">
                                        <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                                        <button class="btn btn-success" onclick="onEdit(this)">Edit</button>
                                    </div>

                                </div>
                            </figcaption>
                        </figure>
                    </div>`;
    movieContainer.prepend(card);
}

const onEdit = (eve) => {
    let editId = eve.closest(".movieCard").id;
    cl(editId);
    localStorage.setItem("editId", editId);
    let editObj = movieArr.find(mov => mov.movieId === editId);
    cl(editObj);
    movieModelToggle();
    titleControl.value = editObj.title;
    imageUrlControl.value = editObj.imageUrl;
    overviewControl.value = editObj.overview;
    ratingControl.value = editObj.rating;
    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
}
const onMovieUpdate = () => {
    let updateId = localStorage.getItem("editId");
    cl(updateId);
    let updateObj = {
        title: titleControl.value,
        imageUrl: imageUrlControl.value,
        overview: overviewControl.value,
        rating: ratingControl.value,
        movieId: updateId
    };
    let getIndex = movieArr.findIndex(mov => mov.movieId === updateId);
    cl(getIndex);
    movieArr[getIndex] = updateObj;
    localStorage.setItem("movieArr", JSON.stringify(movieArr));
    let getCard = document.getElementById(updateId);
    cl(getCard)
    getCard.innerHTML = `<div class="card">
                            <figure id="${updateObj.movieId}" class="movieCard mb-0">
                                <div class="movieImg">
                                    <img src="${updateObj.imageUrl}"
                                        alt="${updateObj.title}" title="${updateObj.title}">
                                </div>
                                <figcaption>
                                    <div class="ratingSection text-white">
                                        <div class="row">
                                            <div class="col-md-9 col-sm-6">
                                                <div class="movieName">
                                                    <h4>${updateObj.title}</h4>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-sm-6 text-center">
                                                <div class="rating">
                                                ${updateObj.rating>4?`<p class = "bg-success">${updateObj.rating}</p>`:
                                                updateObj.rating>=2&&updateObj.rating<=4 ?`<p class = "bg-warning">${updateObj.rating}</p>`:
                                                `<p class = "bg-danger">${updateObj.rating}</p>`
                                            }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="overviewSection">
                                        <h4>${updateObj.title}</h4>
                                        <em>Overview</em>
                                        <p>${updateObj.overview}</p>
                                        <div class="action">
                                            <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                                            <button class="btn btn-success" onclick="onEdit(this)">Edit</button>
                                        </div>

                                    </div>
                                </figcaption>
                            </figure>
                        </div>`;
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    movieForm.reset();
    movieModelToggle();
    swal.fire({
        title: `${updateObj.title} movie information updated SuccessFully!!!`,
        icon: `success`,
        timer: 2000
    })

}

const onDelete = (eve) => {
    let deleteId = eve.closest(".movieCard").id;
    let getIndex = movieArr.findIndex(mov => mov.movieId === deleteId);
    let deleteObj = movieArr[getIndex];
    Swal.fire({
        title: `Are you sure, you want to delete ${deleteObj.title}`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            movieArr.splice(getIndex, 1);
            localStorage.setItem("movieArr", JSON.stringify(movieArr));
            eve.closest(".col-md-4").remove();
            Swal.fire({
                title: `${deleteObj.title} movie deleted successfully!!!`,
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });


}

const onMovieFormSubmit = (eve) => {
    eve.preventDefault();
    let newMovie = {
        title: titleControl.value,
        imageUrl: imageUrlControl.value,
        overview: overviewControl.value,
        rating: ratingControl.value,
        movieId: generateUuid()
    }
    movieArr.unshift(newMovie);
    localStorage.setItem("movieArr", JSON.stringify(movieArr));
    // movieTemplating(movieArr);
    addMovie(newMovie);
    eve.target.reset();
    swal.fire({
        title: `New Movie ${newMovie.title} Added SuccessFully!!!`,
        icon: `success`,
        timer: 2000
    })
    movieModelToggle();

}

hideMovieModel.forEach(ele => {
    ele.addEventListener("click", movieModelToggle)
});
showMovieModel.addEventListener("click", movieModelToggle);
movieForm.addEventListener("submit", onMovieFormSubmit);
updateBtn.addEventListener("click", onMovieUpdate);
