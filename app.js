const express= require('express')
const app = express()
const restaurantsData = require("./restaurant.json").results


const port = 3000

// handlebars here
const exphbs = require('express-handlebars')
// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.get('/', (req, res) => {
    res.render('index', { restaurantsData })
})

// setting static files
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

app.get('/restaurants/:restaurantId', (req,res) => {
    const { restaurantId } = req.params
    const restaurantData = restaurantsData.find(
        data => data.id===Number(restaurantId)
    )
    res.render("show", { restaurantData})
})

// 新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
    res.render('new')
})

app.get('/search', (req,res) => {
    const keyword = req.query.keyword
    const filterrestaurants = restaurantsData.filter(data =>{
        return data.name.includes(keyword) || data.category.includes(keyword)
    })
    res.render('index', { restaurantsData:filterrestaurants,keyword:keyword })
})

// 新增餐廳資料
app.post('/restaurants', (req, res) => {
    Restaurant.create(req.body)
      .then(() => res.redirect('/'))
      .catch(err => console.error(err))
})

app.listen(port, () =>{
    console.log(`Express is running on http://localhost:${port}`)
})