# twitter-favorite-videos-downloader

Batch to download someone's favorited video.

## How to run this project

The project runs on Node.js, it runs well on Node.js 10 or later. Also, you need a network environment that can access Twitter.

### Some necessary preparations

- Locate [main.ts](/src/main.ts) and file line 17, input the account screen name
- [Regist a Twitter app](https://developer.twitter.com/en/apps) and get the `consumer_key`, `consumer_secret`, `access_token_key` and `access_token_secret`, replace them in [twitterFactory.ts](/src/twitterFactory.ts)

### Installation dependencies

``` bash
> npm install
```
### Build Project

``` bash
> npm run build
```

### Run Project

``` bash
> npm run download
```
