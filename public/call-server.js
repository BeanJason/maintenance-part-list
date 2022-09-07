function handleViewButton(){
    console.log("View clicked");

    const url = "http://localhost:3000";
    let lineSelect = document.getElementById('line')
    let lineValue = lineSelect.options[lineSelect.selectedIndex].text

    let stationSelect = document.getElementById('station')
    let stationValue = stationSelect.options[stationSelect.selectedIndex].text

    // let sortBy = document.getElementById('sort')
    // let sortByValue = sortBy.options[stationSelect.selectedIndex].text

    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'text/html'
        }
    };
    console.log(url + "/getpart/" + lineValue + "/" + stationValue)
    fetch(url + "/getpart/" + lineValue + "/" + stationValue, fetchObject)
        .then(res => res.json())
        .then(
            data => {console.log(data)
            fillTable(data)
            });

}

function handleViewAllButton(){
    console.log("View All clicked");

    const url = "http://localhost:3000";

    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'text/html'
        }
    };
    console.log(url + "/getpart/")
    fetch(url + "/getpart/", fetchObject)
        .then(res => res.json())
        .then(
            data => {console.log(data)
            fillTable(data)
            });
}

function handleAddButton(){
    console.log("add button clicked");

    let lineSelect = document.getElementById('addLine')
    let lineValue = lineSelect.options[lineSelect.selectedIndex].text

    let stationSelect = document.getElementById('addStation')
    let stationValue = stationSelect.options[stationSelect.selectedIndex].text

    let partInput = document.getElementById('partName')
    let partName = partInput.value

    let descriptionInput = document.getElementById('partDescription')
    let description = descriptionInput.value

    let currDate = new Date().toLocaleDateString();
    let currTime = new Date().toLocaleTimeString();

    let signatureInput = document.getElementById('personSignature')
    let signatureValue = signatureInput.value

    console.log("date = " + currDate);
    console.log("Add " + lineValue + " " + stationValue + " " + partName + " " + description)

    const url = "http://localhost:3000/addpart";

    const dataObject = {
        line: lineValue,
        station: stationValue,
        part: partName,
        desc: description,
        date: currDate,
        time: currTime,
        signature: signatureValue
    }

    console.log("line = " + JSON.stringify(dataObject).line)
    console.log('\n')

    const fetchObject = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(dataObject)
    };
    console.log(url + lineValue + "/" + stationValue + "/" + partName + "/" + description)
    fetch(url, fetchObject)
        .then(res => res.json())
        .then(jsonObject => {
            console.log("jsonObject.line = " + jsonObject.line)
            console.log('\n')
        }
            );

            confirm("Request submitted succesfully.");
        
            partInput.value = "";
            descriptionInput.value = "";
            signatureInput.value = "";
}

function handleDeleteButton(id){
    console.log(id);

    const url = "http://localhost:3000/deletepart/"

    if(confirm("Are you sure you want to delete? Deleted items can't be recovered.")){
        const fetchObject = {
            method: 'GET',
            headers: {
                'Content-Type' : 'text/html'
            },
        };
    
        fetch(url + id, fetchObject)
        
        confirm("Part Deleted");
        handleViewButton();
    }
    
}

function fillTable(data) {
    
    const table = document.getElementById("partsTable");

    if(table.rows.length > 1){
        clearTable()
    }

    data.forEach( item => {
        let row = table.insertRow();
        let line = row.insertCell(0);
        line.innerHTML = item.line;
        let station = row.insertCell(1);
        station.innerHTML = item.station;
        let part = row.insertCell(2);
        part.innerHTML = item.part;
        let desc = row.insertCell(3);
        desc.innerHTML = item.description;

        let dateRow = row.insertCell(4);
        dateRow.innerHTML = item.date;

        let timeRow = row.insertCell(5);
        timeRow.innerHTML = item.time;

        let signature = row.insertCell(6);
        signature.innerHTML = item.signature;

        let deleteItem = row.insertCell(7);
        deleteBtn = document.createElement("button")
        deleteBtn.id = item.id
        deleteBtn.innerHTML = "delete"
        deleteBtn.onclick = function() {
            console.log("delete clicked \n")
            handleDeleteButton(item.id)
        };
        deleteItem.appendChild(deleteBtn)

        //who needs to edit anyway
        // let editItem = row.insertCell(4);
        // editBtn = document.createElement("button")
        // editBtn.innerHTML = "edit"
        // editItem.appendChild(editBtn)
    })
}

