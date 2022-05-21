"use strict";

// Notification.requestPermission();
//
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('serviceworker.js')
//         .then(function () {
//             console.log("Service Worker registered!");
//         });
// }

// fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// let requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
// };
//
// fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/acf/v3/offers", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
//
// //Hab ich schon einen Token?
// if (window.localStorage.getItem("token")) {
//     login_state.classList.remove("red");
//     user_display_name.innerHTML = "Willkommen zurück, " + window.localStorage.getItem("user_display_name") + "!";
//     frm_login.style.display = "none";
//     frm_submit_post.classList.add("visible");
// } else {
//     //Bin leider nicht eingeloggt
//     btn_login.addEventListener("click", function (e) {
//         e.preventDefault(); // Prevent Submit of Form
//         let credentials = {
//             username: username.value,
//             password: password.value
//         }
//         fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/jwt-auth/v1/token", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(credentials)
//         }).then(function (response) {
//             if (response.status != 200) { // wenn nicht 200 = OK
//                 alert("Fehlgeschlagen! " + response.status);
//                 console.log(response);
//                 return false;
//             }
//             return response; // im response ist token drinnen
//         }).then(response => response.json())
//             .then(response => {
//                 window.localStorage.setItem("token", response.token);
//                 window.localStorage.setItem("user_display_name", response.user_display_name);
//                 login_state.classList.remove("red");
//                 user_display_name.innerHTML = "Willkommen zurück, " + window.localStorage.getItem("user_display_name") + "!";
//                 frm_login.style.display = "none";
//                 frm_submit_post.classList.add("visible");
//             })
//     });
// }
//
// /* PAGINATION */
//
// fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/posts?per_page=3")
//     .then(function(response){
//         paginate(response.headers.get("X-WP-TotalPages"));
//         return response;
//     }).then(response => response.json())
//     .then(posts => renderPosts(posts));
//
// function paginate(totalPages) {
//     if (totalPages > 1) {
//         let button = document.createElement("button");
//         button.innerHTML = "Mehr laden";
//         button.id = "load_more_posts";
//         button.dataset.totalPages = totalPages;
//         button.dataset.nextPage = 2;
//         button.addEventListener("click", function () {
//             fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/posts?per_page=3&page=" + this.dataset.nextPage)
//                 .then(response => response.json())
//                 .then(posts => {
//                     renderPosts(posts);
//                     button.dataset.nextPage++;
//                 })
//         });
//         resources.append(button);
//     }
// }
//
// function renderPosts(posts) {
//     let posts_container = document.getElementById("posts");
//     for(let post of posts){
//         let post_container = document.createElement("div");
//         post_container.classList.add("post");
//         post_container.dataset.resourceid = post.id;
//         post_container.innerHTML = post.title.rendered;
//         posts_container.append(post_container);
//     }
// }
//
// btn_submit_post.addEventListener("click", event => {
//     event.preventDefault();
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             "Authorization": "Bearer " + window.localStorage.getItem('token'),
//             "Content-Type": "application/json",
//         },
//         redirect: 'follow',
//         body: JSON.stringify({
//             title: post_title.value,
//             content: post_content.value,
//             status: 'publish'
//         }),
//     };
//
//     fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/posts", requestOptions)
//         .then(function(response) {
//             if (response.status != 201) {
//                 alert("Fehlgeschlagen! " + response.status);
//                 console.log(response);
//                 return false;
//             } return response;
//         }).then(response => response.json())
//         .then(posts => {
//            renderPosts([posts]);
//             post_title.value = "";
//             post_content.value = "";
//         });
// });


