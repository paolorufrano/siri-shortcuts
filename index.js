const express = require('express')
const request = require('request')
const app = express()
const port = 3000
const baseUrl = 'https://corona.lmao.ninja'

app.get('/ping', (req, res) => res.send('pong'))

app.get('/covid/:iso3/:segment', (req, res) => {

    let segment = req.params.segment
    let endpoint = `${baseUrl}/countries/${req.params.iso3}`

    request({ url: endpoint }, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                res.send('no data returned')
                return
            }

            let data = JSON.parse(body)

            switch (segment) {
                case 'recovered':
                    res.send(`${data.recovered} recovered in ${data.country}`)
                    break;

                case 'deaths':
                    res.send(`${data.deaths} deaths in ${data.country}`)
            
                default:
                    res.send(`${data.cases} confirmed cases in ${data.country}`)
                    break;
            }
        }
    )
})


app.listen(port, () => console.log(`App listening on port ${port}!`))