function clearTable() {
    const table = document.getElementById("partsTable");
    var rowCount = table.rows.length;
    console.log("clear table row count = " + rowCount)
    for(var i = rowCount - 1; i > 0; i--){
        table.deleteRow(i);
    }
}

function selectFill(){
    console.log("selectFill start");
    //all possible stations
    //ASY
    let ASY01 = new Option('ASY01', 'ASY01');
    let ASY02 = new Option('ASY02', 'ASY02');
    let ASY03 = new Option('ASY03', 'ASY03');
    let ASY04 = new Option('ASY04', 'ASY04');
    let ASY05 = new Option('ASY05', 'ASY05');
    let ASY06 = new Option('ASY06', 'ASY06');
    let ASY07 = new Option('ASY07', 'ASY07');
    let ASY08 = new Option('ASY08', 'ASY08');
    let HLT01 = new Option('HLT01', 'HLT01');
    let HLT02 = new Option('HLT02', 'HLT02');
    let HLT03 = new Option('HLT03', 'HLT03');
    let HLT04 = new Option('HLT04', 'HLT04');
    let HLT05 = new Option('HLT05', 'HLT05');
    let HLT06 = new Option('HLT06', 'HLT06');
    let PCK01 = new Option('PCK01', 'PCK01');
    let BORE01 = new Option('BORE01', 'BORE01');

    //BMM
    let BMM = new Option('BMM', 'BMM');
    let EOAT = new Option('EOAT', 'EOAT');
    let EOAT01 = new Option('EOAT01', 'EOAT01');
    let EOAT02 = new Option('EOAT02', 'EOAT02');
    let PMC12 = new Option('PMC12', 'PMC12');
    let PMC34 = new Option('PMC34', 'PMC34');
    let VCT = new Option('VCT', 'VCT');

    //FIN
    let AUX_S = new Option('AUX_S', 'AUX_S');
    let AUX_N = new Option('AUX_N', 'AUX_N');
    let EIG01 = new Option('EIG01', 'EIG01');
    let FIN01 = new Option('FIN01', 'FIN01');
    let FIN02 = new Option('FIN02', 'FIN02');
    
    //Stations for each line

    //ASY
    let ASY_Stations_401 = [ASY01, ASY02];
    let ASY_Stations_402_ABM = [ASY01, ASY02, ASY03, ASY04, ASY05, HLT01, HLT02, PCK01];
    let ASY_Stations_402_CD = [ASY01, ASY02, ASY03, ASY04, ASY05, HLT01, PCK01];
    let ASY_Stations_403_E = [ASY01, ASY02, ASY03, ASY04, HLT01, PCK01];
    let ASY_Stations_403_W = [ASY01, ASY02, ASY03, ASY04, HLT01, PCK01];
    let ASY_Stations_404_FLEX = [ASY01, ASY02, ASY03, ASY06, ASY07, ASY08, HLT01, HLT02, PCK01];
    let ASY_Stations_406 = [ASY01, ASY02, ASY03, HLT01, HLT02, PCK01];
    let ASY_Stations_4065 = [ASY01, ASY02, ASY03, HLT03, HLT04, PCK01];
    let ASY_Stations_407 = [ASY01, ASY02, ASY03, HLT05, HLT06, PCK01];
    let ASY_Stations_408_95L = [ASY01, ASY02, HLT01, PCK01];
    let ASY_Stations_408_119L = [ASY01, ASY02, HLT01, HLT02, PCK01];
    let ASY_Stations_409 = [ASY01, ASY02, ASY03, HLT01, PCK01];
    let ASY_Stations_WL75 = [ASY01, ASY02, ASY03, ASY06, ASY07, ASY08, BORE01, HLT01, HLT02, PCK01];

    //BMM
    let BMM_Stations_401 = [BMM, EOAT01, PMC12, PMC34];
    let BMM_Stations_402 = [BMM, PMC12, PMC34, VCT];
    let BMM_Stations_403 = [BMM, EOAT01, PMC12, PMC34];
    let BMM_Stations_404 = [BMM, EOAT01, EOAT02, PMC12, PMC34];
    let BMM_Stations_406 = [BMM, PMC12, PMC34, VCT];
    let BMM_Stations_407 = [BMM, PMC12, PMC34];
    let BMM_Stations_408 = [BMM, PMC12, PMC34];
    let BMM_Stations_409 = [BMM, PMC12, PMC34];

    //FIN
    let FIN_Stations_401 = [AUX_N, AUX_S, FIN01, FIN02];
    let FIN_Stations_402_ABM = [AUX_N, AUX_S, FIN01, FIN02, FIN02];
    let FIN_Stations_402_CD = [FIN01, FIN02];
    let FIN_Stations_402_EFJ = [FIN01];
    let FIN_Stations_402_HSR = [FIN01];
    let FIN_Stations_403 = [FIN01, FIN02];
    let FIN_Stations_404_FLEX = [FIN01, BORE01, EIG01];
    let FIN_Stations_406 = [EIG01, FIN01];
    let FIN_Stations_4065 = [EIG01, FIN02];
    let FIN_Stations_407 = [EIG01, FIN01];
    let FIN_Stations_408_119L = [FIN01];
    let FIN_Stations_408_95L = [FIN01];
    let FIN_Stations_409 = [FIN01,FIN01];
    let FIN_Stations_WL75 = [BORE01, EIG01, FIN01];

    let lineSelect = document.getElementById('line')
    let lineValue = lineSelect.options[lineSelect.selectedIndex].text

    
    console.log("lineVal = " + lineValue);

    const stationSelect = document.getElementById('station');
    
    //let stationValue = stationSelect.options[stationSelect.selectedIndex].text

    //clear current station select list
    // clearSelector(stationSelect);
    while(stationSelect.options.length > 0){
        stationSelect.remove(0);
    }


    //fill based off of line selected (ASY)
    if(lineValue == 'A-401'){
        console.log("401 selected")
        ASY_Stations_401.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-402-ABM'){
        console.log("402_ABM selected")
        ASY_Stations_402_ABM.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-402-CD'){
        console.log("402-CD selected")
        ASY_Stations_402_CD.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-403-E'){
        console.log("403-E selected")
        ASY_Stations_403_E.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-403-W'){
        console.log("403-W selected")
        ASY_Stations_403_W.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-404'){
        console.log("404 selected")
        ASY_Stations_404_FLEX.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-406'){
        console.log("406 selected")
        ASY_Stations_406.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-4065'){
        console.log("4065 selected")
        ASY_Stations_4065.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-407'){
        console.log("407 selected")
        ASY_Stations_407.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-408-95L'){
        console.log("408-95L selected")
        ASY_Stations_408_95L.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-408-119L'){
        console.log("408-119L selected")
        ASY_Stations_408_119L.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'A-409'){
        console.log("409 selected")
        ASY_Stations_409.forEach(element => stationSelect.add(element, undefined));
    }

        //fill based off of line selected (BMM)
        if(lineValue == 'B-401'){
            console.log("401 selected")
            BMM_Stations_401.forEach(element => stationSelect.add(element, undefined));
        }else if(lineValue == 'B-402'){
            console.log("402 selected")
           BMM_Stations_402.forEach(element => stationSelect.add(element, undefined));
        }else if(lineValue == 'B-403'){
            console.log("403 selected")
            BMM_Stations_403.forEach(element => stationSelect.add(element, undefined));
        }else if(lineValue == 'B-404'){
            console.log("404 selected")
            BMM_Stations_404.forEach(element => stationSelect.add(element, undefined));
        }else if(lineValue == 'B-406'){
            console.log("406 selected")
            BMM_Stations_406.forEach(element => stationSelect.add(element, undefined));
        }else if(lineValue == 'B-407'){
            console.log("407 selected")
            BMM_Stations_407.forEach(element => stationSelect.add(element, undefined));
        }else if(lineValue == 'B-408'){
            console.log("408 selected")
            BMM_Stations_408.forEach(element => stationSelect.add(element, undefined));
        }else if(lineValue == 'B-409'){
            console.log("409 selected")
            BMM_Stations_409.forEach(element => stationSelect.add(element, undefined));
        }

    //fill based off of line selected (FIN)
    if(lineValue == 'F-401'){
        console.log("401 selected")
        FIN_Stations_401.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-402-ABM'){
        console.log("402_ABM selected")
        FIN_Stations_402_ABM.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-402-CD'){
        console.log("402-CD selected")
        FIN_Stations_402_CD.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-402-EFJ'){
        console.log("402-EFJ selected")
        FIN_Stations_402_EFJ.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-402-HSR'){
        console.log("402-HSR selected")
        FIN_Stations_402_HSR.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-403'){
        console.log("403 selected")
        FIN_Stations_403.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-404'){
        console.log("404 selected")
        FIN_Stations_404_FLEX.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-406'){
        console.log("406 selected")
        FIN_Stations_406.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-4065'){
        console.log("4065 selected")
        FIN_Stations_4065.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-407'){
        console.log("407 selected")
        FIN_Stations_407.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-408-95L'){
        console.log("408-95L selected")
        FIN_Stations_408_95L.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-408-119L'){
        console.log("408-119L selected")
        FIN_Stations_408_119L.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-409'){
        console.log("409 selected")
        FIN_Stations_409.forEach(element => stationSelect.add(element, undefined));
    }else if(lineValue == 'F-WL75'){
        console.log("WL75 selected")
        FIN_Stations_WL75.forEach(element => stationSelect.add(element, undefined));
    }
}


