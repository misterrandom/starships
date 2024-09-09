export function buildReportData(films, starships) {
    const filmShips = [];
    for (var i=0; i<films.length; i++) {
        // create an object for each film that contains the title and placeholders for counts and totals
        const film = {
            url: films[i].url,
            // I don't think I ended up using episode
            episode: films[i].episode_id,
            title: films[i].title,
            starship_cost: 0,
            total_cost_no_ds: 0,
            unknown_cost_count: 0,
            known_cost_count: 0,
            starship_count: films[i].starships.length
        };
        filmShips.push(film);
    }
    for (var i=0; i<starships.length; i++) {
        // get cost info for each starship 
        const ship = starships[i];
        // we count starships cost as 0 if unknown
        const cost = ship.cost_in_credits == "unknown" ? 0 : Number(ship.cost_in_credits);
        
        // include a 2nd total that excludes death star
        const costWithoutDS = ship.name == "Death Star" ? 0 : cost;
        const shipFilmList = starships[i].films;
        for (var j=0; j<shipFilmList.length; j++) {
            // the api url is used as lookup value between starships and films apis
            const filmUrl = shipFilmList[j];
            // add cost details for the current starship to each film that contains the starship
            const selectedFilm = filmShips.find(f => {
                return f.url === filmUrl;
            });
            // The cost gets rather large so we divide by 1 million. The cost is reported in millions of credits in the charts
            selectedFilm.starship_cost += (cost/1000000);
            selectedFilm.total_cost_no_ds += (costWithoutDS/1000000);
            // At this point, starships with an unknown cost have a value of 0. We count them to further provide insight on quality of data.
            if(cost==0) {
                selectedFilm.unknown_cost_count += 1;
            } else {
                selectedFilm.known_cost_count += 1;
            }
        }
    }
    for (var i=0; i<filmShips.length; i++) {
        // this is a janky way of rounding the cost values so they are more readable. It's only applied after we get the final cost values. It works, though.
        filmShips[i].starship_cost = Math.round(filmShips[i].starship_cost * 10) / 10;
        filmShips[i].total_cost_no_ds = Math.round(filmShips[i].total_cost_no_ds * 10) / 10;
    }
    return filmShips;
}