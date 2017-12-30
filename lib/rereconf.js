function fillConferences(res, conference) {
    res.map(el => {
        el.year = conference.year;
        el.conference = conference.conference;
    });
    return res;
}

function getConferences(){
    $.ajax({
      url: "data/conferences.json"
    }).done(function(conferenceUrls) {
        var conferenceFiles = conferenceUrls.map(conferenceUrl => {return $.ajax('data/'+conferenceUrl.url)});
        $.when(...conferenceFiles).done(function something(...resolved){
            if (conferenceUrls.length == 1) {
                resolved = [resolved]; // manage different when scenario when single thenable
            }
            var conferences = [].concat(...resolved.map((x, index)=>fillConferences(x[0], conferenceUrls[index])));
            showConferencesToPage(conferences);
        });
    })
}

function showConferencesToPage(conferences){
    $(function(){
        $('#content').html(conferences.map(formatConference).join(""));
    })
}

function formatConference(conference){
    return `
    <div class="conference-box">
    <h2><a href="${conference.link}">${conference.title}</a></h2>
    <h3>${conference.speaker}</h3>
    <h3>${conference.conference} - ${conference.year}</h3>
    <span>${conference.abstract}</span>
    <br />
    <span>tags: [${conference.tags.join('] - [')}]</span>
    </div>`
}

getConferences();