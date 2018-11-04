function btnCalculate_click() {

    let principal = parseFloat(document.querySelector('#principal').value).toFixed(2);
    let interest = parseFloat(document.querySelector('#interest').value / 100 / 12);
    let months = parseInt(document.querySelector('#years').value * 12);

    let totals = document.querySelector('#totals');
    let tbl = document.querySelector('#output');

    if (principal == "NaN" || interest == 0 || months == 0)
    {
        tbl.innerHTML = "";
        totals.innerHTML = "";
        totals.className = "alert alert-danger";
        totals.innerHTML = "Please fill out all loan information and resubmit!";
    }
    else
    {
        let x = Math.pow(1 + interest, months);
        let monthlyPayment = parseFloat((principal * x * interest) / (x - 1)).toFixed(2);

        let totalInterest = 0;
        let totalPayments = 0;

        const tableHeaders = ['Payment Period', 'Beginning Balance', 'Payment Amount', 'Interest Payment', 'Principal Payment', 'Ending Balance', 'Payment Due Date'];

        dueDate = new Date();

        totals.className = "alert alert-primary";

        //clear out table and alert in case of recalculation
        totals.innerHTML = "";
        tbl.innerHTML = "";
    
        let tbdy = document.createElement('tbody');

        let thead = document.createElement('thead');
        thead.className = "thead-dark";

        let tr = document.createElement('tr');

        tableHeaders.forEach(function (item) {
            let th = document.createElement('th');
            th.appendChild(document.createTextNode(item));
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        tbl.appendChild(thead);

        for (let rows = 1; rows <= months; rows++) {

            let tr = document.createElement('tr');

            let monthlyInterest = parseFloat(principal * interest).toFixed(2);

            let monthlyPrincipal = parseFloat(monthlyPayment - monthlyInterest).toFixed(2);

            for (let cell = 1; cell <= tableHeaders.length; cell++) {
            
                let td = document.createElement('td');

                switch (cell) {
                    case 1:
                        td.appendChild(document.createTextNode(rows.toString()));
                        break;
                    case 2:
                        td.appendChild(document.createTextNode("$" + principal));
                        break;
                    case 3:
                        td.appendChild(document.createTextNode("$" + monthlyPayment));
                        totalPayments += parseFloat(monthlyPayment);
                        break;
                    case 4:
                        td.appendChild(document.createTextNode("$" + monthlyInterest));
                        totalInterest += parseFloat(monthlyInterest);
                        break;
                    case 5:
                        td.appendChild(document.createTextNode("$" + monthlyPrincipal));
                        break;
                    case 6:
                        principal = parseFloat(principal - monthlyPrincipal).toFixed(2);
                            td.appendChild(document.createTextNode("$" + principal));
                        break;
                    case 7:
                        td.appendChild(document.createTextNode(dueDate.toLocaleDateString()));
                        dueDate.setMonth(dueDate.getMonth() + 1);
                        break;
                    
                }

                tr.appendChild(td);

            }

            tbdy.appendChild(tr);   

        }

        tbl.appendChild(tbdy);

        totals.innerHTML = "Total Payback: $" + totalPayments.toFixed(2) + " and Total Interest Paid: $" + totalInterest.toFixed(2);
    
    }
}


