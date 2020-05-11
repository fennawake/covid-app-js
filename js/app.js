/*
 *   TODO LIST
 *   [x] populate select box
 *   [x] create function to reload number's boxes after select country in the select box
 *   [x] insert atual date
 *   [x] insert footer
 *   [x] Adjust for fonts responsives
 *   [x] Mobile responsive
 *   [ ] click on country and load a new table with new datas about determinate country
 *   [ ] insert arrow inside th
 *   [ ] fixed th after determined height
 *   [ ] Insert google analytics
 */



/*
 *  API's
 */

const API_URL_ALL = "https://corona.lmao.ninja/v2/all"
const API_URL_COUNTRY = "https://corona.lmao.ninja/v2/countries"

/*
 *  API FETCH
 */

async function getData(url) {
    const res = await fetch(url);
    let resOK = res && res.status;
    if (resOK === 200) {
        return res.json();
    }
}


/*
 *  GET ALL RESULTS
 *  get and format all numbers from API
 */
const allResults = function(url) {
    getData(url).then(data => {

        const cases = data.cases
        const todayCases = data.todayCases
        const deaths = data.deaths
        const todayDeaths = data.todayDeaths
        const recovered = data.recovered
        const active = data.active
        const critical = data.critical
        const casesPerOneMillion = data.casesPerOneMillion
        const deathsPerOneMillion = data.deathsPerOneMillion
        const tests = data.tests
        const testsPerOneMillion = data.testsPerOneMillion
        const affectedCountries = data.affectedCountries

        const _span_cases = document.querySelector(".total-cases")
        _span_cases.innerHTML = new Intl.NumberFormat("en", { notation: "standard" }).format(cases)
        const _span_cases_today = document.querySelector(".total-cases-today")
        _span_cases_today.innerHTML = new Intl.NumberFormat("en", { notation: "standard" }).format(todayCases)

        const _span_deaths = document.querySelector(".total-deaths")
        _span_deaths.innerHTML = new Intl.NumberFormat("en", { notation: "standard" }).format(deaths);
        const _span_deaths_today = document.querySelector(".total-deaths-today")
        _span_deaths_today.innerHTML = new Intl.NumberFormat("en", { notation: "standard" }).format(todayDeaths)

        const _span_recovered = document.querySelector(".total-recovered")
        _span_recovered.innerHTML = new Intl.NumberFormat("en", { notation: "standard" }).format(recovered)

        const _span_active = document.querySelector(".total-actives")
        _span_active.innerHTML = new Intl.NumberFormat("en", { notation: "standard" }).format(active)

        const _span_critical = document.querySelector(".total-critical")
        _span_critical.innerHTML = new Intl.NumberFormat("en", { notation: "standard" }).format(critical)
    })
}
allResults(API_URL_ALL)


/*
 *  POPULATE FILTER
 *  populate with countries from API
 */
const populateFilter = function(url) {
    getData(url).then(data => {
        const selectCountry = document.getElementById("search")

        return data.map(function(response) {
            const element = document.createElement("option")

            element.value = response.country
            element.textContent = response.country
            selectCountry.appendChild(element)
        })
    })
}
populateFilter(API_URL_COUNTRY)

document.getElementById("search").addEventListener("change", event => {
    if (event.target.value !== "0") {
        allResults(`${API_URL_COUNTRY}/${event.target.value}`)
    } else {
        allResults(API_URL_ALL)
    }
});

/*
 *  POPULATE TABLE
 *  populate with datas from API
 */
const populateTable = function(url) {
    getData(url).then(data => {

        const countriesAffecteds = document.querySelector('.countries-cases')
        countriesAffecteds.innerHTML = data.length + " countries affecteds"

        let temp = ''

        data.forEach((response) => {
            temp += "<tr>"
            temp += "<td class='flag'><img src='" + response.countryInfo.flag + "' width='32px' /></td>"
            temp += "<td class='country'>" + response.country + "</td>"
            temp += "<td class='cases'>" + new Intl.NumberFormat("en", { notation: "standard" }).format(response.cases) + "</td>"
            temp += "<td class='deaths'>" + new Intl.NumberFormat("en", { notation: "standard" }).format(response.deaths) + "</td>"
            temp += "<td class='recovered'>" + new Intl.NumberFormat("en", { notation: "standard" }).format(response.recovered) + "</td>"
            temp += "<td class='active'>" + new Intl.NumberFormat("en", { notation: "standard" }).format(response.active) + "</td>"
            temp += "<td class='critical'>" + new Intl.NumberFormat("en", { notation: "standard" }).format(response.critical) + "</td>"
            temp += "<td class='tests'>" + new Intl.NumberFormat("en", { notation: "standard" }).format(response.tests) + "</td>"
            temp += "<td class='continent'>" + response.continent + "</td>"
            temp += "</tr>"
        })

        document.getElementById('data-body').innerHTML = temp;

        $("#data").tablesorter({
            headers: {
                '.th-flag, .th-country': {
                    sorter: false
                }
            }
        });
    })
}
populateTable(API_URL_COUNTRY)

/*
 *  GET HOURS
 */

const getHours = function() {
    let text;
    let day = new Date();
    let d = day.getDate();
    let m = day.getMonth() + 1;
    let y = day.getFullYear();
    const dayweek = document.querySelector(".dateWeek");

    switch (new Date().getDay()) {
        case 1:
            text = "Monday";
            break;
        case 2:
            text = "Tuesday";
            break;
        case 3:
            text = "Wednesday";
            break;
        case 4:
            text = "Thursday";
            break;
        case 5:
            text = "Friday";
            break;
        case 6:
            text = "Saturday";
            break;
        default:
            text = "Sunday";
    }

    dayweek.innerHTML = `${d}/${m}/${y} | ${text}`;
}
getHours();