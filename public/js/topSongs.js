$(document).ready(function(){
    $(document).on('click', '.show-top-songs', function(event){
        let id = $(this).val();
        $('#top-songs-' + id).empty();
        $.ajax({
            url: "/songs",
            method: "GET",
            data: {
                id: id
            }
        })
        .then(result => {
            let ul = $('<ul>');
            result.forEach(track => {
                ul.append($(`<p>${track.name}</p><audio controls src="${track.preview}"></audio>`));
            })
            $('#top-songs-' + $(this).val()).append(ul);
        });
    })
})