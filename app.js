const express = require('express') //require express module
const https = require('https')
const bodyParser = require('body-parser')

const app = express()  //initialize express app
app.use(bodyParser.urlencoded({extended: true}))

//what happens when user goes to homepage
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')   
})

app.post('/', (req,res)=>{
    
    const query = req.body.cityName
    const apiKey = '76c4ca63352db52f38a40fd3db543780'
    const unit = 'metric'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit
    https.get(url, (response)=>{
        // console.log(response.statusCode)
        response.on('data', (data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const cityName = weatherData.name
            
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
            res.write(`<p>The weather is currently ${weatherDescription}</p>`)
            res.write(`<h1>The temperature in ${query} is ${temp} degrees</h1>`)
            res.write('<img src='+ imageUrl +'>')
            res.send()
            
        })
        
    })
})








app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})