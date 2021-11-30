(function ($) {
    let search_form = $("#searchForm"), 
        shows_list = $("#showList"),
        search_input = $("#search_term"),
        home_link = $("#homeLink"),
        show_info = $("#show")

    function default_search(){
    let requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows'
    }

    $.ajax(requestConfig).then(function (responseMessage){
            
        let newelement = responseMessage

        shows_list.children().each(function (index, element) {
            element.remove();
        })

        for(let i in newelement){
            let show_detail = newelement[i]
            let str = '<li><a class = "each_link" href =' + show_detail.url + '  data-id = '+ show_detail.id +'>'+show_detail.name+'</a></li>'
            shows_list.append(str)
        }
        shows_list.show()

        shows_list.children().each(function (index, element) {
            update_each_show($(element))
        })
            
        })

        home_link.hide()
    }


    default_search()

    function update_each_show(each_show){
        let each_link = $(each_show.children()[0])
        each_link.on('click', function (event) {
            event.preventDefault();
            let currentLink = $(this)
            console.log(currentLink[0])
            let currentId = currentLink.data('id');

            var requestConfig = {
                method: 'GET', 
                url: 'http://api.tvmaze.com/shows/' + currentId
            }

            $.ajax(requestConfig).then(function (responseMessage) {
                let info = responseMessage

                shows_list.hide()
                home_link.show()
                show_info.children().each(function (index, element) {
                    element.remove();
                })
                
                let h1 = '<h1>' + info.name + '</h1>',
                    has_image = info.image,
                    img = '<img alt = "' + info.name + '" src = "',
                    dl_start = "<dl>",
                    dl_end = "</dl>",
                    ul_start = "<ul>",
                    ul_end = "</ul>",
                    li_start = "<li>",
                    li_end = "</li>",
                    language = info.language,
                    average = info.rating.average,
                    network = info.network.name,
                    summary = info.summary

                if(!has_image) img += '/public/no_image.jpeg" >'
                else img += info.image.medium + '" >'
                console.log(img)
                let li_language = li_start + language + li_end,
                    li_average = li_start + average + li_end,
                    li_network = li_start + network + li_end,
                    li_summary = li_start + summary + li_end
                
                let genres_list = ''

                for(let i in info.genres){
                    let each_genres = li_start + info.genres[i] + li_end
                    genres_list += each_genres
                }

                let all_genres = ul_start + genres_list + ul_end
                
                let all_dl = dl_start + li_language + all_genres + li_average + li_network + li_summary + dl_end
                
                show_info.append(h1)
                show_info.append(img)
                show_info.append(all_dl)

                show_info.show()

                
            })
        })
    }

    shows_list.children().each(function (index, element) {
        update_each_show($(element))
    })


    home_link.on('click', function (event){
        event.preventDefault();
        
        shows_list.children().each(function (index, element) {
            element.remove();
        })

        show_info.children().each(function (index, element) {
            element.remove();
        })
        
        shows_list.hide()
        home_link.hide()
        default_search()
    })


    search_form.submit(function (event) {
        event.preventDefault();
        
        let search_str = search_input.val()

        if(search_str === "" || search_str.split(" ").join("") === ""){
            alert("You have to input something");
        } else {

        let requestConfig = {
            method: 'GET',
            url: 'http://api.tvmaze.com/search/shows?q=' + search_str
        }

        $.ajax(requestConfig).then(function (responseMessage){
            
            let newelement = responseMessage

            shows_list.children().each(function (index, element) {
                element.remove();
            })
            for(let i in newelement){
                let info = newelement[i].show
                let str = '<li><a class = "each_link" href =' + info.url + '  data-id = '+ info.id +'>'+info.name+'</a></li>'
                shows_list.append(str)

            }

            shows_list.children().each(function (index, element) {
                update_each_show($(element))
            })

            shows_list.show()
            home_link.show()

            show_info.hide()
            
        })
    }
    })



 
})(window.jQuery);