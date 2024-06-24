(function () {

    var lessons;

    $(document).ready(function () {

        $.get("https://final-project-recording.firebaseio.com/lessons.json", function (data) {

            lessons = Object.values(data);

            $("#lessons").html(generateHtml(lessons));

        });

        $('#btn').on('click', function () {

            lessons.forEach(function (lesson, index) {
                lessons[index].description = index + ' - ' + lessons[index].description
            });

            var lessonsDiv = document.getElementById('lessons');

            // delete all child elements
            while (lessonsDiv.firstChild) {
                lessonsDiv.removeChild(lessonsDiv.firstChild);
            }

            // apply the table directly to the DOM
            lessonsDiv.appendChild(generateDomTable(lessons));

        });
    });

}());

function generateHtml(lessons) {
    let html = "<table class='table lessons-list'>" +
        "<thead>" +
        "<th>First Description</th>" +
        "</thead>" +
        "<tbody>";

    lessons.forEach(function (lesson) {
        html += '<tr>' +
            '<td>' + lesson.description + '</td>' +
            '</tr>';
    });

    html += '</tbody></table>';

    return html;
}

function generateDomTable(lessons) {
    let table = document.createElement('table');

    let tHead = table.createTHead();
    let headerRow = tHead.insertRow(0);
    let headerCell = headerRow.insertCell(0);
    headerCell.innerHTML = "OTHER DESCRIPTIONS";

    for (let i = 0; i < lessons.length; i++) {
        let row = table.insertRow(i);
        let col = row.insertCell(0);
        col.innerHTML = lessons[i].description;
    }

    return table;
}
