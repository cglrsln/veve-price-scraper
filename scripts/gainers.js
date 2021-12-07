// fetch("https://ecomiwiki.com/api/metrics/marketplace/collectibles/gainers", {
//   "headers": {
//     "accept": "application/json",
//     "accept-language": "en-US,en;q=0.9",
//     "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1N2E2MzE5ZjY2OTcyNzMyMmExZDUiLCJpYXQiOjE2Mzg0ODU5NjQsImV4cCI6MTYzODU3MjM2NH0._CHydAUyu7Hf77gnPx8dV_6As7Vk2nFAsvRTl9y-Nvs",
//     "content-type": "application/json",
//     "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "cookie": "_ga=GA1.2.418406235.1631792318; _gid=GA1.2.877559308.1638272917; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1N2E2MzE5ZjY2OTcyNzMyMmExZDUiLCJpYXQiOjE2Mzg0ODU5NjQsImV4cCI6MTYzODU3MjM2NH0._CHydAUyu7Hf77gnPx8dV_6As7Vk2nFAsvRTl9y-Nvs",
//     "Referer": "https://ecomiwiki.com/veve/market",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "{\"limit\":10,\"offset\":0,\"filters\":{\"name\":\"\"}}",
//   "method": "POST"
// });

// curl 'https://ecomiwiki.com/api/metrics/marketplace/collectibles/gainers' \
//   -H 'Connection: keep-alive' \
//   -H 'sec-ch-ua: "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"' \
//   -H 'Accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1N2E2MzE5ZjY2OTcyNzMyMmExZDUiLCJpYXQiOjE2Mzg0ODU5NjQsImV4cCI6MTYzODU3MjM2NH0._CHydAUyu7Hf77gnPx8dV_6As7Vk2nFAsvRTl9y-Nvs' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'Origin: https://ecomiwiki.com' \
//   -H 'Sec-Fetch-Site: same-origin' \
//   -H 'Sec-Fetch-Mode: cors' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Referer: https://ecomiwiki.com/veve/market' \
//   -H 'Accept-Language: en-US,en;q=0.9' \
//   -H 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1N2E2MzE5ZjY2OTcyNzMyMmExZDUiLCJpYXQiOjE2Mzg0ODU5NjQsImV4cCI6MTYzODU3MjM2NH0._CHydAUyu7Hf77gnPx8dV_6As7Vk2nFAsvRTl9y-Nvs' \
//   --data-raw '{"limit":10,"offset":20,"filters":{"name":""}}' \
//   --compressed

//   curl 'https://ecomiwiki.com/api/metrics/marketplace/collectibles/losers' \
//   -H 'Connection: keep-alive' \
//   -H 'sec-ch-ua: "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"' \
//   -H 'Accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1N2E2MzE5ZjY2OTcyNzMyMmExZDUiLCJpYXQiOjE2Mzg0ODU5NjQsImV4cCI6MTYzODU3MjM2NH0._CHydAUyu7Hf77gnPx8dV_6As7Vk2nFAsvRTl9y-Nvs' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'Origin: https://ecomiwiki.com' \
//   -H 'Sec-Fetch-Site: same-origin' \
//   -H 'Sec-Fetch-Mode: cors' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Referer: https://ecomiwiki.com/veve/market' \
//   -H 'Accept-Language: en-US,en;q=0.9' \
//   -H 'Cookie: _ga=GA1.2.418406235.1631792318; _gid=GA1.2.877559308.1638272917; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1N2E2MzE5ZjY2OTcyNzMyMmExZDUiLCJpYXQiOjE2Mzg0ODU5NjQsImV4cCI6MTYzODU3MjM2NH0._CHydAUyu7Hf77gnPx8dV_6As7Vk2nFAsvRTl9y-Nvs' \
//   --data-raw '{"limit":10,"offset":0,"filters":{"name":""}}' \
//   --compressed
