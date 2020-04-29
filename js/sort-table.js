/*
 * Sorts a HTML table
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The indexOf the column to sort
 * @param {boolen} asc Determines if the sorting will be in ascending
 */
function sortTableByClolumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1
    const tBody = table.tBodies[0]
    const rows = Array.from(tBody.querySelectorAll('tr'))

    // sort each row
    const sortedRows = rows.sort((a, b) => {
        console.log(a)
        console.log(b)
    })
}

sortTableByClolumn(document.querySelector('table'), 1)