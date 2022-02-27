const parent = document.getElementById('player-container');
const searchPlayer = () => {
    parent.innerHTML = '';
    document.getElementById('spinner').style.display = 'block'
    const searchField = document.getElementById('search-box');
    const searchValue = searchField.value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.player == null) {
                document.getElementById('spinner').style.display = 'block';
            } else {

                showPlayerDetails(data.player);
                document.getElementById('spinner').style.display = "none";
            }

        });
}

const showPlayerDetails = (players) => {


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
    if (info.strGender == "Male") {
        document.getElementById('male').style.display = 'block';
        document.getElementById('female').style.display = 'none';
    } else {
        document.getElementById('female').style.display = 'block';
        document.getElementById('male').style.display = 'none';

    }
    document.getElementById('detail-container').innerHTML = `
    <div>
        <h2>Player Details</h2>
        <img class="img-fluid" src="${info.strThumb}" alt="">
        <h1>Name: ${info.strPlayer}</h1>
        <h5>Gender: ${info.strGender}</h5>
        <h5>Height: ${info.strHeight}</h5>
        <h5>Country: ${info.strNationality}</h5>
        <h5>Sport: ${info.strSport}</h5>
        <h5>Teams: ${info.strTeam},${info.strTeam2}</h5>
        <h5>Position: ${info.strPosition}</h5>
        <h5>Jercy Number: ${info.strNumber}</h5>
        <h5>Wage:${info.strWage}</h5>
        
    </div>`;
}