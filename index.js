const express = require('express')
const request = require('request')
const app = express()
const port = 3000
const baseUrl = 'https://covid19.mathdro.id/api'

app.get('/ping', (req, res) => res.send('pong'))

app.get('/covid/:iso3/:segment', (req, res) => 
{  
    let segment = req.params.segment
    console.log(segment)
    let endpoint = `${baseUrl}/countries/${req.params.iso3}/${segment}`

    request({ url: endpoint }, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                res.send('no data returned')
                return
            }

            let data = body ? JSON.parse(body)[0] : {}

            switch (segment) {
                case 'recovered':
                    res.send(`${data.recovered} recovered in ${data.combinedKey}`)
                    break;

                case 'deaths':
                    res.send(`${data.deaths} deaths in ${data.combinedKey}`)
            
                default:
                    res.send(`${data.confirmed} confirmed cases in ${data.combinedKey}`)
                    break;
            }
        }
    )
})


app.listen(port, () => console.log(`App listening on port ${port}!`))