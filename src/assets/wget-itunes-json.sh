#!/bin/bash
URL='https://itunes.apple.com/search?term=Downgrooves&limit=100'
PATH='/var/www/downgrooves.com/public_html/assets/'
FILENAME='itunes.json'
cd $PATH
/usr/bin/sudo /usr/bin/wget -O $FILENAME $URL

/usr/bin/sudo /usr/bin/wget -O youtube.json 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBvQ_Z6DouL3LuFIl7cCfzmWArCAxRN5Sg&channelId=UCBdt53d5ez75y32pzkqbTMw&part=snippet,id&order=date&maxResults=20'