function getDateFormat(value){       // function for making all dates into one format
    date_input = new Date(value);
    var day = date_input.getDate();
    var month = date_input.getMonth() + 1;
    var year = date_input.getFullYear();
    var yyyy_MM_dd = year + "-" + month + "-" + day;
    return yyyy_MM_dd;
}

let executed = false;  // prevents data showing more than once
const uploadedFile = document.getElementById('upload-confirm').
addEventListener('click', () => {
    Papa.parse(document.getElementById('file-input').files[0],
    {
        download: true,
        skipEmptyLines: true,
        complete: function getHighestPair(employees) {
            if(!executed) {
                executed = true;
                employees.data.forEach((empl1) => {
                    employees.data.slice(employees.data.indexOf(empl1) + 1, employees.data.length).forEach((empl2) => {     // removes the first array (already used) so there is no duplication of the same projects
                        let startDate1, startDate2, endDate1, endDate2;
                        if (empl1[0] !== empl2[0]) {
                            startDate1 = getDateFormat(empl1[2]);
                            endDate1 = empl1[3] === "NULL" ? getDateFormat(new Date()) : getDateFormat(empl1[3]);
                            startDate2 = getDateFormat(empl2[2]);
                            endDate2 = empl2[3] === "NULL" ? getDateFormat(new Date()) : getDateFormat(empl2[3]);
                            if (empl1[1] === empl2[1]) {
                                if (startDate1 <= endDate2 && startDate2 <= endDate1) {
                                    const start = startDate1 <= startDate2 ? startDate2 : startDate1;
                                    const end = endDate1 <= endDate2 ? endDate1 : endDate2;
                                    const timeBetween = Date.parse(end) - Date.parse(start);      // parsing a string into date object
                                    const timeDays = Math.ceil(timeBetween / (1000 * 60 * 60 * 24));
                                    const pairArray = [empl1[0], empl2[0], empl1[1], timeDays];
                                    const tableWithValues = document.createElement('table');
                                    const tr = tableWithValues.insertRow();
                                    for (let j = 0; j < pairArray.length; j++) {
                                        const td = tr.insertCell();
                                        td.classList.add('table-cell')
                                        td.appendChild(document.createTextNode(pairArray[j]));
                                    }
                                    const placeHolder = document.getElementById("place-holder");
                                    placeHolder.appendChild(tableWithValues);
                                    
                                }
                            }
                        }
                    });
                });
            }
        }
    });
});
 
