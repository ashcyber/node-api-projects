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
