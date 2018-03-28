# node api projects

Create API and Microservice application 

## Timestamp Microservice

#### Example Usage

```
https://sunset-ton.glitch.me/December%2015,%202015
```
```
https://sunset-ton.glitch.me/December 15,2015
```

```
https://sunset-ton.glitch.me/1450137600
```

#### Example Output


```
{ "unix": 1450137600, "natural": "December 15, 2015" }
```


## Request Header Parser Microservice

#### Example Usage

```
https://pollen-tornado.glitch.me/api/whoami
```

#### Example Output

```
{ "ipaddress": "70.243.20.73", "language": "en-US", "software": "Windows NT 10.0; Win64; x64" }
```
## UrlShortner Microservice

#### Example shortUrl creation usage
```
https://pinto-ton.glitch.me/new/https://google.com
```
```
https://pinto-ton.glitch.me/new/http://xyz.com
```
#### Example shortUrl creation output
```
{ "original_url": "http://xyz.com, "short_url": https://pinto-ton.glitch.me/5252 }
```
#### Example usage
```
https://pinto-ton.glitch.me/5252
```

#### Example redirection output
```
http://xyz.com
```

## FileMetadata Microservice 

#### Example usage 

upload a file and submit 
``` 
https://gentle-cake.glitch.me/
```
#### Example output 

```
{
  "fieldname": "file",
  "originalname": "geckodriver.log",
  "encoding": "7bit",
  "mimetype": "application/octet-stream",
  "destination": "uploads/",
  "filename": "a35e1a8b1cb322c8fc72a12184fff428",
  "path": "uploads/a35e1a8b1cb322c8fc72a12184fff428",
  "size": 66252
}
```


## Image Search Abstraction Microservice 

#### Example Usage 
```
https://satisfying-shampoo.glitch.me/imagesearch/puppies?offset=2
```
```
https://satisfying-shampoo.glitch.me/latest/imagesearch 
```
#### Example Query Output
```
[
  {
    "name": "Stop the Suffering of Beagles!! | Cruelty Free",
    "image": "https://crueltyfreeblog.files.wordpress.com/2015/09/animal-wallpapers-cute-beagle-puppies-wallpaper-31121.jpg",
    "thumnail": "https://tse2.mm.bing.net/th?id=OIP.3KBgauesh5bGG6hc7jSfzAHaFj&pid=Api"
  },
  {
    "name": "15 Innocent and Cute Puppies Photography",
    "image": "http://photographyinspired.com/media/2014/03/WoOf.jpg",
    "thumnail": "https://tse2.mm.bing.net/th?id=OIP.XVu5MD6bUsg6ItACsR4C6AHaFj&pid=Api"
  }
]
```
#### Example Latest Search Output
```
[
  {
    "_id": "5abb00d11ec3ed2e4cc4ba81",
    "searchUrl": "localhost:3000/imagesearch/rex?offset=10"
  },
  {
    "_id": "5abb0117714d8c05f4559b6d",
    "searchUrl": "localhost:3000/imagesearch/dogs?offset=10"
  },
  {
    "_id": "5abb9bc2ac22c0035fa58195",
    "searchUrl": "satisfying-shampoo.glitch.me/imagesearch/puppies?offset=2"
  },
]
```

