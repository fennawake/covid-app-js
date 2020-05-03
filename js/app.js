/*
 *   TODO LIST
 *   [ ] insert arrow inside th
 *   [ ] fixed th after determined height
 *   [ ] populate select box
 *   [ ] create function to reload table after select country in the select box
 *   [ ] insert atual date inside boxes in the today span
 *   [ ] click on country and load anew table with new datas about determinate country
 */




const API_URL = "https://covid19.mathdro.id/api/countries"
const API_URL_COUNTRY = "https://corona.lmao.ninja/v2/countries"
const API_URL_ALL = "https://corona.lmao.ninja/v2/all"

getAll()
async function getAll() {
    const response = await fetch(API_URL_ALL)
    const data = await response.json()

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
    const continent = data.continent
    const affectedCountries = data.affectedCountries

    const _div_cases = document.getElementById("cases")
    const _div_deaths = document.getElementById("deaths")
    const _div_recovered = document.getElementById("recovered")
    const _div_actives = document.getElementById("actives")
    const _div_critical = document.getElementById("critical")

    const _span_cases = document.createElement('span')
    const _span_cases_today = document.createElement('span')
    const _span_deaths = document.createElement('span')
    const _span_deaths_today = document.createElement('span')
    const _span_recovered = document.createElement('span')
    const _span_active = document.createElement('span')
    const _span_critical = document.createElement('span')

    _span_cases.setAttribute("class", "total-cases")
    _div_cases.appendChild(_span_cases).innerHTML = formatNumber(cases)
    _div_cases.insertBefore(_span_cases, document.getElementById("title-cases"))

    _span_cases_today.setAttribute("class", "total-cases-today")
    _div_cases.appendChild(_span_cases_today).innerHTML = formatNumber(todayCases)
    _div_cases.insertBefore(_span_cases_today, document.getElementById("title-cases-today"))

    _span_deaths.setAttribute("class", "total-deaths")
    _div_deaths.appendChild(_span_deaths).innerHTML = formatNumber(deaths)
    _div_deaths.insertBefore(_span_deaths, document.getElementById("title-deaths"))

    _span_deaths_today.setAttribute("class", "total-deaths-today")
    _div_deaths.appendChild(_span_deaths_today).innerHTML = formatNumber(todayDeaths)
    _div_deaths.insertBefore(_span_deaths_today, document.getElementById("title-deaths-today"))

    _span_recovered.setAttribute("class", "total-recovered")
    _div_recovered.appendChild(_span_recovered).innerHTML = formatNumber(recovered)
    _div_recovered.insertBefore(_span_recovered, document.getElementById("title-recovered"))

    _span_active.setAttribute("class", "total-actives")
    _div_actives.appendChild(_span_active).innerHTML = formatNumber(active)
    _div_actives.insertBefore(_span_active, document.getElementById("title-actives"))

    _span_critical.setAttribute("class", "total-critical")
    _div_critical.appendChild(_span_critical).innerHTML = formatNumber(critical)
    _div_critical.insertBefore(_span_critical, document.getElementById("title-critical"))
}

getCountries(API_URL_COUNTRY)
async function getCountries(API_URL_COUNTRY) {

    const response = await fetch(API_URL_COUNTRY)
    const data = await response.json()

    const total = document.getElementById('searchCountry')
    const _p = document.createElement('p')
    total.appendChild(_p).innerHTML = data.length + " coutries affecteds"

    if (data.length > 0) {

        let temp = ''

        data.forEach((response) => {
            temp += "<tr>"
            temp += "<td class='flag'><img src='" + response.countryInfo.flag + "' width='32px' /></td>"
            temp += "<td class='country'>" + response.country + "</td>"
            temp += "<td class='cases'>" + formatNumber(response.cases) + "</td>"
            temp += "<td class='deaths'>" + formatNumber(response.deaths) + "</td>"
            temp += "<td class='recovered'>" + formatNumber(response.recovered) + "</td>"
            temp += "<td class='active'>" + formatNumber(response.active) + "</td>"
            temp += "<td class='critical'>" + formatNumber(response.critical) + "</td>"
            temp += "<td class='tests'>" + formatNumber(response.tests) + "</td>"
            temp += "<td class='continent'>" + response.continent + "</td>"
            temp += "</tr>"
        })
        document.getElementById('data-body').innerHTML = temp;
        $("#data").tablesorter();
    }
}


function formatNumber(n) {
    var n = n.toString();
    var r = '';
    var x = 0;

    for (var i = n.length; i > 0; i--) {
        r += n.substr(i - 1, 1) + (x == 2 && i != 1 ? ',' : '');
        x = x == 2 ? 0 : x + 1;
    }

    return r.split('').reverse().join('');
}