(function() {
    'use strict';

    const movies = [];

    const renderMovies = function() {
        $('#listings').empty();

        for (const movie of movies) {
            const $col = $('<div>').addClass('col s6');
            const $card = $('<div>').addClass('card hoverable');
            const $content = $('<div>').addClass('card-content center');
            const $title = $('<h6>').addClass('card-title truncate');

            $title.attr({
                'data-position': 'top',
                'data-tooltip': movie.title
            });

            $title.tooltip({
                delay: 50
            }).text(movie.title);

            const $poster = $('<img>').addClass('poster');

            $poster.attr({
                src: movie.poster,
                alt: `${movie.poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            const $action = $('<div>').addClass('card-action center');
            const $plot = $('<a>');

            $plot.addClass('waves-effect waves-light btn modal-trigger');
            $plot.attr('href', `#${movie.id}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            const $modal = $('<div>').addClass('modal').attr('id', movie.id);
            const $modalContent = $('<div>').addClass('modal-content');
            const $modalHeader = $('<h4>').text(movie.title);
            const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
            const $modalText = $('<p>').text(movie.plot);

            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };

    // ADD YOUR CODE HERE
    $('button').click(function(e) {
        console.log("helloo")
        let searchText = $('#search').val()
        //  listen for submissions.
        //  make sure form isn't blank...or full of spaces
        if (searchText.trim() === "") {
            Materialize.toast("Whatcha lookin' for?", 4000)
        } else {
            $.ajax({
                method: 'GET',
                url: `http://www.omdbapi.com/?s=${searchText}`,
                dataType: 'json',
                //  send HTTP request to OMDB API search endpoint(see docs)
                success: function(data) {
                    //  clear search
                    while (movies.length > 0) {
                        movies.pop()
                    }

                    console.log(data);
                    //  populate movies array
                    for (let film of data['Search']) {
                        //  object to use in movies array
                        let video = {
                            id: '',
                            poster: '',
                            title: '',
                            year: ''
                        }

                        video['id'] = film['imdbID']
                        video['poster'] = film['Poster']
                        video['title'] = film['Title']
                        video['year'] = film['Year']
                        movies.push(video)

                    }
                    renderMovies()

                },
                error: function() {
                    console.log("error");
                }
            }) // end of ajax


        }

        //  well formed = id: movie's unique imdb id number
        //  poster: url to movie's poster image
        //  title: of the movie
        //  year: of release.

        e.preventDefault()
    })

    console.log(movies, "movies");

})(); // Tis an IIFE. 
