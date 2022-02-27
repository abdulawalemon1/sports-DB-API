const parent = document.getElementById('player-container');
const searchPlayer = () => {
    const searchField = document.getElementById('search-box');
    const searchValue = searchField.value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPlayerDetails(data.player))
    searchField.innerText = '';
    // parent.innerHTML=
};

const showPlayerDetails = (players) => {
    console.log(players)
    for (const player of players) {

        const div = document.createElement('div');
        div.innerHTML = `
    
    <div class="card border p-5">
        <div class="pro-pic">
            <img src="${player.strThumb}" class="w-25" src="" alt="">
        </div>
        <h2>Name: ${player.strPlayer}</h2>
        <h5>Country:${player.strNationality}</h5>
        <p></p>
        <div class="allButton">
            <button class="btn btn-danger">Delete</button>
            <button onclick="getDetails('${player.idPlayer}')" class="btn btn-success">Details</button>
        </div>
    </div>

    `;
        parent.appendChild(div);
        console.log(player)
    }



}
const getDetails = (idPlayer) => {
    // console.log(idPlayer);
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${idPlayer}`
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.players[0]));
}
const setDetails = (info) => {
    console.log(info)
}