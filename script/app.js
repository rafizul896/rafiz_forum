const discussContainer = document.getElementById('discussContainer');
const markReadContainer = document.getElementById('markReadContainer');
const totalCount = document.getElementById('totalCount');
const cardContainer = document.getElementById('cardContainer');
const searchBtn = document.getElementById('searchBtn');
let count = 0;

const fetchAllPosts = async () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts';
    const fetchs = await fetch(url);
    const res = await fetchs.json();
    loaddata(res)
}

const loaddata = (posts) => {
    discussContainer.innerHTML = ''
    const data =  posts.posts.forEach((posts) => {
        const post = document.createElement('div');
        post.innerHTML = `
        <div class="flex flex-col lg:flex-row bg-[#797DFC1A] p-4 lg:p-7 rounded-3xl gap-5">
            <div class="flex justify-center lg:block">
                <div class="relative w-[72px] h-[72px]">
                    <img class="rounded-xl" src="${posts.image}" alt="">
                    <div id="active" class="${posts.isActive ? "bg-green-500" : "bg-red-500"} other-classes h-4 w-4 rounded-full absolute -top-1 -right-1"></div>
                </div>
            </div>
            <div class="text-start space-y-2">
                <div class="flex gap-5 text-sm font-bold">
                    <p># <span>${posts.category}</span></p>
                    <p>Author : <span>${posts.author.name}</span></p>
                </div>
                <h1 class="text-xl font-extrabold">${posts.title}</h1>
                <p class="text-[#12132D99] py-2">${posts.description}</p>
                <div class="flex flex-col lg:flex-row justify-between border-t-2 border-dashed border-[#12132D40] py-4">
                    <div class="flex gap-6 text-lg">
                        <li class="flex gap-2 items-center"><img src="./images/icons/tabler-icon-message-2.png" alt=""><span>${posts.comment_count}</span></li>
                        <li class="flex gap-2 items-center"><img src="./images/icons/Group 16.png" alt=""><span>${posts.view_count}</span></li>
                        <li class="flex gap-2 items-center"><img src="./images/icons/Group 18.png" alt=""><span>${posts.posted_time}</span>min</li>
                    </div>
                    <button onclick="readBtn('${posts.title}','${posts.view_count}')" class="flex justify-end mt-6"><img src="./images/icons/Group 40106.png" alt=""></button>
                </div>
            </div>
        </div>
        `;
        discussContainer.appendChild(post);
    });
}

const readBtn = (title, view) => {
    count++;
    totalCount.innerText = count;
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="flex items-center px-4 py-6 rounded-2xl bg-white">
            <p class="max-w-[70%] text-start font-semibold text-[#12132D]">${title}</p>
            <li class="flex gap-2 items-center text-[#12132D99]">
                <img src="./images/icons/Group 16.png" alt=""><span>${view}</span>
            </li>
        </div>
        `
    markReadContainer.appendChild(div);
}

fetchAllPosts();

const fetchAllLatestPost = async () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';
    const fetchs = await fetch(url);
    const res = await fetchs.json();
    const data = await res.forEach((item) => {
        const latestPost = document.createElement('div');
        latestPost.innerHTML = `
        <div class="card bg-base-100 shadow-xl border h-[482px]">
            <figure class="px-5 pt-5">
                <img class="rounded-xl" src="${item.cover_image}" />
            </figure>
            <div class="text-start p-5 space-y-3">
                <p class="text-sm"><i class='bx bx-calendar'></i><span id="date"> ${item.author.posted_date ? `${item.author.posted_date}` : 'No publish date'}</span></p>
                <h2 class="text-lg font-extrabold">${item.title}</h2>
                <p class="text-base text-[#12132D99]">${item.description}</p>
                <div class="flex gap-4">
                    <div class="w-[50px] h-[50px]">
                        <img class="rounded-full" src="${item.profile_image}" alt="">
                    </div>
                    <div>
                        <h1 class="font-extrabold">${item.author.name}</h1>
                        <p class="text-[#12132D99]">${item.author.designation ? `${item.author.designation}` : 'Unknown'}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(latestPost)
    })
}

fetchAllLatestPost()

const search = async () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    console.log(searchText);
    const fetchs = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const res = await fetchs.json();
    discussContainer.innerHTML = ''
    loaddata(res)
}



//onclick="AddToList(${title.replace(/'/g,'@')})"