function selectAddFill() {

     //all possible stations
    //ASY
    let ASY01 = new Option('ASY01', 'ASY01');
    let ASY02 = new Option('ASY02', 'ASY02');
    let ASY03 = new Option('ASY03', 'ASY03');
    let ASY04 = new Option('ASY04', 'ASY04');
    let ASY05 = new Option('ASY05', 'ASY05');
    let ASY06 = new Option('ASY06', 'ASY06');
    let ASY07 = new Option('ASY07', 'ASY07');
    let ASY08 = new Option('ASY08', 'ASY08');
    let HLT01 = new Option('HLT01', 'HLT01');
    let HLT02 = new Option('HLT02', 'HLT02');
    let HLT03 = new Option('HLT03', 'HLT03');
    let HLT04 = new Option('HLT04', 'HLT04');
    let HLT05 = new Option('HLT05', 'HLT05');
    let HLT06 = new Option('HLT06', 'HLT06');
    let PCK01 = new Option('PCK01', 'PCK01');
    let BORE01 = new Option('BORE01', 'BORE01');

    //BMM
    let BMM = new Option('BMM', 'BMM');
    let EOAT = new Option('EOAT', 'EOAT');
    let EOAT01 = new Option('EOAT01', 'EOAT01');
    let EOAT02 = new Option('EOAT02', 'EOAT02');
    let PMC12 = new Option('PMC12', 'PMC12');
    let PMC34 = new Option('PMC34', 'PMC34');
    let VCT = new Option('VCT', 'VCT');

    //FIN
    let AUX_S = new Option('AUX_S', 'AUX_S');
    let AUX_N = new Option('AUX_N', 'AUX_N');
    let EIG01 = new Option('EIG01', 'EIG01');
    let FIN01 = new Option('FIN01', 'FIN01');
    let FIN02 = new Option('FIN02', 'FIN02');
    
    //Stations for each line

    //ASY
    let ASY_Stations_401 = [ASY01, ASY02];
    let ASY_Stations_402_ABM = [ASY01, ASY02, ASY03, ASY04, ASY05, HLT01, HLT02, PCK01];
    let ASY_Stations_402_CD = [ASY01, ASY02, ASY03, ASY04, ASY05, HLT01, PCK01];
    let ASY_Stations_403_E = [ASY01, ASY02, ASY03, ASY04, HLT01, PCK01];
    let ASY_Stations_403_W = [ASY01, ASY02, ASY03, ASY04, HLT01, PCK01];
    let ASY_Stations_404_FLEX = [ASY01, ASY02, ASY03, ASY06, ASY07, ASY08, HLT01, HLT02, PCK01];
    let ASY_Stations_406 = [ASY01, ASY02, ASY03, HLT01, HLT02, PCK01];
    let ASY_Stations_4065 = [ASY01, ASY02, ASY03, HLT03, HLT04, PCK01];
    let ASY_Stations_407 = [ASY01, ASY02, ASY03, HLT05, HLT06, PCK01];
    let ASY_Stations_408_95L = [ASY01, ASY02, HLT01, PCK01];
    let ASY_Stations_408_119L = [ASY01, ASY02, HLT01, HLT02, PCK01];
    let ASY_Stations_409 = [ASY01, ASY02, ASY03, HLT01, PCK01];
    let ASY_Stations_WL75 = [ASY01, ASY02, ASY03, ASY06, ASY07, ASY08, BORE01, HLT01, HLT02, PCK01];

    //BMM
    let BMM_Stations_401 = [BMM, EOAT01, PMC12, PMC34];
    let BMM_Stations_402 = [BMM, PMC12, PMC34, VCT];
    let BMM_Stations_403 = [BMM, EOAT01, PMC12, PMC34];
    let BMM_Stations_404 = [BMM, EOAT01, EOAT02, PMC12, PMC34];
    let BMM_Stations_406 = [BMM, PMC12, PMC34, VCT];
    let BMM_Stations_407 = [BMM, PMC12, PMC34];
    let BMM_Stations_408 = [BMM, PMC12, PMC34];
    let BMM_Stations_409 = [BMM, PMC12, PMC34];

    //FIN
    let FIN_Stations_401 = [AUX_N, AUX_S, FIN01, FIN02];
    let FIN_Stations_402_ABM = [AUX_N, AUX_S, FIN01, FIN02, FIN02];
    let FIN_Stations_402_CD = [FIN01, FIN02];
    let FIN_Stations_402_EFJ = [FIN01];
    let FIN_Stations_402_HSR = [FIN01];
    let FIN_Stations_403 = [FIN01, FIN02];
    let FIN_Stations_404_Flex = [FIN01, BORE01, EIG01];
    let FIN_Stations_406 = [EIG01, FIN01];
    let FIN_Stations_4065 = [EIG01, FIN02];
    let FIN_Stations_407 = [EIG01, FIN01];
    let FIN_Stations_408_119L = [FIN01];
    let FIN_Stations_408_95L = [FIN01];
    let FIN_Stations_409 = [FIN01,FIN01];
    let FIN_Stations_WL75 = [BORE01, EIG01, FIN01];

    let addLineSelect = document.getElementById('addLine')
    let addLineSelectVal = addLineSelect.options[addLineSelect.selectedIndex].text

    const addStationSelect= document.getElementById('addStation')

    while(addStationSelect.options.length > 0){
        addStationSelect.remove(0);
    }

    //fill add selectoraddLineSelectVals
    if(addLineSelectVal == 'A-401'){
        console.log("401 selected")
        ASY_Stations_401.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-402-ABM'){
        console.log("402_ABM selected")
        ASY_Stations_402_ABM.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-402-CD'){
        console.log("402-CD selected")
        ASY_Stations_402_CD.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-403-E'){
        console.log("403-E selected")
        ASY_Stations_403_E.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-403-W'){
        console.log("403-W selected")
        ASY_Stations_403_W.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-404'){
        console.log("404 selected")
        ASY_Stations_404_FLEX.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-406'){
        console.log("406 selected")
        ASY_Stations_406.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-4065'){
        console.log("4065 selected")
        ASY_Stations_4065.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-407'){
        console.log("407 selected")
        ASY_Stations_407.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-408-95L'){addStationSelect
        console.log("408-95L selected")
        ASY_Stations_408_95L.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-408-119L'){
        console.log("408-119L selected")
        ASY_Stations_408_119L.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'A-409'){
        console.log("409 selected")
        ASY_Stations_409.forEach(element => addStationSelect.add(element, undefined));
    }

        //fill based off of line selected (BMM)
        if(addLineSelectVal == 'B-401'){
            console.log("401 selected")
            BMM_Stations_401.forEach(element => addStationSelect.add(element, undefined));
        }else if(addLineSelectVal == 'B-402'){
            console.log("402 selected")
           BMM_Stations_402.forEach(element => addStationSelect.add(element, undefined));
        }else if(addLineSelectVal == 'B-403'){
            console.log("403 selected")
            BMM_Stations_403.forEach(element => addStationSelect.add(element, undefined));
        }else if(addLineSelectVal == 'B-404'){
            console.log("404 selected")
            BMM_Stations_404.forEach(element => addStationSelect.add(element, undefined));
        }else if(addLineSelectVal == 'B-406'){
            console.log("406 selected")
            BMM_Stations_406.forEach(element => addStationSelect.add(element, undefined));
        }else if(addLineSelectVal == 'B-407'){
            console.log("407 selected")
            BMM_Stations_407.forEach(element => addStationSelect.add(element, undefined));
        }else if(addLineSelectVal == 'B-408'){
            console.log("408 selected")
            BMM_Stations_408.forEach(element => addStationSelect.add(element, undefined));
        }else if(addLineSelectVal == 'B-409'){
            console.log("409 selected")
            BMM_Stations_409.forEach(element => addStationSelect.add(element, undefined));
        }

    //fill based off of line selected (FIN)
    if(addLineSelectVal == 'F-401'){
        console.log("401 selected")
        FIN_Stations_401.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-402-ABM'){
        console.log("402_ABM selected")
        FIN_Stations_402_ABM.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-402-CD'){
        console.log("402-CD selected")
        FIN_Stations_402_CD.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-402-EFJ'){
        console.log("402-EFJ selected")
        FIN_Stations_402_EFJ.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-402-HSR'){
        console.log("402-HSR selected")
        FIN_Stations_402_HSR.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-403'){
        console.log("403 selected")
        FIN_Stations_403.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-404'){
        console.log("404 selected")
        FIN_Stations_404_FLEX.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-406'){addStationSelect
        console.log("406 selected")
        FIN_Stations_406.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-4065'){
        console.log("4065 selected")
        FIN_Stations_4065.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-407'){
        console.log("407 selected")
        FIN_Stations_407.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-408-95L'){
        console.log("408-95L selected")
        FIN_Stations_408_95L.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-408-119L'){
        console.log("408-119L selected")
        FIN_Stations_408_119L.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-409'){
        console.log("409 selected")
        FIN_Stations_409.forEach(element => addStationSelect.add(element, undefined));
    }else if(addLineSelectVal == 'F-WL75'){
        console.log("WL75 selected")
        FIN_Stations_WL75.forEach(element => addStationSelect.add(element, undefined));
    }
}

function clearSelector(selectBox){
    while(selectBox.options.length > 0){
        select.remove(0);
    }
}

function start() {
    
    const viewButton = document.querySelector('#viewBtn');
    const viewAllButton = document.querySelector('#viewAllBtn');
    const addButton = document.querySelector('#addBtn');

    viewButton.onclick = handleViewButton;
    viewAllButton.onclick = handleViewAllButton;
    addButton.onclick = handleAddButton;

//     let lineSelect = document.getElementById('line')
// let lineValue = lineSelect.options[lineSelect.selectedIndex].text

// let addLineSelect = document.getElementById('addLine')
// let addLineSelectVal = addLineSelect.options[addLineSelect.selectedIndex].text

    selectFill();
    selectAddFill();
}





window.onload = start;