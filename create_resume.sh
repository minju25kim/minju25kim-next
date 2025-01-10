#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <version>"
    exit 1
fi

LANG=$1
DATE=$(date +%y%m%d)

cd json/$LANG
touch "$DATE.json" | echo "{ \"lang\": \"$LANG\", \"version\": \"$DATE\" }" > $DATE.json


echo "Created new $VERSION at json/$LANG/$DATE.json"


# ./create_resume.sh eng