An bot to watch for crypto price changes and alert for oscillations. 

## Running the app

To run the app use the below command to run it using docker compose:

```
docker-compose up
```

Then run the below command to start monitoring BTC-USD price change. You can also monitor any number of other crypto pairs:

```
curl --location --request POST 'http://localhost:3000/monitor' \
--header 'Content-Type: application/json' \
--data-raw '{
    "purchase": "BTC",
    "sell": "USD",
    "interval": 5,
    "change": 0.01
}'
```

Now to get alerts register a webhook using the below command:

```
curl --location --request POST 'http://localhost:3000/webhook' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://webhook.site/51da4415-8412-467c-b8e6-88abd812a9de"
}'
```

Now open https://webhook.site/#!/51da4415-8412-467c-b8e6-88abd812a9de in browser to see the alerts. You will also see alerts in the console.
