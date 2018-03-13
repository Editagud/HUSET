function getAllEvents() {
    fetch("http://editagud.com/wordpress/wp-json/wp/v2/events?_embed&categories=10")
        .then(res => res.json())
        .then(showEvents);
}

function getEventbyCategory(categoryId) {
    fetch("http://editagud.com/wordpress/wp-json/wp/v2/events?_embed&categories=" + categoryId)
        .then(res => res.json())
        .then(showEvents);
}

function getSingleEventById(eventId) {
    fetch("http://editagud.com/wordpress/wp-json/wp/v2/events/" + eventId + "/?_embed")
        .then(res => res.json())
        .then(showSingleEvent);
}

function showSingleEvent(json) {
    document.querySelector("#single h1").textContent = json.title.rendered;
    document.querySelector("#single .price span").textContent = json.acf.price;

}

function getMenu() {
    fetch("http://editagud.com/wordpress/wp-json/wp/v2/categories")
        .then(res => res.json())
        .then(showMenu);
}

function showMenu(categories) {
    let list = document.querySelector("#linkTemplate").content;
    categories.forEach(function (category) {
        if(category.parent==10){
        let clone = list.cloneNode(true);
        let parent = document.querySelector('.category-menu');
        clone.querySelector('a').textContent = category.name;
        clone.querySelector('a').setAttribute('href', 'index.html?categoryid=' + category.id);
        parent.appendChild(clone);
        }
    });
}



function showSingleEvent(data) {
    document.querySelector('#single h1').textContent = data.title.rendered;
    document.querySelector('#single img').setAttribute('src', data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
    document.querySelector('.price span').textContent = data.acf.price;
    document.querySelector('.genre span').textContent = data.acf.genre;
    document.querySelector('.time span').textContent = data.acf.time;
    document.querySelector('.doorsopen span').textContent = data.acf.doors_open;
    document.querySelector('.location span').textContent = data.acf.location;
    document.querySelector('.content').innerHTML = data.content.rendered;
}

function showEvents(data) {

    let list = document.querySelector('#list');
    let template = document.querySelector('#eventTemplate').content;

    data.forEach(function (theEvent) {
        //console.log(theEvent)
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
        let genre = clone.querySelector(".genre span");
        let time = clone.querySelector(".time span");
        let doorsopen = clone.querySelector(".doorsopen span");
        let location = clone.querySelector(".location span");
        let excerpt = clone.querySelector(".excerpt");
        let price = clone.querySelector(".price span");
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.read-more");

        title.textContent = theEvent.title.rendered;
        genre.textContent = theEvent.acf.genre;
        time.textContent = theEvent.acf.time;
        doorsopen.textContent = theEvent.acf.doors_open;
        location.textContent = theEvent.acf.location;
        excerpt.innerHTML = theEvent.excerpt.rendered.slice(theEvent.excerpt.rendered.indexOf('<'), theEvent.excerpt.rendered.lastIndexOf('<a'));
        theEvent.excerpt.rendered;
        price.textContent = theEvent.acf.price;
        img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url);

        link.setAttribute("href", "events.html?id=" + theEvent.id);
        list.appendChild(clone);
    });
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let categoryid = searchParams.get("categoryid");

getMenu();
if (id) {
    getSingleEventById(id);
} else if (categoryid) {
    getEventbyCategory(categoryid);
} else {
    getAllEvents();
}
 
