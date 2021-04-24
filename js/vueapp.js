
const VueApp = new Vue({
    el: '#app',
    data: {
        posts: [],
        Url: 'http://jsonplaceholder.typicode.com/posts?_limit=20',
        page: 1,
        perPage: 6,
        pages: [],
        newTitle: '',
        newBody: '',
        tempPages: [],
    },
    methods: {
        greet: function (event) {
            this.posts.push(
                {
                    "id": this.posts.length+1, 
                    "title": this.newTitle, 
                    "body": this.newBody
                }
            )
          },
        getPosts () {
            axios.get(this.Url)
            .then(response => {
                this.posts = response.data;
            })
            .catch(response => {
                console.log(response);
            });
        },
        setPages () {
            let nOfP = Math.ceil(this.posts.length / this.perPage);
            for (let i = 1; i <= nOfP; i++) {
                this.tempPages.push(i);
            }
            this.pages=this.tempPages;
            this.tempPages = [];
        },
        paginate (posts) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  posts.slice(from, to);
        },
        greet(event){
            this.posts.push(
                {
                    "userId": 1,
                    "id": this.posts.length+1, 
                    "title": this.newTitle, 
                    "body": this.newBody
                }
            )
        },
    },
    computed: {
        displayedPosts () {
            return this.paginate(this.posts);
        },
    },
    watch: {
        posts () {
            this.setPages();
        }
    },
    created () {
        this.getPosts();
    }
});