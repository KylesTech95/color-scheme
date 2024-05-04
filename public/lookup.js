// form vars
let subBtn = document.getElementById('lookup-submit')
let val;
let input = document.getElementById('search')
let prefix = 'http://'
let host = window.location.host;
let api = '/colors/lookup/?search='
let query;
const constructURL = () => {

}
// fetch lookup colors api
// fetch('/colors/lookup')
subBtn.onsubmit = e => {
    e.preventDefault();
}
subBtn.onclick = e => {
    e.preventDefault();
    query = input.value;
    fetch(api+query).then(res=>res.json()).then(d=>console.log(d.colors))

}